import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthMsgPattern } from '@shared/message-pattern/account';
import { of } from 'rxjs';

@Controller()
export class AppController {

  
  @MessagePattern(AuthMsgPattern.SignIn)
  ping() {
    console.log('SignIn:...');
    return of({
      message: 'Sign Successfully',
      data: {
        username: 'trminhphu79',
        role: 'Admin',
        accessToken: 'pzzz',
      },
    });
  }
}
