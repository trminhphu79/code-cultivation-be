import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { throwException } from '@shared/exception';
import { HttpService } from '@nestjs/axios';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/sequelize';
import { OAuth2Client } from 'google-auth-library';
import { CacheMessageAction, CacheManagerService } from '@shared/cache-manager';
import { GitHubConfig, GoogleConfig } from '@shared/configs';
import {
  CreateAccountDto,
  SignInDto,
  SignInOauth,
  AuthenticateDto,
} from '@shared/dtos/account';
import { Account } from '@shared/models/account';
import { HttpStatusCode } from 'axios';
import { BcryptService } from 'shared/bcrypt/src/bcrypt.service';
import { CredentialTypeEnum, GitHubUser } from '@shared/types';
import { AccountService } from '../account/account.service';
import { DefaultProfileValue } from '@shared/models/profile';

@Injectable()
export class AuthService {
  oauthClient!: OAuth2Client;
  githubConfig!: GitHubConfig;
  googleConfig!: GoogleConfig;

  constructor(
    @InjectModel(Account)
    private readonly accountModel: typeof Account,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    private readonly cacheService: CacheManagerService,
    private readonly eventEmitter: EventEmitter2,
    private readonly bcryptService: BcryptService,
    private readonly configService: ConfigService,
    private readonly accountService: AccountService
  ) {
    this.githubConfig = this.configService.get<GitHubConfig>('github');
    this.googleConfig = this.configService.get<GoogleConfig>('google');
    this.oauthClient = new OAuth2Client({
      clientId: this.googleConfig?.clientId,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
  generateFullTokens<T>(payload: T & Object) {
    return of(payload).pipe(
      map((payload) => ({
        accessToken: this.jwtService.sign(payload, {
          expiresIn: '2m',
        }),
      })),
      tap((token) => Logger.log('accessToken: ', token?.accessToken)),
      map(({ accessToken }) => ({
        accessToken,
        refreshToken: this.jwtService.sign(payload, {
          expiresIn: '30d',
        }),
      })),
      tap((token) => Logger.log('refreshToken: ', token.refreshToken)),
      catchError((error) =>
        throwException(500, `Lỗi tạo token ${error.message}`)
      )
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
  generateAccessTokens<T>(payload: T & Object) {
    return of(payload).pipe(
      map((payload) => ({
        accessToken: this.jwtService.sign(payload, {
          expiresIn: '2m',
        }),
      })),
      catchError((error) =>
        throwException(500, `Lỗi tạo token ${error.message}`)
      )
    );
  }

  private verifyToken(token: string) {
    return from(this.jwtService.verifyAsync(token)).pipe(
      catchError(() =>
        throwException(401, `Token không hợp lệ hoặc đã hết hạn!`)
      )
    );
  }

  handleSignUp({ email, password }: CreateAccountDto) {
    return this.getExistingAccount(email).pipe(
      switchMap((existingUser) => {
        if (existingUser) {
          return throwException(
            HttpStatus.BAD_REQUEST,
            'Tài khoản đã tồn tại, vui lòng thử lại với email khác!'
          );
        }

        return from(this.bcryptService.hashPassword(password)).pipe(
          switchMap((hashedPassword) =>
            from(
              this.accountModel.create({
                email,
                password: hashedPassword,
              })
            ).pipe(
              map((response) => response.toJSON()),
              tap((result) => {
                const key = this.getCacheKey(email);
                this.eventEmitter.emit(CacheMessageAction.Create, {
                  key,
                  value: { ...result, profile: DefaultProfileValue },
                });
              }),
              map((response) => {
                delete response.password;
                return response;
              }),
              switchMap((data) =>
                of({
                  message: 'Tạo tài khoản thành công',
                  data,
                })
              )
            )
          ),
          catchError((error) =>
            throwException(
              HttpStatus.INTERNAL_SERVER_ERROR,
              `Database error: ${error.message}`
            )
          )
        );
      })
    );
  }

  handleSignIn({ email, password }: SignInDto) {
    return this.getExistingAccount(email).pipe(
      switchMap((userData) => {
        if (userData) {
          return this.bcryptService
            .comparePassword(password, userData.password)
            .pipe(
              switchMap((isMatch) => {
                if (!isMatch) {
                  return throwException(
                    HttpStatus.BAD_REQUEST,
                    'Mật khẩu không chính xác!'
                  );
                }
                delete userData.password;
                return from(
                  this.generateFullTokens<{
                    id: string;
                    email: string;
                    createdAt: string;
                    updatedAt: string;
                  }>(userData)
                ).pipe(
                  map((tokens) => ({
                    message: 'Đăng nhập thành công!',
                    data: {
                      ...userData,
                      tokens,
                    },
                  }))
                );
              })
            );
        }

        return throwException(
          HttpStatusCode.NotFound,
          'Không tìm thấy người dùng!'
        );
      })
    );
  }

  handleSignInWithToken({ token }: AuthenticateDto) {
    return this.verifyToken(token).pipe(
      switchMap(() => {
        const source = this.jwtService.decode(token) as { email: string };
        console.log('decode value: source', source);
        if (!source?.email) {
          return throwException(
            HttpStatusCode.NotFound,
            'Không tìm thấy người dùng!'
          );
        }
        return this.getExistingAccount(source.email, CredentialTypeEnum.NONE);
      })
    );
  }

  handleOAuth({ token, credentialType }: SignInOauth) {
    switch (credentialType) {
      case CredentialTypeEnum.GITHUB:
        return this.handleOAuthGithub({ token, credentialType });
      default:
        return this.handleOAuthGoogle({ token, credentialType });
    }
  }

  private handleOAuthGoogle({ token }: SignInOauth) {
    console.log('handleOAuthGoogle: ', token);
    return from(
      this.oauthClient.verifyIdToken({
        idToken: token,
        audience: this.googleConfig.clientId,
      })
    ).pipe(
      tap((response) => {
        console.log('Verify google sign in response: ', response);
      })
    );
  }

  private handleOAuthGithub({ token }: SignInOauth) {
    const { client_id, client_secret, url } = this.githubConfig;

    const payload = {
      client_id,
      client_secret,
      code: token,
      accept: 'json',
    };

    return this.httpService.post(url, payload).pipe(
      filter((response) => !!response?.data),
      map((response) => {
        const tokenMatch = (response?.data as string)?.match(
          /access_token=([^&]*)/
        )?.[1];
        if (!tokenMatch) {
          return throwException(
            HttpStatus.BAD_REQUEST,
            'Lỗi xác thực người dùng github, vui lòng thử lại!'
          );
        }
        return tokenMatch;
      }),
      switchMap((token: string) => {
        Logger.log('Received Token:', token);
        return this.getGithubUserInfo(token);
      }),
      switchMap((userInfo) =>
        this.handleGetOrCreateGithubAccount(userInfo.data)
      ),
      catchError((error) => {
        Logger.error('Error during OAuth sign-in:', error);
        return throwException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Có lỗi xảy ra trong quá trình xác thực người dùng từ github!'
        );
      })
    );
  }

  private getGithubUserInfo(token: string) {
    return this.httpService
      .get<GitHubUser>(this.githubConfig.userInfoUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        catchError((error) => {
          Logger.error('Error fetching GitHub user info:', error);
          return throwException(
            HttpStatus.BAD_REQUEST,
            'Lấy thông tin người dùng từ github thất bại'
          );
        })
      );
  }

  private handleGetOrCreateGithubAccount(userInfo: GitHubUser) {
    const { email, name, avatar_url, bio, login, html_url } = userInfo;
    Logger.log('GitHubUser: ', userInfo);

    const _email = email || login + '@github.com';

    return this.getExistingAccount(_email, CredentialTypeEnum.GITHUB).pipe(
      switchMap((existingAccount) => {
        if (existingAccount) {
          delete existingAccount.password;
          return this.generateFullTokens(existingAccount).pipe(
            map((tokens) => ({
              message: 'Đăng nhập thành công!',
              data: { ...existingAccount, tokens },
            }))
          );
        }

        return this.createNewAccountAndProfile({
          email: _email,
          name,
          avatarUrl: avatar_url,
          credentialType: CredentialTypeEnum.GITHUB,
          bio,
          githubLink: html_url,
        });
      })
    );
  }

  private createNewAccountAndProfile({
    email,
    name,
    bio,
    avatarUrl,
    credentialType,
    githubLink,
  }: {
    email: string;
    name: string;
    avatarUrl: string;
    credentialType: string;
    bio: string;
    githubLink: string;
  }) {
    let accountData: any;
    return from(this.accountModel.create({ email, credentialType })).pipe(
      map((account) => {
        accountData = account.toJSON();
        return accountData;
      }),
      switchMap((account) =>
        this.createProfile({
          accountId: account.id,
          fullName: name,
          avatarUrl,
          bio,
          githubLink,
        }).pipe(
          tap((profile) => {
            const key = this.getCacheKey(email, CredentialTypeEnum.GITHUB);
            this.eventEmitter.emit(CacheMessageAction.Create, {
              key,
              value: { ...accountData, email, profile },
            });
          }),
          switchMap((profile) =>
            this.generateFullTokens({
              ...accountData,
              fullName: profile.fullName,
            }).pipe(
              tap(() => {
                delete accountData.password;
              }),
              map((tokens) => ({
                message: 'Đăng nhập thành công!',
                data: { ...accountData, tokens, profile },
              }))
            )
          )
        )
      )
    );
  }

  private createProfile({
    accountId,
    fullName,
    avatarUrl,
    bio,
    githubLink,
  }: {
    accountId: string;
    fullName: string;
    avatarUrl: string;
    bio: string;
    githubLink: string;
  }) {
    return from(
      this.accountService.handleCreateProfile(
        {
          fullName,
          avatarUrl,
          bio,
          githubLink,
        },
        accountId
      )
    ).pipe(
      catchError((error) => {
        Logger.error('Error creating profile:', error);
        return throwException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Tạo thông tin người dùng thất bại!'
        );
      })
    );
  }

  /**
   *
   * @param email
   * @param credentialType
   * @returns Return the current cached user if it exists; otherwise, fetch it from the database.
   */
  private getExistingAccount(
    email: string,
    credentialType: CredentialTypeEnum = CredentialTypeEnum.NONE
  ) {
    const cacheKey = this.getCacheKey(email, credentialType);
    return this.cacheService.get(cacheKey).pipe(
      switchMap((cacheData) => {
        if (cacheData) {
          return of(cacheData);
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
        ).pipe(map((response) => response?.toJSON?.() || null));
      })
    );
  }

  private getCacheKey(
    email: string,
    credentialType: CredentialTypeEnum = CredentialTypeEnum.NONE
  ) {
    return `ACCOUNT#${email}#${credentialType}`;
  }
}
