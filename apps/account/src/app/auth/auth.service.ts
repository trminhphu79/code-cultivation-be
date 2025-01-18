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
import { GitHubConfig, GoogleConfig, JwtConfig } from '@shared/configs';
import {
  CreateAccountDto,
  SignInDto,
  SignInOauth,
  AuthenticateDto,
  ResendVerifyEmail,
  VerifyEmailOtp,
  RefreshTokenDto,
} from '@shared/dtos/account';
import { Account } from '@shared/models/account';
import { HttpStatusCode } from 'axios';
import { BcryptService } from 'shared/bcrypt/src/bcrypt.service';
import {
  CreateAccountAndProfile,
  CredentialTypeEnum,
  GitHubUser,
} from '@shared/types';
import { AccountAlert } from '@shared/alert/account';
import { AccountService } from '../account/account.service';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  oauthClient!: OAuth2Client;
  githubConfig!: GitHubConfig;
  jwtConfig!: JwtConfig;
  googleConfig!: GoogleConfig;

  constructor(
    @InjectModel(Account)
    private readonly accountModel: typeof Account,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    private readonly bcryptService: BcryptService,
    private readonly configService: ConfigService,
    private readonly accountService: AccountService
  ) {
    this.githubConfig = this.configService.get<GitHubConfig>('github');
    this.googleConfig = this.configService.get<GoogleConfig>('google');
    this.jwtConfig = this.configService.get<JwtConfig>('jwt');
    this.oauthClient = new OAuth2Client({
      clientId: this.googleConfig?.clientId,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
  generateFullTokens<T>(payload: T & Object) {
    return of(payload).pipe(
      map((payload) => ({
        accessToken: this.jwtService.sign(payload, {
          expiresIn: this.jwtConfig.accessExpiry,
          secret: this.jwtConfig.secret,
        }),
      })),
      tap((token) => this.logger.log('accessToken: ', token?.accessToken)),
      map(({ accessToken }) => ({
        accessToken,
        refreshToken: this.jwtService.sign(payload, {
          expiresIn: this.jwtConfig.refreshExpiry,
          secret: this.jwtConfig.secret,
        }),
      })),
      tap((token) => this.logger.log('refreshToken: ', token.refreshToken)),
      catchError((error) =>
        throwException(500, AccountAlert.TokenGenerationError)
      )
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
  generateAccessToken<T>(payload: T & Object) {
    return of(payload).pipe(
      map((payload) => ({
        accessToken: this.jwtService.sign(payload, {
          expiresIn: this.jwtConfig.accessExpiry,
          secret: this.jwtConfig.secret,
        }),
      })),
      tap((token) =>
        this.logger.log('generateAccessTokens: ', token.accessToken)
      ),
      catchError((error) =>
        throwException(500, AccountAlert.TokenGenerationError)
      )
    );
  }

  private verifyToken(token: string) {
    return from(
      this.jwtService.verifyAsync(token, { secret: this.jwtConfig?.secret })
    ).pipe(catchError(() => throwException(401, AccountAlert.TokenError)));
  }

  handleVerifyEmail(body: VerifyEmailOtp) {
    return this.accountService.handleVerifyEmail(body).pipe(
      switchMap(
        (response: { email: string; credentialType: CredentialTypeEnum }) => {
          return this.accountModel.findOne({
            where: {
              email: response.email,
              credentialType: response.credentialType,
            },
            include: [
              {
                association: 'profile',
                required: false, // Set to true if the profile must exist
              },
            ],
          });
        }
      ),
      switchMap((userData) => {
        const jsonData = userData?.toJSON?.();
        delete jsonData?.password;
        const payload = {
          email: jsonData?.email,
          credentialType: jsonData?.credentialType,
          fullName: jsonData?.profile?.fullName,
          role: jsonData?.role,
        };
        return this.generateFullTokens(payload).pipe(
          map((tokens) => ({
            data: {
              ...jsonData,
              tokens,
            },
            message: AccountAlert.AccountVerified,
          }))
        );
      })
    );
  }

  handleSendTokenVerifyEmail(body: ResendVerifyEmail) {
    return this.accountService.getExistingAccountByEmail(body.email).pipe(
      switchMap((existingUser) => {
        if (!existingUser) {
          return throwException(
            HttpStatus.NOT_FOUND,
            AccountAlert.AccountNotFound
          );
        }

        if (existingUser && !existingUser.isVerify) {
          return of({
            message: AccountAlert.VerificationEmailSent.replace(
              '{email}',
              body.email
            ),
          }).pipe(
            tap(() => {
              this.accountService.handleSendTokenVerifyEmail({
                email: body.email,
                credentialType: existingUser.credentialType,
              });
            })
          );
        }

        return throwException(
          HttpStatus.BAD_REQUEST,
          AccountAlert.AccountAlreadyVerified
        );
      })
    );
  }

  handleSignUp({ email, password, confirmPassword }: CreateAccountDto) {
    return this.accountService.getExistingAccountByEmail(email).pipe(
      switchMap((existingUser) => {
        if (existingUser && existingUser?.isVerify) {
          return throwException(
            HttpStatus.BAD_REQUEST,
            AccountAlert.AccountAlreadyExists
          );
        }

        if (existingUser && !existingUser?.isVerify) {
          return throwException(
            HttpStatus.BAD_REQUEST,
            AccountAlert.AccountNotVerified
          );
        }
        return this.accountService.handleCreateAccount({
          email: email,
          password: password,
          confirmPassword,
        });
      }),
      map((response) => ({
        data: response,
        message: AccountAlert.AccountCreated,
      })),
      tap(() => {
        this.accountService.handleSendTokenVerifyEmail({
          email,
          credentialType: CredentialTypeEnum.NONE,
        });
      })
    );
  }

  handleSignIn({ email, password }: SignInDto) {
    return from(
      this.accountModel.findOne({
        where: { email, credentialType: CredentialTypeEnum.NONE },
        attributes: ['email', 'password'],
      })
    ).pipe(
      switchMap((userData) => {
        if (userData) {
          userData = userData.toJSON();
          return this.bcryptService
            .comparePassword(password, userData.password)
            .pipe(
              switchMap((isMatch) => {
                if (!isMatch) {
                  return throwException(
                    HttpStatus.BAD_REQUEST,
                    AccountAlert.LoginFailed
                  );
                }

                return this.accountService
                  .getExistingAccountByEmail(email, CredentialTypeEnum.NONE)
                  .pipe(
                    switchMap((response) => {
                      const payload = {
                        email: response?.email,
                        credentialType: response?.credentialType,
                        fullName: response?.profile?.fullName,
                        role: response?.role,
                      };
                      return from(this.generateFullTokens(payload)).pipe(
                        map((tokens) => ({
                          message: AccountAlert.LoginSuccess,
                          data: {
                            ...response,
                            tokens,
                          },
                        }))
                      );
                    })
                  );
              })
            );
        }

        return throwException(
          HttpStatusCode.BadRequest,
          AccountAlert.LoginFailed
        );
      })
    );
  }

  handleSignInWithToken({ token }: AuthenticateDto) {
    return this.verifyToken(token).pipe(
      switchMap(() => {
        const source = this.jwtService.decode(token) as {
          email: string;
          credentialType: CredentialTypeEnum;
        };

        if (!source?.email) {
          return throwException(
            HttpStatusCode.Unauthorized,
            AccountAlert.TokenExpired
          );
        }
        return this.accountService.getExistingAccountByEmail(
          source.email,
          source.credentialType
        );
      }),
      switchMap((response) => {
        if (!response) {
          return throwException(
            HttpStatusCode.NotFound,
            AccountAlert.AccountNotFound
          );
        }

        delete response.password;
        return of({
          data: response,
          message: AccountAlert.LoginSuccess,
        });
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

  handleRefreshToken({ refreshToken }: RefreshTokenDto) {
    return from(
      this.jwtService.verifyAsync<{
        email: string;
        credentialType: CredentialTypeEnum;
      }>(refreshToken, {
        secret: this.jwtConfig?.secret,
      })
    ).pipe(
      catchError(() =>
        throwException(HttpStatusCode.Forbidden, AccountAlert.TokenExpired)
      ),
      switchMap((decodedData) => {
        if (!decodedData || !decodedData?.email) {
          return throwException(
            HttpStatusCode.Forbidden,
            AccountAlert.TokenExpired
          );
        }

        return this.accountService
          .getExistingAccountByEmail(
            decodedData.email,
            decodedData.credentialType
          )
          .pipe(
            switchMap((cacheData) => {
              if (cacheData) {
                delete cacheData?.password;
                const payload = {
                  email: cacheData?.email,
                  credentialType: cacheData?.credentialType,
                  fullName: cacheData?.profile?.fullName,
                };
                return this.generateAccessToken(payload).pipe(
                  map((token) => ({
                    data: token,
                    message: AccountAlert.TokenRefreshSuccess,
                  }))
                );
              }
              return throwException(
                HttpStatusCode.Forbidden,
                AccountAlert.TokenExpired
              );
            })
          );
      })
    );
  }

  private handleOAuthGoogle({ token }: SignInOauth) {
    this.logger.log('handleOAuthGoogle: ', token);
    return from(
      this.oauthClient.verifyIdToken({
        idToken: token,
        audience: this.googleConfig.clientId,
      })
    ).pipe(
      catchError(() =>
        throwException(HttpStatusCode.BadRequest, AccountAlert.GoogleAuthError)
      ),
      map((googlResponse) => googlResponse.getPayload()),
      switchMap((response) => {
        return this.accountService
          .getExistingAccountByEmail(response.email, CredentialTypeEnum.GOOLGE)
          .pipe(
            switchMap((existingAccount) => {
              if (existingAccount) {
                delete existingAccount.password;
                const payload = {
                  email: existingAccount?.email,
                  credentialType: existingAccount?.credentialType,
                  fullName: existingAccount?.profile?.fullName,
                  role: existingAccount?.role,
                };
                return this.generateFullTokens(payload).pipe(
                  map((tokens) => ({
                    message: AccountAlert.OAuthLoginSuccess,
                    data: { ...existingAccount, tokens },
                  }))
                );
              }
              const payload = {
                email: response.email,
                name:
                  response?.name ||
                  response?.family_name + ' ' + response?.given_name,
                avatarUrl: response?.picture,
                credentialType: CredentialTypeEnum.GOOLGE,
                bio: '',
                githubLink: '',
              };
              return this.accountService
                .createAccountForSoicalLogin(payload)
                .pipe(
                  catchError((error) => {
                    this.logger.error('Error creating profile:', error);
                    return throwException(
                      HttpStatus.INTERNAL_SERVER_ERROR,
                      AccountAlert.ProfileCreateError
                    );
                  }),
                  switchMap((data) => {
                    const payload = {
                      email: existingAccount?.email,
                      credentialType: existingAccount?.credentialType,
                      fullName: existingAccount?.profile?.fullName,
                      role: existingAccount?.role,
                    };
                    return this.generateFullTokens(payload).pipe(
                      map((tokens) => ({
                        message: AccountAlert.LoginSuccess,
                        data: { ...data, tokens },
                      }))
                    );
                  })
                );
            })
          );
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
            AccountAlert.GithubAuthError
          );
        }
        return tokenMatch;
      }),
      switchMap((token: string) => {
        this.logger.log('Received Token:', token);
        return this.getGithubUserInfo(token);
      }),
      switchMap((userInfo) =>
        this.handleGetOrCreateGithubAccount(userInfo.data)
      ),
      catchError((error) => {
        this.logger.error('Error during OAuth sign-in:', error);
        return throwException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          AccountAlert.OAuthError
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
          this.logger.error('Error fetching GitHub user info:', error);
          return throwException(
            HttpStatus.BAD_REQUEST,
            AccountAlert.GithubUserInfoError
          );
        })
      );
  }

  private handleGetOrCreateGithubAccount(userInfo: GitHubUser) {
    const { email, name, avatar_url, bio, login, html_url } = userInfo;
    this.logger.log('GitHubUser: ', userInfo);

    const _email = email || login + '@github.com';

    return this.accountService
      .getExistingAccountByEmail(_email, CredentialTypeEnum.GITHUB)
      .pipe(
        switchMap((existingAccount) => {
          if (existingAccount) {
            delete existingAccount.password;
            const payload = {
              email: existingAccount?.email,
              credentialType: existingAccount?.credentialType,
              fullName: existingAccount?.profile?.fullName,
              role: existingAccount?.role,
            };
            return this.generateFullTokens(payload).pipe(
              map((tokens) => ({
                message: AccountAlert.OAuthLoginSuccess,
                data: { ...existingAccount, tokens },
              }))
            );
          }

          const payload = {
            email: _email,
            name,
            avatarUrl: avatar_url,
            credentialType: CredentialTypeEnum.GITHUB,
            bio,
            githubLink: html_url,
            nickName: _email?.split('@')?.[0] || '',
          };
          return this.accountService.createAccountForSoicalLogin(payload).pipe(
            catchError((error) => {
              this.logger.error('Error creating profile:', error);
              return throwException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                AccountAlert.ProfileCreateError
              );
            }),
            switchMap((data) => {
              const payload = {
                email: data?.email,
                credentialType: data?.credentialType,
                fullName: data?.profile?.fullName,
                role: data?.role,
              };
              return this.generateFullTokens(payload).pipe(
                map((tokens) => ({
                  message: AccountAlert.LoginSuccess,
                  data: { ...data, tokens },
                }))
              );
            })
          );
        })
      );
  }
}
