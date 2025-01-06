import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { MaterialArt } from './material-art.model';

@Table({ tableName: 'sects' })
export class Sect extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  override id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  logo!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description!: string;

  @HasMany(() => MaterialArt)
  materialArts!: MaterialArt[];
}
