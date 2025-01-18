import { Role } from '@shared/guard';
import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
  HasOne,
  AfterCreate,
} from 'sequelize-typescript';
import { DefaultProfileValue, Profile } from './profile.model';
import { CredentialTypeEnum } from '@shared/types';

function generateRandomNickName(): string {
  const prefixes = [
    'Dao',
    'Tien',
    'Kiem',
    'Ma',
    'Chan',
    'Vuong',
    'Phong',
    'Huyen',
    'Linh',
    'Nguyen',
  ]; // Prefixes related to cultivation fantasy

  const characters = 'GENERATENICKNAMEFROMTMPANKHOITRANVIPPRO79KHCR';
  const length = Math.floor(Math.random() * (16 - 8 + 1)) + 8; // Random length between 8 and 16 for the main part of the nickname

  // Select a random prefix
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];

  // Generate the random main part of the nickname
  const mainPart = Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join('');

  // Combine prefix and main part
  const result = `${randomPrefix}_${mainPart}`?.toLowerCase();
  console.log('NICK NAME:', result);
  return result;
}

const familyNames = [
  'Tiêu',
  'Lý',
  'Trương',
  'Hoàng',
  'Nguyễn',
  'Phạm',
  'Đặng',
  'Tôn',
  'Mạc',
  'Chu',
  'Hạ',
  'Dương',
  'Vương',
  'Hàn',
  'Tần',
  'Triệu',
  'Từ',
  'Lâm',
  'Bạch',
  'Thạch',
  'Kim',
  'Long',
  'Phượng',
];

const middleNames = [
  'Thiên',
  'Huyền',
  'Phong',
  'Vũ',
  'Thanh',
  'Hải',
  'Ngọc',
  'Tuyết',
  'Vân',
  'Kiếm',
  'Tâm',
  'Bích',
  'Anh',
  'Minh',
  'Hùng',
  'Linh',
  'Khải',
  'Huyền',
  'Chân',
  'Nguyên',
  'Đạo',
  'Lý',
  'Tiêu',
  'Vân',
  'Ngã',
  'Hoàng',
  'Minh',
  'Lãnh',
  'Thân',
  'Soái',
];

const givenNames = [
  'Anh',
  'Bình',
  'Cường',
  'Dũng',
  'Hạnh',
  'Khang',
  'Lộc',
  'Mai',
  'Ngân',
  'Phong',
  'Quý',
  'Sơn',
  'Tâm',
  'Uyên',
  'Việt',
  'Yến',
  'Tiêu',
  'Dương',
  'Phi',
  'Nghê',
  'Điệp',
  'Nhi',
  'Lan',
  'Nhan',
  'Đình',
  'Băng',
  'Nghi',
  'Hồng',
];

function generateFullName(): string {
  // Chọn họ ngẫu nhiên
  const familyName =
    familyNames[Math.floor(Math.random() * familyNames.length)];

  // Chọn tên đệm ngẫu nhiên
  const middleName =
    middleNames[Math.floor(Math.random() * middleNames.length)];

  // Chọn tên chính ngẫu nhiên
  const givenName = givenNames[Math.floor(Math.random() * givenNames.length)];

  // Kết hợp họ, tên đệm, và tên chính
  return `${familyName} ${middleName} ${givenName}`;
}

@Table({ tableName: 'account' })
export class Account extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  override id!: string;

  @Column
  email!: string;

  @Column
  password!: string;

  @Column({
    type: DataType.STRING,
  })
  role!: Role;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isVerify!: boolean;

  @Column({
    defaultValue: CredentialTypeEnum.NONE,
    type: DataType.STRING,
  })
  credentialType!: CredentialTypeEnum;

  @HasOne(() => Profile)
  profile!: Profile;

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

  @AfterCreate
  static async createProfile(instance: Account) {
    const defaultAccount = {
      ...DefaultProfileValue,
      nickName: generateRandomNickName(),
      accountId: instance.id,
      fullName: generateFullName(),
    };
    try {
      await Profile.create(defaultAccount);
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  }
}
