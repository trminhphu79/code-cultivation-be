import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
  HasOne,
  AfterCreate,
} from 'sequelize-typescript';
import { DefaultProfileValue, Profile } from './profile.model';
import { CredentialTypeEnum } from '@shared/types';
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
    type: DataType.STRING
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
    return { ...DefaultProfileValue, accountId: instance.id };
  }
}
