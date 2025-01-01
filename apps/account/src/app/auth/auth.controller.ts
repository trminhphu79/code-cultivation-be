import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  CreateAccountDto,
  SignInDto,
  SignInOauth,
  AuthenticateDto,
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
  handleSignInOauth(body: SignInOauth) {
    return this.authService.handleSignInOauth(body);
  }

  @MessagePattern(AuthMsgPattern.SignUp)
  handleSignUp(body: CreateAccountDto) {
    return this.authService.handleSignUp(body);
  }
}
