import {
  Table,
  Column,
  Model,
  ForeignKey,
  PrimaryKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Profile } from './profile.model';
import { Achievement } from './achievement.model';

@Table({ tableName: 'profile_achievements' })
export class ProfileAchievement extends Model {
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

  @ForeignKey(() => Achievement)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  achievementId!: string;

  @BelongsTo(() => Achievement)
  achievement!: Achievement;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  override createdAt!: Date;
}
