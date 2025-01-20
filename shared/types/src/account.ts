export enum CredentialTypeEnum {
  NONE = 'NONE',
  GITHUB = 'GITHUB',
  GOOLGE = 'GOOGLE',
}

export enum AccountVerifyStatusEnum {
  UNVERIFY = 'UNVERIFY',
}

export type CreateAccountAndProfile = {
  email: string;
  name: string;
  bio: string;
  avatarUrl: string;
  credentialType: CredentialTypeEnum;
  githubLink: string;
};

export enum ActionExpType {
  CHECK_IN,

  READ_POST,
  COMMENT_POST,
  LIKE_POST,
  DISLIKE_POST,

  CREATE_GUILD,
}

export enum RequireRealExpEnum {
  // DƯỚI THẦN CẢNH
  PHAM_NHAN = 0,
  VO_SI = 100,
  VO_SU = 500,
  DAI_VO_SU = 1000,
  VO_QUAN = 2000,
  VO_VUONG = 5000,
  VO_HOANG = 10000,
  VO_TONG = 20000,
  VO_TON = 30000,
  VO_DE = 50000,

  //THẬP PHƯƠNG THẦN CẢNH
  QUY_CHAN_CANH = 60000,
  CHUONG_THIEN_CANH = 800000,
  HU_CUC_CANH = 100000,
  TAO_HOA_CANH = 125000,
  GIOI_VUONG_CANH = 150000,
  THIEN_GIOI_CHI_CHU = 200000,
  VAN_CO_CHI_TON = 500000,
}
