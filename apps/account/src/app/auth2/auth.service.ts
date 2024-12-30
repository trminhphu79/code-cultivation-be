import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { from, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { throwException } from '@shared/exception';
import { HttpService } from '@nestjs/axios';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/sequelize';
import { CacheMessageAction } from '@shared/cache-manager';
import { GitHubConfig } from '@shared/configs';
import { CreateAccountDto, SignInDto, SignInOauth } from '@shared/dtos/account';
import { Account } from '@shared/models/account';
import { HttpStatusCode } from 'axios';
import { BcryptService } from 'shared/bcrypt/src/bcrypt.service';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(Account)
    private readonly accountModel: typeof Account,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    private readonly authService: AuthService,
    private readonly eventEmitter: EventEmitter2,
    private readonly bcryptService: BcryptService,
    private readonly configService: ConfigService
  ) {}

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
          expiresIn: '7d',
        }),
      })),
      tap((token) => Logger.log('refreshToken: ', token.refreshToken)),
      catchError((error) =>
        throwException(400, `Token generation failed: ${error.message}`)
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
        throwException(400, `Token generation failed: ${error.message}`)
      )
    );
  }
  verifyToken(token: string) {
    return from(this.jwtService.verifyAsync(token)).pipe(
      catchError(() => throwException(400, `'Invalid or expired token`))
    );
  }

  handleSignUp({ email, password }: CreateAccountDto) {
    return from(this.accountModel.findOne({ where: { email } })).pipe(
      switchMap((existingUser) => {
        if (existingUser) {
          return throwException(HttpStatus.BAD_REQUEST, 'Email already exist!');
        }

        return from(this.bcryptService.hashPassword(password)).pipe(
          switchMap((hashedPassword) =>
            from(
              this.accountModel.create({
                email,
                password: hashedPassword,
              })
            ).pipe(
              map((response) => {
                const result = response.toJSON();
                delete result.password;
                return result;
              }),
              tap((result) => {
                this.eventEmitter.emit(CacheMessageAction.Create, {
                  key: 'account#' + result?.id,
                  value: result,
                });
              }),
              switchMap((data) =>
                of({
                  message: 'Account created successfully!',
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
    return from(this.accountModel.findOne({ where: { email } })).pipe(
      catchError((error) => {
        return throwException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `Database error: ${error.message}`
        );
      }),
      switchMap((existingUser) => {
        if (existingUser) {
          return this.bcryptService
            .comparePassword(password, existingUser.password)
            .pipe(
              switchMap((isMatch) => {
                Logger.log('Is Matched: ', isMatch);
                if (!isMatch) {
                  return throwException(
                    HttpStatus.BAD_REQUEST,
                    'Password is incorrect'
                  );
                }

                const result = existingUser.toJSON();
                delete result.password;

                return from(
                  this.authService.generateFullTokens<{
                    id: string;
                    email: string;
                    createdAt: string;
                    updatedAt: string;
                  }>(result)
                ).pipe(
                  map((token) => ({
                    message: 'Sign in successfully!',
                    data: {
                      ...result,
                      token,
                    },
                  }))
                );
              })
            );
        }
        return throwException(HttpStatusCode.NotFound, 'User not found');
      })
    );
  }

  handleSignInOauth({ code }: SignInOauth) {
    const { client_id, client_secret, url } =
      this.configService.get<GitHubConfig>('github');
    const payload = {
      client_id,
      client_secret,
      code,
      accept: 'json',
    };
    console.log('signInOauth: ', client_id, client_secret, url);
    return this.httpService.post(url, payload).pipe(
      tap((response) => {
        console.log('login github successfully: ', response);
      })
    );
  }
}
