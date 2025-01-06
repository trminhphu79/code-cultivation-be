import {
  Table,
  Column,
  Model,
  ForeignKey,
  PrimaryKey,
  DataType,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { Sect } from './sect.model';
import { ProfileMaterialArt } from './profile-material-art.model';

@Table({ tableName: 'material_arts' })
export class MaterialArt extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  override id!: string;

  @ForeignKey(() => Sect)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  sectId!: string;

  @BelongsTo(() => Sect)
  sect!: Sect;

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

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description!: string;

  @HasMany(() => ProfileMaterialArt)
  profileMaterialArts!: ProfileMaterialArt[];
}
