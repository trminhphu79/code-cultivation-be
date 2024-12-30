import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Account } from './account.model';
import { Realm } from './realm.model';

@Table({ tableName: 'profile' })
export class Profile extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  override id!: string;

  @ForeignKey(() => Account)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  accountId!: string;

  @BelongsTo(() => Account)
  account!: Account;

  @ForeignKey(() => Realm)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  realmId!: string;

  @BelongsTo(() => Realm)
  realm!: Realm;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bio!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  avatarUrl!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '0',
  })
  totalExp!: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  streak!: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive!: boolean;

  @Column({
    type: DataType.STRING,
    defaultValue: '',
    allowNull: true,
  })
  githubLink!: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: false,
  })
  override createdAt!: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: false,
  })
  override updatedAt!: Date;
}
