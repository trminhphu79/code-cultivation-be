import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { from, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as bcrypt from 'bcrypt';
import { throwException } from '@shared/exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
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
}
