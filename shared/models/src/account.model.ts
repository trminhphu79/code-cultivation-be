import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
} from 'sequelize-typescript';

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
}
