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

export const DefaultProfileValue = {
  bio: '',
  avatarUrl: '',
  totalExp: 0,
  streak: 0,
  isActive: true,
};
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
    allowNull: false,
    unique: true,
  })
  nickName!: string;

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

  // @BeforeCreate
  // static async generateUniqueNickName(instance: Profile) {
  //   if (!instance.nickName) {
  //     instance.nickName = Profile.generateRandomNickName();
  //   }
  // }
}
