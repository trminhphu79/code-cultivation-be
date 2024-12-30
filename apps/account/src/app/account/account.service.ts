import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ChangePasswordDto, DeactivateDto } from '@shared/dtos/account';
import { Account } from '@shared/models/account';
import { of } from 'rxjs';
@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account)
    private readonly userModel: typeof Account
  ) {}

  handleChangePassword(body: ChangePasswordDto) {
    return of({ message: 'Not impelemnted!!' });
  }

  handleDeactivate(body: DeactivateDto) {
    return of({ message: 'Not impelemnted!!' });
  }
}
