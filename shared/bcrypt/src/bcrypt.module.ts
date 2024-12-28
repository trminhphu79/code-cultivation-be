import { Global, Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';
import { ConfigModule } from '@nestjs/config';
import { Configurations } from '@shared/configs';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Configurations],
      isGlobal: true,
    }),
  ],
  providers: [BcryptService],
  exports: [BcryptService],
})
export class BcryptModule {}
