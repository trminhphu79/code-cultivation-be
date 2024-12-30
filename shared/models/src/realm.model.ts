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
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;

  @HasMany(() => Profile)
  profiles!: Profile[];

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
