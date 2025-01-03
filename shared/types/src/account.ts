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
  nickName: string;
};
