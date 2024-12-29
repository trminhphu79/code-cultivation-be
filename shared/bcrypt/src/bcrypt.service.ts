import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { from, Observable } from 'rxjs';

@Injectable()
export class BcryptService {
  constructor(private configService: ConfigService) {}
  /**
   * Hash a plain text password.
   * @param plainPassword - The plain text password.
   * @returns The hashed password.
   */
  hashPassword(plainPassword: string): Observable<string> {
    return from(
      bcrypt.hash(plainPassword, this.configService.get('saltRounds') as number)
    );
  }

  /**
   * Compare a plain text password with a hashed password.
   * @param plainPassword - The plain text password.
   * @param hashedPassword - The hashed password.
   * @returns True if they match, false otherwise.
   */
  comparePassword(
    plainPassword: string,
    hashedPassword: string
  ): Observable<boolean> {
    return from(bcrypt.compare(plainPassword, hashedPassword));
  }
}
