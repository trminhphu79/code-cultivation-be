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
import { MaterialArt } from './material-art.model';

@Table({ tableName: 'profileMaterialArts' })
export class ProfileMaterialArt extends Model {
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

  @ForeignKey(() => MaterialArt)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  materialArtId!: string;

  @BelongsTo(() => MaterialArt)
  materialArt!: MaterialArt;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: '0',
  })
  masteryLevel!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  override createdAt!: Date;
}
