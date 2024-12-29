import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthMsgPattern } from '@shared/message-pattern/account';
import {
  CreateAccountDto,
  SignInDto,
  SignInOauth,
} from 'shared/dtos/src/account';
import { Public } from '@shared/guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('NATS_SERVICE')
    private natsClient: ClientProxy
  ) {}

  @Post('signIn')
  @Public()
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Password is incorrect',
  })
  @ApiOperation({ summary: 'Sign in with email and password' })
  signIn(@Body() body: SignInDto) {
    return this.natsClient.send(AuthMsgPattern.SignIn, body);
  }

  @Post('oauth')
  @Public()
  @ApiOperation({ summary: 'Sign in with github or facebook' })
  signInOauth(@Body() body: SignInOauth) {
    return this.natsClient.send(AuthMsgPattern.SignInOauth, body);
  }

  @Post('signUp')
  @Public()
  @ApiOperation({ summary: 'Sign up with email and password' })
  signUp(@Body() body: CreateAccountDto) {
    return this.natsClient.send(AuthMsgPattern.SignUp, body);
  }
}
