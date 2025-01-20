export const AccountAlert = Object.freeze({
  // Account Creation & Verification
  AccountCreated: 'Tạo tài khoản thành công',
  AccountVerified: 'Xác thực tài khoản thành công',
  AccountUpdated: 'Cập nhật tài khoản thành công',
  AccountDeleted: 'Xóa tài khoản thành công',

  // Account Status
  AccountNotFound: 'Tài khoản không tồn tại, vui lòng thử lại với email khác',
  AccountAlreadyExists: 'Tài khoản đã tồn tại, vui lòng thử lại với email khác',
  AccountNotVerified:
    'Tài khoản đã tồn tại nhưng chưa xác thực, xin vui lòng xác thực để đăng nhập',
  AccountAlreadyVerified:
    'Tài khoản này đã được xác thực, vui lòng thử lại với email khác',

  // Verification Process
  VerificationEmailSent:
    'Đường dẫn xác thực tài khoản đã được gửi đến email: {email}. Vui lòng kiểm tra hộp thư để hoàn tất quá trình xác thực tài khoản',
  VerificationTokenExpired:
    'Token xác thực tài khoản đã hết hạn, xin vui lòng thử lại',
  VerificationError:
    'Có lỗi xảy ra trong quá trình xác thực, xin vui lòng thử lại',
  VerificationEmailError: 'Có lỗi sãy ra khi gửi otp verify email',
  VerificationEmailSuccess: 'Gửi otp verify email thành công',

  // Authentication
  LoginSuccess: 'Đăng nhập thành công',
  LoginFailed: 'Tài khoản hoặc mật khẩu không chính xác',
  TokenError: 'Token không hợp lệ hoặc đã hết hạn',
  TokenExpired: 'Token đã hết hạn hoặc không hợp lệ vui lòng thử lại',

  TokenRefreshSuccess: 'Tạo mới token thành công',
  UserNotFound: 'Không tìm thấy người dùng',

  // OAuth Authentication
  GoogleAuthError: 'Có lỗi xảy ra trong quá trình xác thực người dùng từ gmail',
  GithubAuthError: 'Lỗi xác thực người dùng github, vui lòng thử lại',
  GithubUserInfoError: 'Lấy thông tin người dùng từ github thất bại',
  OAuthError: 'Có lỗi xảy ra trong quá trình xác thực người dùng từ github',
  OAuthLoginSuccess: 'Đăng nhập thành công',

  // Profile
  ProfileCreateError: 'Tạo thông tin người dùng thất bại',
  ProfileDeleteError: 'Có lỗi xảy ra khi xoá tài khoản',
  ProfileDeleteSuccess: 'Xoá tài khoản thành công',

  // General Errors
  TokenGenerationError: 'Lỗi tạo token',
  InternalError: 'Có lỗi xảy ra khi xoá tài khoản',
  NotImplemented: 'Not impelemnted!!',

  // Cache Operations
  CacheLockError: 'Failed to acquire lock after retries',

  // Role Management
  RoleUpdated: 'Cập nhật quyền người dùng thành công',
  RoleUpdateError: 'Có lỗi xảy ra khi cập nhật quyền người dùng',
  RoleInvalid: 'Quyền người dùng không hợp lệ',

  // Profile Alert
  DontHavePermissionToModifyProfile:
    'Bạn không có quyền để thực hiện hành động này',

  SocialProfileCreateSuccess: 'Thêm liên kết mạng xã hội thành công',
  SocialProfileUpdateSuccess: 'Cập nhật liên kết mạng xã hội thành công',
  SocialProfileDeleteSuccess: 'Xoá liên kết mạng xã hội thành công',
  SocialProfileFailExisting:
    'Thêm liên kết mạng xã hội thất bại, đã tồn tại',
  SocialProfileError:
    'Có lỗi xãy ra khi thực hiện hành động này',
});
