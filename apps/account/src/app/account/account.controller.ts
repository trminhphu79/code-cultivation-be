import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  ChangePasswordDto,
  DeactivateDto,
  DeleteAccountDto,
} from '@shared/dtos/account';
import { ProfileMsgPattern } from '@shared/message-pattern/account';
import { AccountService } from './account.service';
@Controller()
export class AccountController {
  constructor(private accountService: AccountService) {}

  @MessagePattern(ProfileMsgPattern.ChangePassword)
  handleChangePassword(body: ChangePasswordDto) {
    return this.accountService.handleChangePassword(body);
  }

  @MessagePattern(ProfileMsgPattern.Deactivate)
  handleDeactivate(body: DeactivateDto) {
    return this.accountService.handleDeactivate(body);
  }

  @MessagePattern(ProfileMsgPattern.Delete)
  handleDeleteAccount(body: DeleteAccountDto) {
    return this.accountService.handleDeleteAccount(body);
  }
}
