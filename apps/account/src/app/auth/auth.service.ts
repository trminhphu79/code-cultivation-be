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
    private readonly cacheService: CacheManagerService,
    private readonly eventEmitter: EventEmitter2,
    private readonly bcryptService: BcryptService,
    private readonly configService: ConfigService,
    private readonly accountService: AccountService
  ) {
    this.githubConfig = this.configService.get<GitHubConfig>('github');
    this.googleConfig = this.configService.get<GoogleConfig>('google');
    this.jwtConfig = this.configService.get<JwtConfig>('jwt');
    console.log('jwtConfig: ', this.jwtConfig);
    this.oauthClient = new OAuth2Client({
      clientId: this.googleConfig?.clientId,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
  generateFullTokens<T>(payload: T & Object) {
    console.log(this.jwtService);
    return of(payload).pipe(
      map((payload) => ({
        accessToken: this.jwtService.sign(payload, {
          expiresIn: this.jwtConfig.accessExpiry,
        }),
      })),
      tap((token) => this.logger.log('accessToken: ', token?.accessToken)),
      map(({ accessToken }) => ({
        accessToken,
        refreshToken: this.jwtService.sign(payload, {
          expiresIn: this.jwtConfig.refreshExpiry,
        }),
      })),
      tap((token) => this.logger.log('refreshToken: ', token.refreshToken)),
      catchError((error) =>
        throwException(500, `Lỗi tạo token ${error.message}`)
      )
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
  generateAccessToken<T>(payload: T & Object) {
    return of(payload).pipe(
      map((payload) => ({
        accessToken: this.jwtService.sign(payload, {
          expiresIn: this.jwtConfig.accessExpiry,
        }),
      })),
      tap((token) =>
        this.logger.log('generateAccessTokens: ', token.accessToken)
      ),
      catchError((error) =>
        throwException(500, `Lỗi tạo token ${error.message}`)
      )
    );
  }

  private verifyToken(token: string) {
    return from(
      this.jwtService.verifyAsync(token, { secret: this.jwtConfig?.secret })
    ).pipe(
      catchError(() =>
        throwException(401, `Token không hợp lệ hoặc đã hết hạn!`)
      )
    );
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
        delete jsonData.password;
        return this.generateFullTokens(jsonData).pipe(
          map((tokens) => ({
            data: {
              ...jsonData,
              tokens,
            },
            message: 'Xác thực tài khoản thành công.',
          }))
        );
      })
    );
  }

  handleSendTokenVerifyEmail(body: ResendVerifyEmail) {
    return this.accountService.getExistingAccount(body.email).pipe(
      switchMap((existingUser) => {
        if (!existingUser) {
          return throwException(
            HttpStatus.NOT_FOUND,
            'Tài khoản không tồn tại, vui lòng thử lại với email khác.'
          );
        }

        console.log('existingUser: ', existingUser);

        if (existingUser && !existingUser.isVerify) {
          return of({
            message: `Đường dẫn xác thực tài khoản đã được gửi đến email: ${body.email}. Vui lòng kiểm tra hộp thư để hoàn tất quá trình xác thực tài khoản.`,
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
          'Tài khoản này đã được xác thực, vui lòng thử lại với email khác. '
        );
      })
    );
  }

  handleSignUp({ email, password, confirmPassword }: CreateAccountDto) {
    return this.accountService.getExistingAccount(email).pipe(
      switchMap((existingUser) => {
        if (existingUser && existingUser?.isVerify) {
          return throwException(
            HttpStatus.BAD_REQUEST,
            'Tài khoản đã tồn tại, vui lòng thử lại với email khác.'
          );
        }

        if (existingUser && !existingUser?.isVerify) {
          return throwException(
            HttpStatus.BAD_REQUEST,
            'Tài khoản đã tồn tại nhưng chưa xác thực, xin vui lòng xác thực để đăng nhập.'
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
        message: 'Tạo tài khoản thành công',
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
      })
    ).pipe(
      switchMap((userData) => {
        if (userData) {
          return this.bcryptService
            .comparePassword(password, userData.password)
            .pipe(
              switchMap((isMatch) => {
                if (!isMatch) {
                  return throwException(
                    HttpStatus.BAD_REQUEST,
                    'Mật khẩu không chính xác.'
                  );
                }
                delete userData.password;
                return from(this.generateFullTokens(userData)).pipe(
                  map((tokens) => ({
                    message: 'Đăng nhập thành công.',
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
          'Không tìm thấy người dùng.'
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

        console.log('source: ', source);
        if (!source?.email) {
          return throwException(
            HttpStatusCode.NotFound,
            'Không tìm thấy người dùng.'
          );
        }
        return this.accountService.getExistingAccount(
          source.email,
          source.credentialType
        );
      }),
      switchMap((response) => {
        if (!response) {
          return throwException(
            HttpStatusCode.NotFound,
            'Không tìm thấy người dùng.'
          );
        }

        delete response.password;
        return of({
          data: response,
          message: 'Đăng nhập thành công.',
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
        throwException(
          HttpStatusCode.Forbidden,
          'Token đã hết hạn hoặc không hợp lệ vui lòng thử lại.'
        )
      ),
      switchMap((decodedData) => {
        if (!decodedData || !decodedData?.email) {
          return throwException(
            HttpStatusCode.Forbidden,
            'Token đã hết hạn hoặc không hợp lệ vui lòng thử lại.'
          );
        }

        return this.accountService
          .getExistingAccount(decodedData.email, decodedData.credentialType)
          .pipe(
            switchMap((cacheData) => {
              if (cacheData) {
                delete cacheData?.password;
                return this.generateAccessToken(cacheData).pipe(
                  map((token) => ({
                    data: token,
                    message: 'Tạo mới token thành công.',
                  }))
                );
              }
              return throwException(
                HttpStatusCode.Forbidden,
                'Token đã hết hạn hoặc không hợp lệ vui lòng thử lại.'
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
        throwException(
          HttpStatusCode.BadRequest,
          'Có lỗi xảy ra trong quá trình xác thực người dùng từ gmail.'
        )
      ),
      map((googlResponse) => googlResponse.getPayload()),
      switchMap((response) => {
        console.log('Oauth google resposne: ', response);
        return this.accountService
          .getExistingAccount(response.email, CredentialTypeEnum.GOOLGE)
          .pipe(
            switchMap((existingAccount) => {
              if (existingAccount) {
                delete existingAccount.password;
                return this.generateFullTokens(existingAccount).pipe(
                  map((tokens) => ({
                    message: 'Đăng nhập thành công.',
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
              return this.createNewAccountAndProfile(payload);
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
            'Lỗi xác thực người dùng github, vui lòng thử lại.'
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
          'Có lỗi xảy ra trong quá trình xác thực người dùng từ github.'
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
            'Lấy thông tin người dùng từ github thất bại'
          );
        })
      );
  }

  private handleGetOrCreateGithubAccount(userInfo: GitHubUser) {
    const { email, name, avatar_url, bio, login, html_url } = userInfo;
    this.logger.log('GitHubUser: ', userInfo);

    const _email = email || login + '@github.com';

    return this.accountService
      .getExistingAccount(_email, CredentialTypeEnum.GITHUB)
      .pipe(
        switchMap((existingAccount) => {
          if (existingAccount) {
            delete existingAccount.password;
            return this.generateFullTokens(existingAccount).pipe(
              map((tokens) => ({
                message: 'Đăng nhập thành công.',
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
          return this.createNewAccountAndProfile(payload);
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
        this.createProfile({
          accountId: account.id,
          fullName: name,
          avatarUrl,
          bio,
          githubLink,
        }).pipe(
          tap((profile) => {
            const key = this.getCacheKey(email, credentialType);
            const ttlInSeconds = 7 * 24 * 60 * 60;
            this.eventEmitter.emit(CacheMessageAction.Create, {
              key,
              value: { ...accountData, email, profile },
              ttl: ttlInSeconds,
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
                message: 'Đăng nhập thành công.',
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
        this.logger.error('Error creating profile:', error);
        return throwException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Tạo thông tin người dùng thất bại.'
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
}
