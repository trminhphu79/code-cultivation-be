import {
  Body,
  Controller,
  Get,
  Header,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthMsgPattern } from '@shared/message-pattern/account';
import {
  ChangePasswordDto,
  CreateAccountDto,
  DeactivateDto,
  SignInDto,
  SignInOauth,
  AuthenticateDto,
  VerifyEmailOtp,
  ResendVerifyEmail,
} from 'shared/dtos/src/account';
import { Public } from '@shared/guard';
import { Throttle } from '@nestjs/throttler';

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

  @Post('authenticate')
  @Public()
  @ApiOperation({ summary: 'Sign in with access token' })
  authenticate(@Body() body: AuthenticateDto) {
    return this.natsClient.send(AuthMsgPattern.Authenticate, body);
  }

  @Post('oauth')
  @Public()
  @ApiOperation({ summary: 'Sign in with github or facebook' })
  signInOauth(@Body() body: SignInOauth) {
    console.log('signInOauth: ', body);
    return this.natsClient.send(AuthMsgPattern.SignInOauth, body);
  }

  @Post('signUp')
  @Public()
  @ApiOperation({ summary: 'Sign up with email and password' })
  signUp(@Body() body: CreateAccountDto) {
    return this.natsClient.send(AuthMsgPattern.SignUp, body);
  }

  @Post('verify')
  @Public()
  @ApiOperation({ summary: 'Verify email after sign up by email' })
  verifyEmail(@Body() body: VerifyEmailOtp) {
    return this.natsClient.send(AuthMsgPattern.VerifyEmail, body);
  }

  //TODO enhancement for tracking user id or ip 
  //https://innosufiyan.hashnode.dev/custom-throttler-guard-in-nestjs-with-redis

  @Throttle({
    default: {
      limit: 5,
      ttl: 10000,
    },
  }) 
  @Post('sendOtp')
  @Public()
  @ApiOperation({ summary: 'Send otp to email for verify email' })
  sendOtpVerify(@Body() body: ResendVerifyEmail) {
    return this.natsClient.send(AuthMsgPattern.SendOtpVerifyEmail, body);
  }

  @Patch('changePassword')
  @ApiOperation({ summary: 'Change password only for user login by email' })
  changePassword(
    @Body()
    body: ChangePasswordDto
  ) {
    return this.natsClient.send(AuthMsgPattern.SignUp, body);
  }

  @Patch('deactivate')
  @ApiOperation({ summary: 'deactivate account only for user login by email' })
  deactivate(@Body() body: DeactivateDto) {
    return this.natsClient.send(AuthMsgPattern.Deactivate, body);
  }
}
