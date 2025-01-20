import { AccountModule } from './module';

export const AuthMsgPattern = Object.freeze({
  SignUp: `${AccountModule.Auth}/SignUp`,

  SignIn: `${AccountModule.Auth}/SignIn`,
  SignInOauth: `${AccountModule.Auth}/SignInOauth`,
  Authenticate: `${AccountModule.Auth}/Authenticate`,

  AccessToken: `${AccountModule.Auth}/AccessToken`,
  RefreshToken: `${AccountModule.Auth}/RefreshToken`,

  Update: `${AccountModule.Auth}/Update`,
  Deactivate: `${AccountModule.Profile}/Deactivate`,

  GetCache: `${AccountModule.Auth}/GetCache`,
  VerifyEmail: `${AccountModule.Auth}/VerifyEmail`,
  SendOtpVerifyEmail: `${AccountModule.Auth}/SendOtpVerifyEmail`,
});
