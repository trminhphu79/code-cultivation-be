import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
  HasOne,
  AfterCreate,
} from 'sequelize-typescript';
import { Profile } from './profile.model';

enum CredentialTypeEnum {
  NONE = 'NONE',
  GOOGLE = 'GOOGLE',
  GITHUB = 'GITHUB',
}

@Table({ tableName: 'account' })
export class Account extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  override id!: string;

  @Column
  email!: string;

  @Column
  password!: string;

  @Column({
    defaultValue: CredentialTypeEnum.NONE,
  })
  credentialType!: CredentialTypeEnum;

  @HasOne(() => Profile)
  profile!: Profile;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  override createdAt!: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  override updatedAt!: Date;

  @AfterCreate
  static async createProfile(instance: Account) {
    await Profile.create({
      accountId: instance.id,
      fullName: 'Vô danh',
      bio: '',
      avatarUrl: '',
      totalExp: 0,
      streak: 0,
      isActive: true,
    });
  }
}
