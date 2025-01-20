import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { Profile } from './profile.model';

@Table({ tableName: 'realm' })
export class Realm extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  override id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description!: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: true,
  })
  level!: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: true,
  })
  requireExp!: number;


  @HasMany(() => Profile)
  profiles!: Profile[];

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
