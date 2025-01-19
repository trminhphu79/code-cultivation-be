import { Controller, Put, Param, Body } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  ChangePasswordDto,
  DeactivateDto,
  DeleteAccountDto,
} from '@shared/dtos/account';
import { ProfileMsgPattern } from '@shared/message-pattern/account';
import { AccountService } from './account.service';
import { PagingDto } from 'shared/dtos/src/common/paging.dto';
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

  @MessagePattern(ProfileMsgPattern.ListAccount)
  handlePagingAccount(@Payload() body: PagingDto) {
    return this.accountService.handlePagingAccount(body);
  }
}
