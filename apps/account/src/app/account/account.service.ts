import { HttpStatus, Injectable, Logger } from '@nestjs/common';
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
import { DefaultProfileValue, Profile } from '@shared/models/profile';
import { AccountVerifyStatusEnum, CredentialTypeEnum } from '@shared/types';
import { catchError, from, map, of, switchMap, tap, timer } from 'rxjs';
import { BcryptService } from 'shared/bcrypt/src/bcrypt.service';
import { HttpStatusCode } from 'axios';
import { JwtConfig } from '@shared/configs';

@Injectable()
export class AccountService {
  private readonly logger = new Logger(AccountService.name);
  private jwtConfig: JwtConfig;
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
    return of({ message: 'Not impelemnted!!' });
  }

  handleDeactivate(body: DeactivateDto) {
    return of({ message: 'Not impelemnted!!' });
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
          'Token xác thực tài khoản đã hết hạn, xin vui lòng thử lại.'
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
                  'Token xác thực tài khoản đã hết hạn, xin vui lòng thử lại.'
                );
              }

              if (payload?.token !== response?.token) {
                return throwException(
                  HttpStatusCode.BadRequest,
                  'Có lỗi xảy ra trong quá trình xác thực, xin vui lòng thử lại.'
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
          tap((result) => {
            const key = this.getCacheKey(email);
            const ttlInSeconds = 7 * 24 * 60 * 60;

            this.eventEmitter.emit(CacheMessageAction.Create, {
              key,
              value: { ...result, profile: DefaultProfileValue },
              ttl: ttlInSeconds,
            });
          })
        )
      ),
      map(() => ({
        message: `Đường dẫn xác thực tài khoản đã được gửi đến email: ${email}. Vui lòng kiểm tra hộp thư để hoàn tất quá trình xác thực tài khoản.`,
      }))
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
          this.logger.error('Có lỗi sãy ra khi gửi otp verify email');
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
            ttl: 180, // 3 phut
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
    );
  }

  handleDeleteAccount(body: DeleteAccountDto) {
    return from(this.accountModel.findOne({ where: { id: body.id } })).pipe(
      catchError(() =>
        throwException(
          HttpStatusCode.InternalServerError,
          'Có lỗi xảy ra khi xoá tài khoản.'
        )
      ),
      switchMap((user) => {
        if (user) {
          return from(user.destroy()).pipe(
            tap(() => {
              this.eventEmitter.emit(
                CacheMessageAction.Delete,
                this.getCacheKey(user.email, user.credentialType)
              );
            }),
            map(() => ({ message: 'Xoá tài khoản thành công.', data: body.id }))
          );
        }
        return throwException(
          HttpStatusCode.NotFound,
          'Tài khoản không tồn tại.'
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
  getExistingAccount(
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
          map(
            (response) =>
              (response?.toJSON?.() as {
                id: string;
                email: string;
                createdAt: string;
                updatedAt: string;
                isVerify: boolean;
                password: string;
                credentialType: CredentialTypeEnum;
              }) || null
          )
        );
      })
    );
  }
}
