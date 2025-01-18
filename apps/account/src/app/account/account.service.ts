import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { CacheManagerService, CacheMessageAction } from '@shared/cache-manager';
import {
  ChangePasswordDto,
  DeactivateDto,
  CreateProfileDto,
  VerifyEmailOtp,
  CreateAccountDto,
  DeleteAccountDto,
} from '@shared/dtos/account';
import { throwException } from '@shared/exception';
import { EmailService } from '@shared/mailer';
import { Account } from '@shared/models/account';
import { Profile } from '@shared/models/profile';
import {
  AccountVerifyStatusEnum,
  CreateAccountAndProfile,
  CredentialTypeEnum,
} from '@shared/types';
import { catchError, from, map, of, switchMap, tap, timer } from 'rxjs';
import { BcryptService } from 'shared/bcrypt/src/bcrypt.service';
import { HttpStatusCode } from 'axios';
import { JwtConfig } from '@shared/configs';
import { AccountAlert } from '@shared/alert/account';
import { Role } from '@shared/guard';

interface UpdateRoleDto {
  accountId: string;
  role: Role;
}

@Injectable()
export class AccountService {
  private readonly logger = new Logger(AccountService.name);
  private jwtConfig: JwtConfig;
  private readonly TTL_CACHE_TIME = 7 * 24 * 60 * 60;
  private readonly TTL_CACHE_VERIFY_EMAIL = 180;

  constructor(
    @InjectModel(Profile)
    private readonly profileModel: typeof Profile,
    @InjectModel(Account)
    private readonly accountModel: typeof Account,
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
    private readonly mailerService: EmailService,
    private readonly bcryptService: BcryptService,
    private readonly configService: ConfigService,
    private readonly cacheService: CacheManagerService
  ) {
    this.jwtConfig = this.configService.get<JwtConfig>('jwt');
  }

  handleChangePassword(body: ChangePasswordDto) {
    return of({ message: AccountAlert.NotImplemented });
  }

  handleDeactivate(body: DeactivateDto) {
    return of({ message: AccountAlert.NotImplemented });
  }

  handleVerifyEmail(payload: VerifyEmailOtp) {
    return from(
      this.jwtService.verifyAsync<{
        email: string;
        code: string;
      }>(payload.token, {
        secret: this.jwtConfig?.secret,
      })
    ).pipe(
      catchError(() => {
        return throwException(
          HttpStatusCode.BadRequest,
          AccountAlert.VerificationTokenExpired
        );
      }),
      switchMap((source) => {
        const key = `${AccountVerifyStatusEnum.UNVERIFY}#${source.email}`;
        return this.cacheService.get(key).pipe(
          switchMap(
            (response: {
              email: string;
              code: string;
              token: string;
              credentialType: CredentialTypeEnum;
            }) => {
              if (!response) {
                return throwException(
                  HttpStatusCode.BadRequest,
                  AccountAlert.VerificationTokenExpired
                );
              }

              if (payload?.token !== response?.token) {
                return throwException(
                  HttpStatusCode.BadRequest,
                  AccountAlert.VerificationError
                );
              }

              return from(
                this.accountModel.update(
                  { isVerify: true },
                  {
                    where: {
                      email: response?.email,
                      credentialType: response?.credentialType,
                    },
                  }
                )
              ).pipe(
                map(() => ({
                  email: response.email,
                  credentialType: response.credentialType,
                }))
              );
            }
          ),
          tap(() => {
            this.removeVerifyTokenCache(source.email);
          })
        );
      })
    );
  }

  handleCreateAccount({ password, email }: CreateAccountDto) {
    this.logger.log('handleCreateAccount...', email);
    return this.bcryptService.hashPassword(password).pipe(
      switchMap((hashPassword) =>
        from(
          this.accountModel.create({
            email,
            password: hashPassword,
          })
        ).pipe(
          map((response) => response.toJSON()),
          switchMap((accountResponse) => {
            this.logger.log('accountResponse: ', accountResponse?.id);
            delete accountResponse?.password;
            return from(
              this.profileModel.findOne({
                where: {
                  accountId: accountResponse?.id,
                },
              })
            ).pipe(
              map((profile) => ({
                ...accountResponse,
                profile,
              }))
            );
          }),
          tap((fullyData) => {
            const key = this.getCacheKey(email);
            this.eventEmitter.emit(CacheMessageAction.Create, {
              key,
              value: fullyData,
              ttl: this.TTL_CACHE_TIME,
            });
          })
        )
      )
    );
  }

  handleSendTokenVerifyEmail({
    email,
    credentialType,
  }: {
    email: string;
    credentialType: CredentialTypeEnum;
  }) {
    const token = this.generateTokenVerify(email);
    const verificationLink = this.getVerifyLink(token);
    this.logger.log(`handleSendTokenVerifyEmail ${token}`);
    this.mailerService
      .sendOtpVerifyEmail(email, verificationLink)
      .pipe(
        catchError((e) => {
          this.logger.error(AccountAlert.VerificationEmailError);
          return e;
        }),
        tap(() => {
          this.logger.log(`Verification email sent to ${email}`);
          this.eventEmitter.emit(CacheMessageAction.Create, {
            key: `${AccountVerifyStatusEnum.UNVERIFY}#${email}`,
            value: {
              token,
              email,
              credentialType,
            },
            ttl: this.TTL_CACHE_VERIFY_EMAIL,
          });
        })
      )
      .subscribe();
  }

  handleCreateProfile(body: CreateProfileDto, accountId: string) {
    return from(
      this.profileModel.create({
        ...body,
        accountId,
      })
    ).pipe();
  }

  handleUpdateProfile(body: any, profileId: string) {
    return from(
      this.profileModel.update(body, {
        where: { id: profileId },
      })
    ).pipe();
  }

  createAccountForSoicalLogin({
    email,
    name,
    bio,
    avatarUrl,
    credentialType,
    githubLink,
  }: CreateAccountAndProfile) {
    let accountData: any;
    this.logger.log('CREATE new account and profile');
    return from(
      this.accountModel.create({ email, credentialType, isVerify: true })
    ).pipe(
      map((account) => {
        accountData = account.toJSON();
        return accountData;
      }),
      switchMap((account) =>
        this.handleUpdateProfile(
          {
            fullName: name,
            avatarUrl,
            bio,
            githubLink,
          },
          account.id
        ).pipe(
          tap((profile) => {
            const key = this.getCacheKey(email, credentialType);
            delete accountData?.password;
            this.eventEmitter.emit(CacheMessageAction.Create, {
              key,
              value: { ...accountData, profile },
              ttl: this.TTL_CACHE_TIME,
            });
          }),
          map((profile) => ({
            ...accountData,
            profile,
          }))
        )
      )
    );
  }

  handleDeleteAccount(body: DeleteAccountDto) {
    return from(this.accountModel.findOne({ where: { id: body.id } })).pipe(
      catchError(() =>
        throwException(
          HttpStatusCode.InternalServerError,
          AccountAlert.ProfileDeleteError
        )
      ),
      switchMap((user) => {
        if (user) {
          return from(user.destroy()).pipe(
            map(() => ({
              message: AccountAlert.ProfileDeleteSuccess,
              data: body.id,
            }))
          );
        }
        return throwException(
          HttpStatusCode.NotFound,
          AccountAlert.AccountNotFound
        );
      })
    );
  }

  private getCacheKey(
    email: string,
    credentialType: CredentialTypeEnum = CredentialTypeEnum.NONE
  ) {
    return `ACCOUNT#${email}#${credentialType}`;
  }

  private getProfileCacheKey(profileId: string) {
    return `PROFILE#${profileId}`;
  }

  private generateTokenVerify(email: string) {
    const code = new Date().getTime();
    const token = this.jwtService.sign({ email, code }, { expiresIn: '3m' });
    return token;
  }

  private getVerifyLink(token: string) {
    const verificationLink = `${this.configService.get<string>(
      'verifyRedirect'
    )}?token=${token}`;
    return verificationLink;
  }

  private removeVerifyTokenCache(email: string) {
    const removeKey = `${AccountVerifyStatusEnum.UNVERIFY}#${email}`;
    this.eventEmitter.emit(CacheMessageAction.Delete, removeKey);
  }

  /**
   *
   * @param email
   * @param credentialType
   * @returns Return the current cached user if it exists; otherwise, fetch it from the database.
   */
  getExistingAccountByEmail(
    email: string,
    credentialType: CredentialTypeEnum = CredentialTypeEnum.NONE
  ) {
    const cacheKey = this.getCacheKey(email, credentialType);
    return this.cacheService.get(cacheKey).pipe(
      switchMap((cacheData) => {
        if (cacheData) {
          return of(
            cacheData as {
              id: string;
              email: string;
              createdAt: string;
              updatedAt: string;
              isVerify: boolean;
              password: string;
              credentialType: CredentialTypeEnum;
              profile: Profile;
              role: Role;
            }
          );
        }
        return from(
          this.accountModel.findOne({
            where: { email, credentialType },
            include: [
              {
                association: 'profile',
                required: false, // Set to true if the profile must exist
              },
            ],
          })
        ).pipe(
          map((response) => {
            const jsonData = response?.toJSON?.();
            delete jsonData?.password;
            return jsonData as {
              id: string;
              email: string;
              createdAt: string;
              updatedAt: string;
              isVerify: boolean;
              password: string;
              credentialType: CredentialTypeEnum;
              profile: Profile;
              role: Role;
            };
          }),
          tap((fullyData) => {
            const key = this.getCacheKey(email);
            this.eventEmitter.emit(CacheMessageAction.Create, {
              key,
              value: fullyData,
              ttl: this.TTL_CACHE_TIME,
            });
          })
        );
      })
    );
  }

  /**
   * @description Get the existing profile by profileId, check in cache before get from database
   */
  getExistingProfileByProfileId(profileId: string) {
    const cacheKey = this.getProfileCacheKey(profileId);
    return this.cacheService.get(cacheKey).pipe(
      switchMap((cacheData) => {
        if (cacheData) {
          return of(cacheData);
        }

        return from(
          this.profileModel.findOne({
            where: { id: profileId },
          })
        ).pipe(
          map((response) => response?.toJSON()),
          tap((fullyData) => {
            const key = this.getProfileCacheKey(profileId);
            this.eventEmitter.emit(CacheMessageAction.Create, {
              key,
              value: fullyData,
              ttl: this.TTL_CACHE_TIME,
            });
          })
        );
      })
    );
  }
}
