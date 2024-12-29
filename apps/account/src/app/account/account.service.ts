import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Account } from '@shared/models/account';
import { catchError, from, map, of, switchMap, tap } from 'rxjs';
import { BcryptService } from 'shared/bcrypt/src/bcrypt.service';
import {
  CreateAccountDto,
  SignInDto,
  SignInOauth,
} from 'shared/dtos/src/account';
import { throwException } from '@shared/exception';
import { AuthService } from '../auth/auth.service';
import { HttpStatusCode } from 'axios';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CacheMessageAction } from '@shared/cache-manager';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account)
    private readonly userModel: typeof Account,
    private readonly authService: AuthService,
    private readonly eventEmitter: EventEmitter2,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService
  ) {}

  createAccountDto({ email, password }: CreateAccountDto) {
    return from(this.userModel.findOne({ where: { email } })).pipe(
      switchMap((existingUser) => {
        if (existingUser) {
          return throwException(HttpStatus.BAD_REQUEST, 'Email already exist!');
        }

        return from(this.bcryptService.hashPassword(password)).pipe(
          switchMap((hashedPassword) =>
            from(
              this.userModel.create({
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

  signIn({ email, password }: SignInDto) {
    return from(this.userModel.findOne({ where: { email } })).pipe(
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

  signInOauth({ token, credentialType }: SignInOauth) {
    const tokenValue = this.jwtService.decode(token);
    console.log('tokenValue:', tokenValue);
    Logger.log('signInOauth with: ', credentialType);
    return of({ data: tokenValue });
  }
}
