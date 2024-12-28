import { CreateAccountDto, SignInDto } from 'shared/dtos/src/account';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthMsgPattern } from '@shared/message-pattern/account';
import { AccountService } from './account.service';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @MessagePattern(AuthMsgPattern.SignIn)
  handleSignIn(body: SignInDto) {
    return this.accountService.signIn(body);
  }

  @MessagePattern(AuthMsgPattern.SignUp)
  handleSignUp(body: CreateAccountDto) {
    return this.accountService.createAccountDto(body);
  }
}
