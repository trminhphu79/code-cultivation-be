import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  ChangePasswordDto,
  DeactivateDto,
  CreateProfileDto,
} from '@shared/dtos/account';
import { Profile } from '@shared/models/profile';
import { from, of } from 'rxjs';
@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Profile)
    private readonly profileModel: typeof Profile
  ) {}

  handleChangePassword(body: ChangePasswordDto) {
    return of({ message: 'Not impelemnted!!' });
  }

  handleDeactivate(body: DeactivateDto) {
    return of({ message: 'Not impelemnted!!' });
  }

  handleCreateProfile(body: CreateProfileDto, accountId: string) {
    return from(
      this.profileModel.create({
        ...body,
        accountId,
      })
    );
  }
}
