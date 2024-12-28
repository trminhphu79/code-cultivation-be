import { AccountModule } from './module';

export const AuthMsgPattern = Object.freeze({
  SignUp: `${AccountModule.Auth}/SignUp`,

  SignIn: `${AccountModule.Auth}/SignIn`,
  SignInGithub: `${AccountModule.Auth}/SignInGitHub`,
  SignInFacebook: `${AccountModule.Auth}/SignInFacebook`,

  AccessToken: `${AccountModule.Auth}/RefreshToken`,
  RefreshToken: `${AccountModule.Auth}/AccessToken`,

  Update: `${AccountModule.Auth}/Update`,
});
