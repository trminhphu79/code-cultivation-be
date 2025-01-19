import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Profile } from './profile.model';
import { Social } from './social.model';

@Table({ tableName: 'profileSocials' })
export class ProfileSocial extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  override id!: string;

  @ForeignKey(() => Profile)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  profileId!: string;

  @BelongsTo(() => Profile)
  profile!: Profile;

  @ForeignKey(() => Social)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  socialId!: string;

  @BelongsTo(() => Social)
  social!: Social;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  link!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status!: string;
}
