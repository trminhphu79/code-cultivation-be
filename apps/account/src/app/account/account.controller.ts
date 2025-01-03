import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  ChangePasswordDto,
  DeactivateDto,
} from '@shared/dtos/account';
import { AuthMsgPattern } from '@shared/message-pattern/account';
import { AccountService } from './account.service';
@Controller()
export class AccountController {
  constructor(private accountService: AccountService) {}

  @MessagePattern(AuthMsgPattern.ChangePassword)
  handleChangePassword(body: ChangePasswordDto) {
    return this.accountService.handleChangePassword(body);
  }

  @MessagePattern(AuthMsgPattern.Deactivate)
  handleDeactivate(body: DeactivateDto) {
    return this.accountService.handleDeactivate(body);
  }
}
