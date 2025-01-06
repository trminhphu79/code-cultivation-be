import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { ProfileAchievement } from './profile-achievement.model';

@Table({ tableName: 'achievements' })
export class Achievement extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  override id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  logo!: string;

  @HasMany(() => ProfileAchievement)
  profileAchievements!: ProfileAchievement[];
}
