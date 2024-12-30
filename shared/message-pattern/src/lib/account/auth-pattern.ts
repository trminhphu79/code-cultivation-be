import { AccountModule } from './module';

export const AuthMsgPattern = Object.freeze({
  SignUp: `${AccountModule.Auth}/SignUp`,

  SignIn: `${AccountModule.Auth}/SignIn`,
  SignInOauth: `${AccountModule.Auth}/SignInOauth`,

  AccessToken: `${AccountModule.Auth}/RefreshToken`,
  RefreshToken: `${AccountModule.Auth}/AccessToken`,

  Update: `${AccountModule.Auth}/Update`,
  ChangePassword: `${AccountModule.Profile}/ChangePassword`,
  Deactivate: `${AccountModule.Profile}/Deactivate`,
});
