import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  CreateAccountDto,
  SignInDto,
  SignInOauth,
  AuthenticateDto,
  ResendVerifyEmail,
  VerifyEmailOtp,
  RefreshTokenDto,
} from '@shared/dtos/account';
import { AuthMsgPattern } from '@shared/message-pattern/account';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AuthMsgPattern.Authenticate)
  handleSignInWithToken(body: AuthenticateDto) {
    return this.authService.handleSignInWithToken(body);
  }

  @MessagePattern(AuthMsgPattern.SignIn)
  handleSignIn(body: SignInDto) {
    return this.authService.handleSignIn(body);
  }

  @MessagePattern(AuthMsgPattern.SignInOauth)
  handleOAuth(body: SignInOauth) {
    return this.authService.handleOAuth(body);
  }

  @MessagePattern(AuthMsgPattern.SignUp)
  handleSignUp(body: CreateAccountDto) {
    return this.authService.handleSignUp(body);
  }

  @MessagePattern(AuthMsgPattern.VerifyEmail)
  handleVerifyEmail(body: VerifyEmailOtp) {
    return this.authService.handleVerifyEmail(body);
  }

  @MessagePattern(AuthMsgPattern.SendOtpVerifyEmail)
  handleSendTokenVerifyEmail(body: ResendVerifyEmail) {
    return this.authService.handleSendTokenVerifyEmail(body);
  }


  @MessagePattern(AuthMsgPattern.RefreshToken)
  handleRefreshToken(body: RefreshTokenDto) {
    return this.authService.handleRefreshToken(body);
  }
}
