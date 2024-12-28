import { Body, Controller, Inject, Logger, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { NatsMicroserviceConfig } from '@shared/configs';
import { AuthMsgPattern } from '@shared/message-pattern/account';
import { Observable, tap } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('NATS_SERVICE')
    private natsClient: ClientProxy,
    private configService: ConfigService
  ) {
    console.log(
      'configService: ',
      this.configService.get<NatsMicroserviceConfig>('microservice')
    );
  }

  @Post('signIn')
  signIn(@Body() body: { email: string; password: string }): Observable<any> {
    Logger.log('Input SignIn: ', body);
    return this.natsClient.send(AuthMsgPattern.SignIn, body).pipe(
      tap((response) => {
        Logger.log('response SignIn: ', response);
      })
    );
  }
}
