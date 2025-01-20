/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const auth_module_1 = __webpack_require__(6);
const profile_module_1 = __webpack_require__(57);
const nats_client_1 = __webpack_require__(59);
const configs_1 = __webpack_require__(61);
const config_1 = __webpack_require__(41);
const core_1 = __webpack_require__(2);
const guard_1 = __webpack_require__(39);
const cache_health_module_1 = __webpack_require__(64);
const jwt_1 = __webpack_require__(42);
const metadata_module_1 = __webpack_require__(75);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            profile_module_1.ProfileModule,
            metadata_module_1.MetadataModule,
            jwt_1.JwtModule.registerAsync({
                imports: [
                    config_1.ConfigModule.forRoot({
                        load: [configs_1.Configurations],
                        isGlobal: true,
                    }),
                ],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const config = configService.get('jwt');
                    console.log('JwtConfig: ', config);
                    return {
                        secret: config?.secret,
                        privateKey: config?.privateKey,
                        signOptions: {
                            algorithm: config?.algorithm,
                        },
                    };
                },
            }),
            nats_client_1.NatsClientModule,
            cache_health_module_1.CacheHealthModule,
            config_1.ConfigModule.forRoot({
                load: [configs_1.Configurations],
                isGlobal: true,
            }),
            cache_health_module_1.CacheHealthModule,
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: guard_1.AuthGuard,
            },
        ],
    })
], AppModule);


/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const auth_controller_1 = __webpack_require__(7);
const throttler_1 = __webpack_require__(45);
const core_1 = __webpack_require__(2);
const guard_1 = __webpack_require__(39);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [auth_controller_1.AuthController],
        imports: [
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 1000,
                    limit: 100,
                },
            ]),
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: guard_1.CustomThrottleGuard,
            },
        ],
    })
], AuthModule);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const microservices_1 = __webpack_require__(8);
const swagger_1 = __webpack_require__(3);
const account_1 = __webpack_require__(9);
const account_2 = __webpack_require__(14);
const guard_1 = __webpack_require__(39);
const throttler_1 = __webpack_require__(45);
let AuthController = class AuthController {
    constructor(natsClient) {
        this.natsClient = natsClient;
    }
    signIn(body) {
        return this.natsClient.send(account_1.AuthMsgPattern.SignIn, body);
    }
    authenticate(body) {
        return this.natsClient.send(account_1.AuthMsgPattern.Authenticate, body);
    }
    refreshToken(body) {
        return this.natsClient.send(account_1.AuthMsgPattern.RefreshToken, body);
    }
    signInOauth(body) {
        console.log('signInOauth: ', body);
        return this.natsClient.send(account_1.AuthMsgPattern.SignInOauth, body);
    }
    signUp(body) {
        return this.natsClient.send(account_1.AuthMsgPattern.SignUp, body);
    }
    verifyEmail(body) {
        return this.natsClient.send(account_1.AuthMsgPattern.VerifyEmail, body);
    }
    //TODO enhancement for tracking user id or ip
    //https://innosufiyan.hashnode.dev/custom-throttler-guard-in-nestjs-with-redis
    sendOtpVerify(body) {
        return this.natsClient.send(account_1.AuthMsgPattern.SendOtpVerifyEmail, body);
    }
    changePassword(body) {
        return this.natsClient.send(account_1.AuthMsgPattern.SignUp, body);
    }
    deactivate(body) {
        return this.natsClient.send(account_1.AuthMsgPattern.Deactivate, body);
    }
};
exports.AuthController = AuthController;
tslib_1.__decorate([
    (0, throttler_1.Throttle)({
        default: {
            limit: 100,
            ttl: 10000,
        },
    }),
    (0, common_1.Post)('signIn'),
    (0, guard_1.Public)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CONFLICT,
        description: 'Password is incorrect',
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Sign in with email and password' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof account_2.SignInDto !== "undefined" && account_2.SignInDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "signIn", null);
tslib_1.__decorate([
    (0, throttler_1.Throttle)({
        default: {
            limit: 100,
            ttl: 10000,
        },
    }),
    (0, common_1.Post)('authenticate'),
    (0, guard_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Sign in with access token' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof account_2.AuthenticateDto !== "undefined" && account_2.AuthenticateDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "authenticate", null);
tslib_1.__decorate([
    (0, throttler_1.Throttle)({
        default: {
            limit: 100,
            ttl: 10000,
        },
    }),
    (0, common_1.Post)('refreshToken'),
    (0, guard_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Re new tokens' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof account_2.RefreshTokenDto !== "undefined" && account_2.RefreshTokenDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "refreshToken", null);
tslib_1.__decorate([
    (0, throttler_1.Throttle)({
        default: {
            limit: 100,
            ttl: 10000,
        },
    }),
    (0, common_1.Post)('oauth'),
    (0, guard_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Sign in with github or facebook' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof account_2.SignInOauth !== "undefined" && account_2.SignInOauth) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "signInOauth", null);
tslib_1.__decorate([
    (0, throttler_1.Throttle)({
        default: {
            limit: 100,
            ttl: 10000,
        },
    }),
    (0, common_1.Post)('signUp'),
    (0, guard_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Sign up with email and password' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof account_2.CreateAccountDto !== "undefined" && account_2.CreateAccountDto) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "signUp", null);
tslib_1.__decorate([
    (0, throttler_1.Throttle)({
        default: {
            limit: 100,
            ttl: 10000,
        },
    }),
    (0, common_1.Post)('verify'),
    (0, guard_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Verify email after sign up by email' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof account_2.VerifyEmailOtp !== "undefined" && account_2.VerifyEmailOtp) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "verifyEmail", null);
tslib_1.__decorate([
    (0, throttler_1.Throttle)({
        default: {
            limit: 100,
            ttl: 10000,
        },
    }),
    (0, common_1.Post)('sendOtp'),
    (0, guard_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Send otp to email for verify email' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof account_2.ResendVerifyEmail !== "undefined" && account_2.ResendVerifyEmail) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "sendOtpVerify", null);
tslib_1.__decorate([
    (0, common_1.Patch)('changePassword'),
    (0, swagger_1.ApiOperation)({ summary: 'Change password only for user login by email' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof account_2.ChangePasswordDto !== "undefined" && account_2.ChangePasswordDto) === "function" ? _j : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "changePassword", null);
tslib_1.__decorate([
    (0, common_1.Patch)('deactivate'),
    (0, swagger_1.ApiOperation)({ summary: 'deactivate account only for user login by email' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_k = typeof account_2.DeactivateDto !== "undefined" && account_2.DeactivateDto) === "function" ? _k : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "deactivate", null);
exports.AuthController = AuthController = tslib_1.__decorate([
    (0, common_1.Controller)('auth'),
    tslib_1.__param(0, (0, common_1.Inject)('NATS_SERVICE')),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], AuthController);


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(10), exports);
tslib_1.__exportStar(__webpack_require__(13), exports);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthMsgPattern = void 0;
const module_1 = __webpack_require__(11);
exports.AuthMsgPattern = Object.freeze({
    SignUp: `${module_1.AccountModule.Auth}/SignUp`,
    SignIn: `${module_1.AccountModule.Auth}/SignIn`,
    SignInOauth: `${module_1.AccountModule.Auth}/SignInOauth`,
    Authenticate: `${module_1.AccountModule.Auth}/Authenticate`,
    AccessToken: `${module_1.AccountModule.Auth}/AccessToken`,
    RefreshToken: `${module_1.AccountModule.Auth}/RefreshToken`,
    Update: `${module_1.AccountModule.Auth}/Update`,
    Deactivate: `${module_1.AccountModule.Profile}/Deactivate`,
    GetCache: `${module_1.AccountModule.Auth}/GetCache`,
    VerifyEmail: `${module_1.AccountModule.Auth}/VerifyEmail`,
    SendOtpVerifyEmail: `${module_1.AccountModule.Auth}/SendOtpVerifyEmail`,
});


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountModule = void 0;
const __1 = __webpack_require__(12);
exports.AccountModule = Object.freeze({
    Auth: `${__1.MicroServiceName.Account}/Auth`,
    Profile: `${__1.MicroServiceName.Account}/Profile`,
});


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MicroServiceName = void 0;
exports.MicroServiceName = Object.freeze({
    Account: 'AccountService',
    Guild: 'GuildService',
    Scripture: 'ScriptureService',
    Core: 'CoreService',
    Activity: 'ActivityService',
});


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileMsgPattern = void 0;
const module_1 = __webpack_require__(11);
exports.ProfileMsgPattern = Object.freeze({
    UpdateExp: `${module_1.AccountModule.Profile}/UpdateExp`,
    UpdateStreak: `${module_1.AccountModule.Profile}/UpdateStreak`,
    UpdateRealm: `${module_1.AccountModule.Profile}/UpdateRealm`,
    UpdatePersonal: `${module_1.AccountModule.Profile}/UpdatePersonal`,
    Deactivate: `${module_1.AccountModule.Profile}/Deactivate`,
    Delete: `${module_1.AccountModule.Profile}/Delete`,
    ChangePassword: `${module_1.AccountModule.Profile}/ChangePassword`,
    ListAccount: `${module_1.AccountModule.Profile}/ListAccount`,
    AddAchivement: `${module_1.AccountModule.Profile}/AddAchivement`,
    RemoveAchivement: `${module_1.AccountModule.Profile}/RemoveAchivement`,
    AddMaterialArt: `${module_1.AccountModule.Profile}/AddMaterialArt`,
    RemoveMaterialArt: `${module_1.AccountModule.Profile}/RemoveMaterialArt`,
    GetAllRelatedInfoProfile: `${module_1.AccountModule.Profile}/GetAllRelatedInfoProfile`,
    GetSocialProfile: `${module_1.AccountModule.Profile}/GetSocialProfile`,
    AddSocialProfile: `${module_1.AccountModule.Profile}/AddSocialProfile`,
    UpdateSocialProfile: `${module_1.AccountModule.Profile}/UpdateSocialProfile`,
    DeleteSocialProfile: `${module_1.AccountModule.Profile}/DeleteSocialProfile`,
});


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(15), exports);
tslib_1.__exportStar(__webpack_require__(17), exports);
tslib_1.__exportStar(__webpack_require__(18), exports);
tslib_1.__exportStar(__webpack_require__(19), exports);
tslib_1.__exportStar(__webpack_require__(20), exports);
tslib_1.__exportStar(__webpack_require__(21), exports);
tslib_1.__exportStar(__webpack_require__(22), exports);
tslib_1.__exportStar(__webpack_require__(23), exports);
tslib_1.__exportStar(__webpack_require__(24), exports);
tslib_1.__exportStar(__webpack_require__(27), exports);
tslib_1.__exportStar(__webpack_require__(28), exports);
tslib_1.__exportStar(__webpack_require__(29), exports);
tslib_1.__exportStar(__webpack_require__(52), exports);
tslib_1.__exportStar(__webpack_require__(56), exports);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignInDto = void 0;
const tslib_1 = __webpack_require__(5);
const swagger_1 = __webpack_require__(3);
const class_validator_1 = __webpack_require__(16);
class SignInDto {
}
exports.SignInDto = SignInDto;
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'The email of the account.',
        example: 'tangkinhcode@example.com',
    }),
    tslib_1.__metadata("design:type", String)
], SignInDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'Password must be not empty',
        example: 'vodich123',
    }),
    tslib_1.__metadata("design:type", String)
], SignInDto.prototype, "password", void 0);


/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResendVerifyEmail = void 0;
const tslib_1 = __webpack_require__(5);
const swagger_1 = __webpack_require__(3);
const class_validator_1 = __webpack_require__(16);
class ResendVerifyEmail {
}
exports.ResendVerifyEmail = ResendVerifyEmail;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({
        description: 'Email use for resend otp to verify email',
        example: 'tangkinhcode@example.com',
    }),
    tslib_1.__metadata("design:type", String)
], ResendVerifyEmail.prototype, "email", void 0);


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteAccountDto = void 0;
const tslib_1 = __webpack_require__(5);
const swagger_1 = __webpack_require__(3);
const class_validator_1 = __webpack_require__(16);
class DeleteAccountDto {
}
exports.DeleteAccountDto = DeleteAccountDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'User id need to delete',
        example: '8685-bdhh34-555123-6662312',
    }),
    tslib_1.__metadata("design:type", String)
], DeleteAccountDto.prototype, "id", void 0);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeactivateDto = void 0;
const tslib_1 = __webpack_require__(5);
const swagger_1 = __webpack_require__(3);
const class_validator_1 = __webpack_require__(16);
class DeactivateDto {
}
exports.DeactivateDto = DeactivateDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'User id need to deactivate',
        example: '8685-bdhh34-555123-6662312',
    }),
    tslib_1.__metadata("design:type", String)
], DeactivateDto.prototype, "id", void 0);


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VerifyEmailOtp = void 0;
const tslib_1 = __webpack_require__(5);
const swagger_1 = __webpack_require__(3);
const class_validator_1 = __webpack_require__(16);
class VerifyEmailOtp {
}
exports.VerifyEmailOtp = VerifyEmailOtp;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'Token use for verify email',
        example: '123456',
    }),
    tslib_1.__metadata("design:type", String)
], VerifyEmailOtp.prototype, "token", void 0);


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthenticateDto = void 0;
const tslib_1 = __webpack_require__(5);
const swagger_1 = __webpack_require__(3);
const class_validator_1 = __webpack_require__(16);
class AuthenticateDto {
}
exports.AuthenticateDto = AuthenticateDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'Token use for authenticate user',
        example: '8685-bdhh34-555123-6662312',
    }),
    tslib_1.__metadata("design:type", String)
], AuthenticateDto.prototype, "token", void 0);


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RefreshTokenDto = void 0;
const tslib_1 = __webpack_require__(5);
const swagger_1 = __webpack_require__(3);
const class_validator_1 = __webpack_require__(16);
class RefreshTokenDto {
}
exports.RefreshTokenDto = RefreshTokenDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'Token use for authenticate user',
        example: '8685-bdhh34-555123-6662312',
    }),
    tslib_1.__metadata("design:type", String)
], RefreshTokenDto.prototype, "refreshToken", void 0);


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignInOauth = void 0;
const tslib_1 = __webpack_require__(5);
const swagger_1 = __webpack_require__(3);
const class_validator_1 = __webpack_require__(16);
class SignInOauth {
}
exports.SignInOauth = SignInOauth;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        example: 'token3912491923123',
        description: 'The token of the provider after authenticate.',
    }),
    tslib_1.__metadata("design:type", String)
], SignInOauth.prototype, "token", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        example: 'GITHUB',
        description: 'The credential type that user using for sign in, GOOGLE or GITHUB',
    }),
    tslib_1.__metadata("design:type", String)
], SignInOauth.prototype, "credentialType", void 0);


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAccountDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(16);
const password_1 = __webpack_require__(25);
const password_match_1 = __webpack_require__(26);
const swagger_1 = __webpack_require__(3);
class CreateAccountDto {
}
exports.CreateAccountDto = CreateAccountDto;
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'The email of the account.',
        example: 'tangkinhcode@example.com',
    }),
    tslib_1.__metadata("design:type", String)
], CreateAccountDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, password_1.IsStrongPassword)(),
    (0, swagger_1.ApiProperty)({
        description: 'Password must be at least 8 characters long and contain at least one number.',
        example: 'vodich123',
    }),
    tslib_1.__metadata("design:type", String)
], CreateAccountDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, password_1.IsStrongPassword)(),
    (0, swagger_1.ApiProperty)({
        description: 'Confirm password must match the password.',
        example: 'vodich123',
    }),
    (0, password_match_1.IsPasswordMatch)('password', {
        message: 'Password and confirm password must match.',
    }),
    tslib_1.__metadata("design:type", String)
], CreateAccountDto.prototype, "confirmPassword", void 0);


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IsStrongPasswordConstraint = void 0;
exports.IsStrongPassword = IsStrongPassword;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(16);
// Define the custom validator logic
let IsStrongPasswordConstraint = class IsStrongPasswordConstraint {
    validate(password) {
        const regex = /^(?=.*\d).{8,}$/; // At least 8 characters and contains at least one digit
        return regex.test(password);
    }
    defaultMessage() {
        return 'Password must be at least 8 characters long and contain at least one number.';
    }
};
exports.IsStrongPasswordConstraint = IsStrongPasswordConstraint;
exports.IsStrongPasswordConstraint = IsStrongPasswordConstraint = tslib_1.__decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], IsStrongPasswordConstraint);
// Create the decorator
function IsStrongPassword(validationOptions) {
    // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsStrongPasswordConstraint,
        });
    };
}


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IsPasswordMatchConstraint = void 0;
exports.IsPasswordMatch = IsPasswordMatch;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(16);
let IsPasswordMatchConstraint = class IsPasswordMatchConstraint {
    validate(confirmPassword, args) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = args.object[relatedPropertyName];
        return confirmPassword === relatedValue;
    }
    defaultMessage(args) {
        return `Password and confirm password do not match.`;
    }
};
exports.IsPasswordMatchConstraint = IsPasswordMatchConstraint;
exports.IsPasswordMatchConstraint = IsPasswordMatchConstraint = tslib_1.__decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], IsPasswordMatchConstraint);
function IsPasswordMatch(property, validationOptions) {
    // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [property],
            validator: IsPasswordMatchConstraint,
        });
    };
}


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateProfileDto = void 0;
const tslib_1 = __webpack_require__(5);
const swagger_1 = __webpack_require__(3);
const class_validator_1 = __webpack_require__(16);
class CreateProfileDto {
}
exports.CreateProfileDto = CreateProfileDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'User name',
        example: 'Khoi Tran',
    }),
    tslib_1.__metadata("design:type", String)
], CreateProfileDto.prototype, "fullName", void 0);


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChangePasswordDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(16);
const password_1 = __webpack_require__(25);
const swagger_1 = __webpack_require__(3);
class ChangePasswordDto {
}
exports.ChangePasswordDto = ChangePasswordDto;
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], ChangePasswordDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, password_1.IsStrongPassword)(),
    (0, swagger_1.ApiProperty)({
        description: 'New password must be at least 8 characters long and contain at least one number.',
        example: 'chicken123',
    }),
    tslib_1.__metadata("design:type", String)
], ChangePasswordDto.prototype, "newPassword", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'Your current password',
        example: 'vodich123',
    }),
    tslib_1.__metadata("design:type", String)
], ChangePasswordDto.prototype, "currentPassword", void 0);


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountPagingDto = void 0;
const tslib_1 = __webpack_require__(5);
const paging_dto_1 = __webpack_require__(30);
const swagger_1 = __webpack_require__(3);
const class_validator_1 = __webpack_require__(16);
const guard_1 = __webpack_require__(39);
class AccountPagingDto extends paging_dto_1.PagingDto {
}
exports.AccountPagingDto = AccountPagingDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by user role',
        required: false,
        enum: guard_1.Role,
        example: guard_1.Role.USER,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(guard_1.Role),
    tslib_1.__metadata("design:type", typeof (_a = typeof guard_1.Role !== "undefined" && guard_1.Role) === "function" ? _a : Object)
], AccountPagingDto.prototype, "role", void 0);


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PagingDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_transformer_1 = __webpack_require__(31);
const class_validator_1 = __webpack_require__(16);
const swagger_1 = __webpack_require__(3);
const query_builder_1 = __webpack_require__(32);
class PagingDto {
    constructor() {
        this.offset = 1;
        this.limit = 10;
        this.sortBy = 'createdAt';
        this.sortOrder = query_builder_1.SortOrder.DESC;
    }
}
exports.PagingDto = PagingDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Offset number for pagination',
        required: false,
        minimum: 1,
        default: 1,
        example: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    tslib_1.__metadata("design:type", Number)
], PagingDto.prototype, "offset", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Limit number for pagination',
        required: false,
        minimum: 1,
        default: 10,
        example: 10,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    tslib_1.__metadata("design:type", Number)
], PagingDto.prototype, "limit", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Search term to filter results across searchable fields',
        required: false,
        example: 'john',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], PagingDto.prototype, "search", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Field name to sort results by',
        required: false,
        default: 'createdAt',
        example: 'createdAt',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], PagingDto.prototype, "sortBy", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sort direction',
        required: false,
        enum: query_builder_1.SortOrder,
        default: query_builder_1.SortOrder.DESC,
        example: query_builder_1.SortOrder.DESC,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(query_builder_1.SortOrder),
    tslib_1.__metadata("design:type", typeof (_a = typeof query_builder_1.SortOrder !== "undefined" && query_builder_1.SortOrder) === "function" ? _a : Object)
], PagingDto.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Advanced filter object',
        required: false,
        example: {
            field1: { value: 'value1', operator: 'equal' },
            field2: { value: [1, 100], operator: 'between' },
        },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Record !== "undefined" && Record) === "function" ? _b : Object)
], PagingDto.prototype, "filter", void 0);


/***/ }),
/* 31 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(33), exports);
tslib_1.__exportStar(__webpack_require__(34), exports);
tslib_1.__exportStar(__webpack_require__(37), exports);
tslib_1.__exportStar(__webpack_require__(35), exports);
tslib_1.__exportStar(__webpack_require__(38), exports);


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SortOrder = exports.ValueType = exports.FilterType = void 0;
var FilterType;
(function (FilterType) {
    FilterType["EQUAL"] = "equal";
    FilterType["NOT_EQUAL"] = "notEqual";
    FilterType["LESS_THAN"] = "lessThan";
    FilterType["LESS_THAN_OR_EQUAL"] = "lessThanOrEqual";
    FilterType["GREATER_THAN"] = "greaterThan";
    FilterType["GREATER_THAN_OR_EQUAL"] = "greaterThanOrEqual";
    FilterType["BETWEEN"] = "between";
    FilterType["NOT_BETWEEN"] = "notBetween";
    FilterType["IN"] = "in";
    FilterType["NOT_IN"] = "notIn";
    FilterType["LIKE"] = "like";
    FilterType["NOT_LIKE"] = "notLike";
    FilterType["I_LIKE"] = "iLike";
    FilterType["NOT_I_LIKE"] = "notILike";
    FilterType["DATE_RANGE"] = "dateRange";
    FilterType["IS_NULL"] = "isNull";
    FilterType["IS_NOT_NULL"] = "isNotNull";
})(FilterType || (exports.FilterType = FilterType = {}));
var ValueType;
(function (ValueType) {
    ValueType["TEXT"] = "text";
    ValueType["NUMERIC"] = "numeric";
    ValueType["DATE"] = "date";
    ValueType["BOOLEAN"] = "boolean";
    ValueType["ARRAY"] = "array";
})(ValueType || (exports.ValueType = ValueType = {}));
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "ASC";
    SortOrder["DESC"] = "DESC";
})(SortOrder || (exports.SortOrder = SortOrder = {}));


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueryBuilderModule = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const query_builder_service_1 = __webpack_require__(35);
const query_builder_constant_1 = __webpack_require__(37);
let QueryBuilderModule = class QueryBuilderModule {
};
exports.QueryBuilderModule = QueryBuilderModule;
exports.QueryBuilderModule = QueryBuilderModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [
            query_builder_service_1.QueryBuilderService,
            {
                provide: query_builder_constant_1.QUERY_BUILDER_TOKEN,
                useClass: query_builder_service_1.QueryBuilderService,
            },
        ],
        exports: [query_builder_constant_1.QUERY_BUILDER_TOKEN],
    })
], QueryBuilderModule);


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var QueryBuilderService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueryBuilderService = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const sequelize_1 = __webpack_require__(36);
const query_builder_type_1 = __webpack_require__(33);
const query_builder_constant_1 = __webpack_require__(37);
let QueryBuilderService = QueryBuilderService_1 = class QueryBuilderService {
    constructor() {
        this.logger = new common_1.Logger(QueryBuilderService_1.name);
    }
    build(payload) {
        if (!payload.filters) {
            return query_builder_constant_1.DEFAULT_QUERY_BUILDER_RESULT;
        }
        try {
            const whereClause = {};
            Object.entries(payload.filters).forEach(([field, filter]) => {
                whereClause[field] = this.buildFilterCondition(filter);
            });
            const limitClause = payload.limit || query_builder_constant_1.DEFAULT_QUERY_BUILDER_RESULT.limit;
            const offsetClause = payload.offset || query_builder_constant_1.DEFAULT_QUERY_BUILDER_RESULT.offset;
            const orderClause = payload.sortBy && payload.sortOrder
                ? [[payload.sortBy, payload.sortOrder]]
                : [[]];
            const groupClause = payload.group || [];
            return {
                where: whereClause,
                order: orderClause,
                limit: limitClause,
                offset: offsetClause,
                group: groupClause,
            };
        }
        catch (error) {
            this.logger.error('Error building query:', error);
            return query_builder_constant_1.DEFAULT_QUERY_BUILDER_RESULT;
        }
    }
    buildFilterCondition(filter) {
        const { value, valueType, filterType } = filter;
        try {
            switch (filterType) {
                case query_builder_type_1.FilterType.EQUAL:
                    return { [sequelize_1.Op.eq]: this.parseValue(value, valueType) };
                case query_builder_type_1.FilterType.NOT_EQUAL:
                    return { [sequelize_1.Op.ne]: this.parseValue(value, valueType) };
                case query_builder_type_1.FilterType.LESS_THAN:
                    return { [sequelize_1.Op.lt]: this.parseValue(value, valueType) };
                case query_builder_type_1.FilterType.LESS_THAN_OR_EQUAL:
                    return { [sequelize_1.Op.lte]: this.parseValue(value, valueType) };
                case query_builder_type_1.FilterType.GREATER_THAN:
                    return { [sequelize_1.Op.gt]: this.parseValue(value, valueType) };
                case query_builder_type_1.FilterType.GREATER_THAN_OR_EQUAL:
                    return { [sequelize_1.Op.gte]: this.parseValue(value, valueType) };
                case query_builder_type_1.FilterType.BETWEEN:
                    return this.buildBetweenCondition(value, valueType);
                case query_builder_type_1.FilterType.NOT_BETWEEN:
                    return { [sequelize_1.Op.notBetween]: this.parseArrayValue(value, valueType) };
                case query_builder_type_1.FilterType.IN:
                    return { [sequelize_1.Op.in]: this.parseArrayValue(value, valueType) };
                case query_builder_type_1.FilterType.NOT_IN:
                    return { [sequelize_1.Op.notIn]: this.parseArrayValue(value, valueType) };
                case query_builder_type_1.FilterType.LIKE:
                    return { [sequelize_1.Op.like]: `%${value}%` };
                case query_builder_type_1.FilterType.NOT_LIKE:
                    return { [sequelize_1.Op.notLike]: `%${value}%` };
                case query_builder_type_1.FilterType.I_LIKE:
                    return { [sequelize_1.Op.iLike]: `%${value}%` };
                case query_builder_type_1.FilterType.NOT_I_LIKE:
                    return { [sequelize_1.Op.notILike]: `%${value}%` };
                case query_builder_type_1.FilterType.DATE_RANGE:
                    return this.buildDateRangeCondition(value);
                case query_builder_type_1.FilterType.IS_NULL:
                    return { [sequelize_1.Op.is]: null };
                case query_builder_type_1.FilterType.IS_NOT_NULL:
                    return { [sequelize_1.Op.not]: null };
                default:
                    return {};
            }
        }
        catch (error) {
            this.logger.error(`Error building filter condition for type ${filterType}:`, error);
            return {};
        }
    }
    parseValue(value, valueType) {
        try {
            switch (valueType) {
                case query_builder_type_1.ValueType.NUMERIC:
                    return Number(value);
                case query_builder_type_1.ValueType.DATE:
                    return new Date(value);
                case query_builder_type_1.ValueType.BOOLEAN:
                    return Boolean(value);
                case query_builder_type_1.ValueType.ARRAY:
                    return Array.isArray(value) ? value : [value];
                case query_builder_type_1.ValueType.TEXT:
                default:
                    return String(value);
            }
        }
        catch (error) {
            this.logger.error(`Error parsing value of type ${valueType}:`, error);
            return value;
        }
    }
    parseArrayValue(value, valueType) {
        if (!Array.isArray(value)) {
            return [this.parseValue(value, valueType)];
        }
        return value.map((v) => this.parseValue(v, valueType));
    }
    buildDateRangeCondition(value) {
        if (Array.isArray(value) && value.length === 2) {
            return {
                [sequelize_1.Op.between]: [new Date(value[0]), new Date(value[1])],
            };
        }
        return {};
    }
    buildBetweenCondition(value, valueType) {
        if (Array.isArray(value) && value.length === 2) {
            const parsedValues = this.parseArrayValue(value, valueType);
            return { [sequelize_1.Op.between]: parsedValues };
        }
        return {};
    }
};
exports.QueryBuilderService = QueryBuilderService;
exports.QueryBuilderService = QueryBuilderService = QueryBuilderService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)()
], QueryBuilderService);


/***/ }),
/* 36 */
/***/ ((module) => {

module.exports = require("sequelize");

/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DEFAULT_QUERY_BUILDER_RESULT_WITH_ORDER = exports.DEFAULT_QUERY_BUILDER_RESULT_WITH_GROUP = exports.DEFAULT_QUERY_BUILDER_RESULT = exports.QUERY_BUILDER_TOKEN = void 0;
exports.QUERY_BUILDER_TOKEN = 'QUERY_BUILDER_TOKEN';
exports.DEFAULT_QUERY_BUILDER_RESULT = {
    where: {},
    limit: 10,
    offset: 0,
    group: [],
    order: [],
};
exports.DEFAULT_QUERY_BUILDER_RESULT_WITH_GROUP = {
    ...exports.DEFAULT_QUERY_BUILDER_RESULT,
    group: ['id'],
};
exports.DEFAULT_QUERY_BUILDER_RESULT_WITH_ORDER = {
    ...exports.DEFAULT_QUERY_BUILDER_RESULT,
    order: [['id', 'ASC']],
};


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InjectQueryBuilder = void 0;
const common_1 = __webpack_require__(1);
const query_builder_constant_1 = __webpack_require__(37);
const InjectQueryBuilder = () => (0, common_1.Inject)(query_builder_constant_1.QUERY_BUILDER_TOKEN);
exports.InjectQueryBuilder = InjectQueryBuilder;


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(40), exports);
tslib_1.__exportStar(__webpack_require__(43), exports);
tslib_1.__exportStar(__webpack_require__(44), exports);
tslib_1.__exportStar(__webpack_require__(46), exports);
tslib_1.__exportStar(__webpack_require__(47), exports);
tslib_1.__exportStar(__webpack_require__(49), exports);
tslib_1.__exportStar(__webpack_require__(48), exports);
tslib_1.__exportStar(__webpack_require__(50), exports);


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AuthGuard_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthGuard = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const config_1 = __webpack_require__(41);
const core_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(42);
let AuthGuard = AuthGuard_1 = class AuthGuard {
    constructor(reflector, jwtService, configService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.configService = configService;
        this.logger = new common_1.Logger(AuthGuard_1.name);
        this.jwtConfig = this.configService.get('jwt');
    }
    canActivate(context) {
        const isPublic = this.reflector.get('isPublic', context.getHandler());
        if (isPublic) {
            this.logger.log('Public route accessed.');
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        if (!authHeader) {
            this.logger.warn('No Authorization header provided.');
            throw new common_1.UnauthorizedException('Authorization header missing');
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            this.logger.warn('No token found in Authorization header.');
            throw new common_1.UnauthorizedException('Token missing');
        }
        try {
            const decoded = this.jwtService.verify(token, {
                secret: this.jwtConfig?.secret,
            });
            request.user = decoded; // Attach user info to the request
            this.logger.log('Token verified successfully');
            return true;
        }
        catch (error) {
            this.logger.error('Token verification failed:', error.message);
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = AuthGuard_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], AuthGuard);


/***/ }),
/* 41 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 42 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = __webpack_require__(1);
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomThrottleGuard = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const throttler_1 = __webpack_require__(45);
let CustomThrottleGuard = class CustomThrottleGuard extends throttler_1.ThrottlerGuard {
    getErrorMessage(context) {
        const message = 'Quá nhiều yêu cầu, vui lòng thử lại sau.';
        return Promise.resolve(message);
    }
};
exports.CustomThrottleGuard = CustomThrottleGuard;
exports.CustomThrottleGuard = CustomThrottleGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], CustomThrottleGuard);


/***/ }),
/* 45 */
/***/ ((module) => {

module.exports = require("@nestjs/throttler");

/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["USER"] = "USER";
    Role["GUILD_OWNER"] = "GUILD_OWNER";
    Role["GUILD_MEMBER"] = "GUILD_MEMBER";
})(Role || (exports.Role = Role = {}));


/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleGuard = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const role_decorator_1 = __webpack_require__(48);
const access_control_service_1 = __webpack_require__(49);
let RoleGuard = class RoleGuard {
    constructor(reflector, accessControlService) {
        this.reflector = reflector;
        this.accessControlService = accessControlService;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(role_decorator_1.ROLE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const request = context.switchToHttp().getRequest();
        const { user } = request;
        const guildId = request.params?.guildId || request.body?.guildId;
        for (const role of requiredRoles) {
            const result = this.accessControlService.isAuthorized({
                requiredRole: role,
                currentRole: user?.role,
                guildId,
                userGuildRoles: user?.guildRoles,
            });
            if (result) {
                return true;
            }
        }
        return false;
    }
};
exports.RoleGuard = RoleGuard;
exports.RoleGuard = RoleGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object, typeof (_b = typeof access_control_service_1.AccessControlService !== "undefined" && access_control_service_1.AccessControlService) === "function" ? _b : Object])
], RoleGuard);


/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLE_KEY = void 0;
const common_1 = __webpack_require__(1);
exports.ROLE_KEY = 'role';
const Roles = (...role) => (0, common_1.SetMetadata)(exports.ROLE_KEY, role);
exports.Roles = Roles;


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccessControlService = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const role_enum_1 = __webpack_require__(46);
let AccessControlService = class AccessControlService {
    constructor() {
        this.hierarchies = [];
        this.priority = 1;
        // Define user-related role hierarchy
        this.buildRoles([
            role_enum_1.Role.USER, // Base user
            role_enum_1.Role.GUILD_MEMBER, // Member of a guild
            role_enum_1.Role.GUILD_OWNER, // Owner of a guild
        ]);
        // Define admin role hierarchy (separate track)
        this.buildRoles([role_enum_1.Role.ADMIN]); // Administrative role
    }
    /**
     * Builds a role hierarchy with increasing privileges
     * @param roles Array of roles from least to most privileged
     */
    buildRoles(roles) {
        const hierarchy = new Map();
        roles.forEach((role) => {
            hierarchy.set(role, this.priority);
            this.priority++;
        });
        this.hierarchies.push(hierarchy);
    }
    /**
     * Checks if the user has sufficient privileges
     * @param params Object containing roles and guild context
     * @returns boolean indicating if access is authorized
     */
    isAuthorized({ currentRole, requiredRole, guildId, userGuildRoles, }) {
        // If it's a guild-specific check
        if (guildId && userGuildRoles) {
            const userGuildRole = userGuildRoles[guildId];
            // If user has a specific role in this guild, use that
            if (userGuildRole) {
                return this.checkRoleHierarchy(userGuildRole, requiredRole);
            }
        }
        // Fallback to global role check
        return this.checkRoleHierarchy(currentRole, requiredRole);
    }
    /**
     * Checks if the role has sufficient privileges in the hierarchy
     */
    checkRoleHierarchy(currentRole, requiredRole) {
        // Admin always has access
        if (currentRole === role_enum_1.Role.ADMIN)
            return true;
        for (const hierarchy of this.hierarchies) {
            const currentPriority = hierarchy.get(currentRole);
            const requiredPriority = hierarchy.get(requiredRole);
            if (currentPriority && requiredPriority && currentPriority >= requiredPriority) {
                return true;
            }
        }
        return false;
    }
};
exports.AccessControlService = AccessControlService;
exports.AccessControlService = AccessControlService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], AccessControlService);


/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OwnerGuard = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const account_1 = __webpack_require__(51);
let OwnerGuard = class OwnerGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const userId = request.user?.profile?.id; // Assuming user ID is stored in request.user
        const profileId = request?.body?.id || request?.param?.id; // Assuming profileId is sent in the request body
        if (!profileId == userId) {
            throw new common_1.ForbiddenException(account_1.AccountAlert.DontHavePermissionToModifyProfile);
        }
        return true;
    }
};
exports.OwnerGuard = OwnerGuard;
exports.OwnerGuard = OwnerGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], OwnerGuard);


/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountAlert = void 0;
exports.AccountAlert = Object.freeze({
    // Account Creation & Verification
    AccountCreated: 'Tạo tài khoản thành công',
    AccountVerified: 'Xác thực tài khoản thành công',
    AccountUpdated: 'Cập nhật tài khoản thành công',
    AccountDeleted: 'Xóa tài khoản thành công',
    // Account Status
    AccountNotFound: 'Tài khoản không tồn tại, vui lòng thử lại với email khác',
    AccountAlreadyExists: 'Tài khoản đã tồn tại, vui lòng thử lại với email khác',
    AccountNotVerified: 'Tài khoản đã tồn tại nhưng chưa xác thực, xin vui lòng xác thực để đăng nhập',
    AccountAlreadyVerified: 'Tài khoản này đã được xác thực, vui lòng thử lại với email khác',
    // Verification Process
    VerificationEmailSent: 'Đường dẫn xác thực tài khoản đã được gửi đến email: {email}. Vui lòng kiểm tra hộp thư để hoàn tất quá trình xác thực tài khoản',
    VerificationTokenExpired: 'Token xác thực tài khoản đã hết hạn, xin vui lòng thử lại',
    VerificationError: 'Có lỗi xảy ra trong quá trình xác thực, xin vui lòng thử lại',
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
    DontHavePermissionToModifyProfile: 'Bạn không có quyền để thực hiện hành động này',
    SocialProfileCreateSuccess: 'Thêm liên kết mạng xã hội thành công',
    SocialProfileUpdateSuccess: 'Cập nhật liên kết mạng xã hội thành công',
    SocialProfileDeleteSuccess: 'Xoá liên kết mạng xã hội thành công',
    SocialProfileFailExisting: 'Thêm liên kết mạng xã hội thất bại, đã tồn tại',
    ProfilePerformError: 'Có lỗi xãy ra khi thực hiện hành động này',
});


/***/ }),
/* 52 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateExpProfileDto = exports.DeleteSocialProfileDto = exports.UpdateSocialProfileDto = exports.CreateSocialProfileDto = void 0;
const tslib_1 = __webpack_require__(5);
const swagger_1 = __webpack_require__(3);
const class_validator_1 = __webpack_require__(16);
const types_1 = __webpack_require__(53);
class CreateSocialProfileDto {
}
exports.CreateSocialProfileDto = CreateSocialProfileDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateSocialProfileDto.prototype, "profileId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateSocialProfileDto.prototype, "socialId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateSocialProfileDto.prototype, "link", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], CreateSocialProfileDto.prototype, "status", void 0);
class UpdateSocialProfileDto {
}
exports.UpdateSocialProfileDto = UpdateSocialProfileDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateSocialProfileDto.prototype, "id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateSocialProfileDto.prototype, "link", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateSocialProfileDto.prototype, "status", void 0);
class DeleteSocialProfileDto {
}
exports.DeleteSocialProfileDto = DeleteSocialProfileDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], DeleteSocialProfileDto.prototype, "id", void 0);
class UpdateExpProfileDto {
}
exports.UpdateExpProfileDto = UpdateExpProfileDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateExpProfileDto.prototype, "id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof types_1.ActionExpType !== "undefined" && types_1.ActionExpType) === "function" ? _a : Object)
], UpdateExpProfileDto.prototype, "actionType", void 0);


/***/ }),
/* 53 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(54), exports);
tslib_1.__exportStar(__webpack_require__(55), exports);


/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequireRealExpEnum = exports.ActionExpType = exports.AccountVerifyStatusEnum = exports.CredentialTypeEnum = void 0;
var CredentialTypeEnum;
(function (CredentialTypeEnum) {
    CredentialTypeEnum["NONE"] = "NONE";
    CredentialTypeEnum["GITHUB"] = "GITHUB";
    CredentialTypeEnum["GOOLGE"] = "GOOGLE";
})(CredentialTypeEnum || (exports.CredentialTypeEnum = CredentialTypeEnum = {}));
var AccountVerifyStatusEnum;
(function (AccountVerifyStatusEnum) {
    AccountVerifyStatusEnum["UNVERIFY"] = "UNVERIFY";
})(AccountVerifyStatusEnum || (exports.AccountVerifyStatusEnum = AccountVerifyStatusEnum = {}));
var ActionExpType;
(function (ActionExpType) {
    ActionExpType[ActionExpType["CHECK_IN"] = 0] = "CHECK_IN";
    ActionExpType[ActionExpType["READ_POST"] = 1] = "READ_POST";
    ActionExpType[ActionExpType["COMMENT_POST"] = 2] = "COMMENT_POST";
    ActionExpType[ActionExpType["LIKE_POST"] = 3] = "LIKE_POST";
    ActionExpType[ActionExpType["DISLIKE_POST"] = 4] = "DISLIKE_POST";
    ActionExpType[ActionExpType["CREATE_GUILD"] = 5] = "CREATE_GUILD";
})(ActionExpType || (exports.ActionExpType = ActionExpType = {}));
var RequireRealExpEnum;
(function (RequireRealExpEnum) {
    // DƯỚI THẦN CẢNH
    RequireRealExpEnum[RequireRealExpEnum["PHAM_NHAN"] = 0] = "PHAM_NHAN";
    RequireRealExpEnum[RequireRealExpEnum["VO_SI"] = 100] = "VO_SI";
    RequireRealExpEnum[RequireRealExpEnum["VO_SU"] = 500] = "VO_SU";
    RequireRealExpEnum[RequireRealExpEnum["DAI_VO_SU"] = 1000] = "DAI_VO_SU";
    RequireRealExpEnum[RequireRealExpEnum["VO_QUAN"] = 2000] = "VO_QUAN";
    RequireRealExpEnum[RequireRealExpEnum["VO_VUONG"] = 5000] = "VO_VUONG";
    RequireRealExpEnum[RequireRealExpEnum["VO_HOANG"] = 10000] = "VO_HOANG";
    RequireRealExpEnum[RequireRealExpEnum["VO_TONG"] = 20000] = "VO_TONG";
    RequireRealExpEnum[RequireRealExpEnum["VO_TON"] = 30000] = "VO_TON";
    RequireRealExpEnum[RequireRealExpEnum["VO_DE"] = 50000] = "VO_DE";
    //THẬP PHƯƠNG THẦN CẢNH
    RequireRealExpEnum[RequireRealExpEnum["QUY_CHAN_CANH"] = 60000] = "QUY_CHAN_CANH";
    RequireRealExpEnum[RequireRealExpEnum["CHUONG_THIEN_CANH"] = 800000] = "CHUONG_THIEN_CANH";
    RequireRealExpEnum[RequireRealExpEnum["HU_CUC_CANH"] = 100000] = "HU_CUC_CANH";
    RequireRealExpEnum[RequireRealExpEnum["TAO_HOA_CANH"] = 125000] = "TAO_HOA_CANH";
    RequireRealExpEnum[RequireRealExpEnum["GIOI_VUONG_CANH"] = 150000] = "GIOI_VUONG_CANH";
    RequireRealExpEnum[RequireRealExpEnum["THIEN_GIOI_CHI_CHU"] = 200000] = "THIEN_GIOI_CHI_CHU";
    RequireRealExpEnum[RequireRealExpEnum["VAN_CO_CHI_TON"] = 500000] = "VAN_CO_CHI_TON";
})(RequireRealExpEnum || (exports.RequireRealExpEnum = RequireRealExpEnum = {}));


/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileActivityDto = void 0;
class ProfileActivityDto {
}
exports.ProfileActivityDto = ProfileActivityDto;


/***/ }),
/* 57 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileModule = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const profile_controller_1 = __webpack_require__(58);
let ProfileModule = class ProfileModule {
};
exports.ProfileModule = ProfileModule;
exports.ProfileModule = ProfileModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [profile_controller_1.ProfileController],
    })
], ProfileModule);


/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileController = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const microservices_1 = __webpack_require__(8);
const swagger_1 = __webpack_require__(3);
const guard_1 = __webpack_require__(39);
const account_1 = __webpack_require__(9);
const account_2 = __webpack_require__(14);
class UpdateStreakDto {
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], UpdateStreakDto.prototype, "id", void 0);
class UpdateExpDto {
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], UpdateExpDto.prototype, "id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], UpdateExpDto.prototype, "exp", void 0);
let ProfileController = class ProfileController {
    constructor(natsClient) {
        this.natsClient = natsClient;
    }
    updateStreak(dto) {
        return {
            message: 'update successfully',
            data: dto,
        };
    }
    updateExp(dto) {
        return {
            message: 'update exp successfully',
            data: dto,
        };
    }
    delete(id) {
        return this.natsClient.send(account_1.ProfileMsgPattern.Delete, { id });
    }
    getSocialProfile(id) {
        return this.natsClient.send(account_1.ProfileMsgPattern.GetSocialProfile, id);
    }
    addSocialProfile(body) {
        return this.natsClient.send(account_1.ProfileMsgPattern.DeleteSocialProfile, body);
    }
    updateSocialProfile(id, body) {
        return this.natsClient.send(account_1.ProfileMsgPattern.UpdateSocialProfile, {
            id,
            body,
        });
    }
    deleteSocialProfile(id) {
        return this.natsClient.send(account_1.ProfileMsgPattern.DeleteSocialProfile, {
            id,
        });
    }
};
exports.ProfileController = ProfileController;
tslib_1.__decorate([
    (0, common_1.Patch)('updateStreak'),
    (0, swagger_1.ApiOperation)({ summary: 'Update Streak' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
    }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UpdateStreakDto]),
    tslib_1.__metadata("design:returntype", void 0)
], ProfileController.prototype, "updateStreak", null);
tslib_1.__decorate([
    (0, common_1.Patch)('updateExp'),
    (0, swagger_1.ApiOperation)({ summary: 'Update Exp' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
    }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UpdateExpDto]),
    tslib_1.__metadata("design:returntype", void 0)
], ProfileController.prototype, "updateExp", null);
tslib_1.__decorate([
    (0, common_1.Delete)('delete/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Pernament delete account.' }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ProfileController.prototype, "delete", null);
tslib_1.__decorate([
    (0, common_1.Get)('social/findAll'),
    (0, swagger_1.ApiOperation)({ summary: 'Add Social Profile' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Social profile added successfully.',
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ProfileController.prototype, "getSocialProfile", null);
tslib_1.__decorate([
    (0, common_1.Post)('social/create'),
    (0, swagger_1.ApiOperation)({ summary: 'Add Social Profile' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Social profile added successfully.',
    }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof account_2.CreateSocialProfileDto !== "undefined" && account_2.CreateSocialProfileDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ProfileController.prototype, "addSocialProfile", null);
tslib_1.__decorate([
    (0, common_1.Patch)('social/update/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update Social Profile' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Social profile updated successfully.',
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_c = typeof account_2.UpdateSocialProfileDto !== "undefined" && account_2.UpdateSocialProfileDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ProfileController.prototype, "updateSocialProfile", null);
tslib_1.__decorate([
    (0, common_1.Delete)('social/delete/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete Social Profile' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Social profile deleted successfully.',
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ProfileController.prototype, "deleteSocialProfile", null);
exports.ProfileController = ProfileController = tslib_1.__decorate([
    (0, common_1.UseGuards)(guard_1.OwnerGuard),
    (0, common_1.Controller)('profile'),
    (0, swagger_1.ApiTags)('Profile'),
    tslib_1.__param(0, (0, common_1.Inject)('NATS_SERVICE')),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], ProfileController);


/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(60), exports);


/***/ }),
/* 60 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NatsClientModule = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const microservices_1 = __webpack_require__(8);
let NatsClientModule = class NatsClientModule {
};
exports.NatsClientModule = NatsClientModule;
exports.NatsClientModule = NatsClientModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'NATS_SERVICE',
                    transport: microservices_1.Transport.NATS,
                    options: {
                        servers: [process.env['NATS_URL']],
                    },
                },
            ]),
        ],
        exports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'NATS_SERVICE',
                    transport: microservices_1.Transport.NATS,
                    options: {
                        servers: [process.env['NATS_URL']],
                    },
                },
            ]),
        ],
    })
], NatsClientModule);


/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(62), exports);
tslib_1.__exportStar(__webpack_require__(63), exports);


/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 63 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Configurations = void 0;
const Configurations = () => ({
    port: parseInt(process.env['POSTGRES_PORT']) || 3000,
    nodeEnv: process.env['NODE_ENV'],
    saltRounds: parseInt(process.env['SALT_ROUNDS']) || 10,
    verifyRedirect: process.env['VERIFY_EMAIL_REDIRECT'],
    github: {
        client_id: process.env['GITHUB_CLIENT_ID'],
        client_secret: process.env['GITHUB_CLIENT_SECRET'],
        url: process.env['GITHUB_AUTHORIZE_URL'],
        userInfoUrl: process.env['GITHUB_USER_INFO_URL'],
    },
    google: {
        clientId: process.env['GOOGLE_CLIENT_ID'],
    },
    mailer: {
        host: process.env['MAIL_HOST'],
        port: parseInt(process.env['MAIL_PORT']) || 10,
        pass: process.env['MAIL_PASS'],
        user: process.env['MAIL_USER'],
        from: process.env['MAIL_FROM'],
    },
    database: {
        host: process.env['POSTGRES_HOST'],
        port: parseInt(process.env['POSTGRES_PORT']) || 5432,
        username: process.env['POSTGRES_USERNAME'],
        password: process.env['POSTGRES_PASSWORD'],
        database: process.env['POSTGRES_DB'],
        dialect: 'postgres',
        maxPool: parseInt(process.env['POSTGRES_MAX_POOL']) || 10,
        minPool: parseInt(process.env['POSTGRES_MIN_POOL']) || 1,
        idleTimeout: parseInt(process.env['POSTGRES_IDLE_TIMEOUT']) || 60000,
        acquireTimeout: parseInt(process.env['POSTGRES_ACQUIRE_TIMEOUT']) || 30000,
    },
    microservice: {
        natsUrl: process.env['NATS_URL'],
        natsPort: parseInt(process.env['NATS_PORT']) || 4222,
        natsInterPort: parseInt(process.env['NATS_INTER_PORT']) || 8222,
    },
    jwt: {
        secret: process.env['JWT_SECRET_KEY'],
        privateKey: process.env['JWT_PRIVATE_KEY'],
        algorithm: process.env['JWT_ALGORITHM'],
        accessExpiry: process.env['JWT_ACCESS_TOKEN_EXPIRY'],
        refreshExpiry: process.env['JWT_REFRESH_TOKEN_EXPIRY'],
    },
});
exports.Configurations = Configurations;


/***/ }),
/* 64 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheHealthModule = void 0;
const tslib_1 = __webpack_require__(5);
const cache_manager_1 = __webpack_require__(65);
const common_1 = __webpack_require__(1);
const cache_health_controller_1 = __webpack_require__(74);
let CacheHealthModule = class CacheHealthModule {
};
exports.CacheHealthModule = CacheHealthModule;
exports.CacheHealthModule = CacheHealthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [cache_manager_1.CacheManagerModule],
        controllers: [cache_health_controller_1.CacheHealthController],
    })
], CacheHealthModule);


/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(66), exports);
tslib_1.__exportStar(__webpack_require__(69), exports);
tslib_1.__exportStar(__webpack_require__(72), exports);


/***/ }),
/* 66 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheManagerModule = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const cache_listener_service_1 = __webpack_require__(67);
const ioredis_1 = __webpack_require__(70);
const cache_manager_service_1 = __webpack_require__(72);
let CacheManagerModule = class CacheManagerModule {
};
exports.CacheManagerModule = CacheManagerModule;
exports.CacheManagerModule = CacheManagerModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            ioredis_1.RedisModule.forRoot({
                url: process.env['REDIS_URL'],
                type: 'single',
            }),
        ],
        providers: [cache_listener_service_1.CacheListener, cache_manager_service_1.CacheManagerService],
        exports: [cache_manager_service_1.CacheManagerService],
    })
], CacheManagerModule);


/***/ }),
/* 67 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var CacheListener_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheListener = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const event_emitter_1 = __webpack_require__(68);
const cache_message_1 = __webpack_require__(69);
const ioredis_1 = __webpack_require__(70);
const ioredis_2 = tslib_1.__importDefault(__webpack_require__(71));
let CacheListener = CacheListener_1 = class CacheListener {
    constructor(redis) {
        this.redis = redis;
        this.logger = new common_1.Logger(CacheListener_1.name);
    }
    async handleCreateEvent(data) {
        if (!data.key || !data.value) {
            this.logger.warn(`Invalid cache data provided: key or value is missing`);
            return;
        }
        try {
            const valueToStore = JSON.stringify(data.value);
            const ttlInSeconds = +data?.ttl || 120; // Default TTL is 120 seconds if not provided
            await this.redis.set(data.key, valueToStore);
            await this.redis.expire(data.key, ttlInSeconds);
            this.logger.log(`Successfully cached key: ${data.key} with TTL: ${ttlInSeconds} seconds`);
            console.log(`Cached key: ${data.key}, value: ${valueToStore}`);
        }
        catch (error) {
            this.logger.error(`Failed to handle cache creation for key: ${data.key}`, error?.stack);
            throw new Error(`Cache creation failed: ${error?.message}`);
        }
    }
    async handleUpdateEvent(data) {
        await this.redis.set(data.key, data.value);
        this.logger.log(`Handled update cache for key: ${data.key}`);
    }
    async handleDeleteEvent(key) {
        console.log('handleDeleteEvent: ', key);
        await this.redis.del(key);
        this.logger.log(`Handled delete cache for key: ${key}`);
    }
    async handlePartialUpdate(input) {
        const stringData = await this.redis.get(input.key);
        if (!stringData)
            return;
        const currentData = JSON.parse(stringData);
        if (typeof currentData == 'object') {
            await this.redis.set(input.key, {
                ...currentData,
                ...input.newValue,
            });
        }
        else {
            await this.redis.set(input.key, input.newValue);
        }
        this.logger.log(`Handled update cache for key: ${input.key}`);
    }
    async handleArrayAdd(data) {
        try {
            const currentValue = await this.redis.get(data.key);
            const currentArray = currentValue ? JSON.parse(currentValue) : [];
            currentArray.push(data.item);
            await this.redis.set(data.key, JSON.stringify(currentArray));
            if (data.ttl) {
                await this.redis.expire(data.key, data.ttl);
            }
            this.logger.log(`Successfully added item to array: ${data.key}`);
        }
        catch (error) {
            this.logger.error(`Failed to add item to array for key: ${data.key}`, error?.stack);
            throw error;
        }
    }
    async handleArrayRemove(data) {
        try {
            const currentValue = await this.redis.get(data.key);
            if (!currentValue)
                return;
            const currentArray = JSON.parse(currentValue);
            // Convert predicate string to function
            const predicateFn = new Function('item', `return ${data.predicate}`);
            const filteredArray = currentArray.filter((item) => !predicateFn(item));
            await this.redis.set(data.key, JSON.stringify(filteredArray));
            this.logger.log(`Successfully removed items from array: ${data.key}`);
        }
        catch (error) {
            this.logger.error(`Failed to remove items from array for key: ${data.key}`, error?.stack);
            throw error;
        }
    }
    async handleArrayUpdate(data) {
        try {
            const currentValue = await this.redis.get(data.key);
            if (!currentValue)
                return;
            const currentArray = JSON.parse(currentValue);
            // Convert predicate and update function strings to functions
            const predicateFn = new Function('item', `return ${data.predicate}`);
            const updateFn = new Function('item', `return ${data.updateFn}`);
            const updatedArray = currentArray.map((item) => predicateFn(item) ? updateFn(item) : item);
            await this.redis.set(data.key, JSON.stringify(updatedArray));
            this.logger.log(`Successfully updated items in array: ${data.key}`);
        }
        catch (error) {
            this.logger.error(`Failed to update items in array for key: ${data.key}`, error?.stack);
            throw error;
        }
    }
};
exports.CacheListener = CacheListener;
tslib_1.__decorate([
    (0, event_emitter_1.OnEvent)(cache_message_1.CacheMessageAction.Create),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CacheListener.prototype, "handleCreateEvent", null);
tslib_1.__decorate([
    (0, event_emitter_1.OnEvent)(cache_message_1.CacheMessageAction.Update),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CacheListener.prototype, "handleUpdateEvent", null);
tslib_1.__decorate([
    (0, event_emitter_1.OnEvent)(cache_message_1.CacheMessageAction.Delete),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], CacheListener.prototype, "handleDeleteEvent", null);
tslib_1.__decorate([
    (0, event_emitter_1.OnEvent)(cache_message_1.CacheMessageAction.PartialUpdate),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CacheListener.prototype, "handlePartialUpdate", null);
tslib_1.__decorate([
    (0, event_emitter_1.OnEvent)(cache_message_1.CacheMessageAction.ArrayAdd),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CacheListener.prototype, "handleArrayAdd", null);
tslib_1.__decorate([
    (0, event_emitter_1.OnEvent)(cache_message_1.CacheMessageAction.ArrayRemove),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CacheListener.prototype, "handleArrayRemove", null);
tslib_1.__decorate([
    (0, event_emitter_1.OnEvent)(cache_message_1.CacheMessageAction.ArrayUpdate),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CacheListener.prototype, "handleArrayUpdate", null);
exports.CacheListener = CacheListener = CacheListener_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, ioredis_1.InjectRedis)()),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof ioredis_2.default !== "undefined" && ioredis_2.default) === "function" ? _a : Object])
], CacheListener);


/***/ }),
/* 68 */
/***/ ((module) => {

module.exports = require("@nestjs/event-emitter");

/***/ }),
/* 69 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheMessageAction = void 0;
var CacheMessageAction;
(function (CacheMessageAction) {
    CacheMessageAction["Create"] = "cache.create";
    CacheMessageAction["Update"] = "cache.update";
    CacheMessageAction["Delete"] = "cache.delete";
    CacheMessageAction["PartialUpdate"] = "cache.partial-update";
    // New array-specific actions
    CacheMessageAction["ArrayAdd"] = "cache.array.add";
    CacheMessageAction["ArrayRemove"] = "cache.array.remove";
    CacheMessageAction["ArrayUpdate"] = "cache.array.update";
})(CacheMessageAction || (exports.CacheMessageAction = CacheMessageAction = {}));


/***/ }),
/* 70 */
/***/ ((module) => {

module.exports = require("@nestjs-modules/ioredis");

/***/ }),
/* 71 */
/***/ ((module) => {

module.exports = require("ioredis");

/***/ }),
/* 72 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var CacheManagerService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheManagerService = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const ioredis_1 = tslib_1.__importDefault(__webpack_require__(71));
const ioredis_2 = __webpack_require__(70);
const rxjs_1 = __webpack_require__(73);
let CacheManagerService = CacheManagerService_1 = class CacheManagerService {
    constructor(cache) {
        this.cache = cache;
        this.logger = new common_1.Logger(CacheManagerService_1.name);
    }
    get(key) {
        this.logger.log(`Start Get from cache: ${key}`);
        return (0, rxjs_1.from)(this.cache.get(key)).pipe((0, rxjs_1.map)((value) => {
            if (!value) {
                return null;
            }
            return JSON.parse(value) || null;
        }), (0, rxjs_1.tap)((response) => {
            if (response) {
                this.logger.log(`Get from cache success: ${key}`);
            }
        }));
    }
};
exports.CacheManagerService = CacheManagerService;
exports.CacheManagerService = CacheManagerService = CacheManagerService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, ioredis_2.InjectRedis)()),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof ioredis_1.default !== "undefined" && ioredis_1.default) === "function" ? _a : Object])
], CacheManagerService);


/***/ }),
/* 73 */
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),
/* 74 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheHealthController = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const cache_manager_1 = __webpack_require__(65);
const guard_1 = __webpack_require__(39);
let CacheHealthController = class CacheHealthController {
    constructor(cache) {
        this.cache = cache;
    }
    getCache(key) {
        return this.cache.get(key);
    }
};
exports.CacheHealthController = CacheHealthController;
tslib_1.__decorate([
    (0, common_1.Get)('check'),
    (0, guard_1.Public)(),
    tslib_1.__param(0, (0, common_1.Param)('key')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], CacheHealthController.prototype, "getCache", null);
exports.CacheHealthController = CacheHealthController = tslib_1.__decorate([
    (0, common_1.Controller)('cache-health'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof cache_manager_1.CacheManagerService !== "undefined" && cache_manager_1.CacheManagerService) === "function" ? _a : Object])
], CacheHealthController);


/***/ }),
/* 75 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MetadataModule = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const metadata_controller_1 = __webpack_require__(76);
const guard_1 = __webpack_require__(39);
const core_1 = __webpack_require__(2);
let MetadataModule = class MetadataModule {
};
exports.MetadataModule = MetadataModule;
exports.MetadataModule = MetadataModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [metadata_controller_1.MetadataController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: guard_1.RoleGuard,
            },
        ],
    })
], MetadataModule);


/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MetadataController = exports.ApiFile = void 0;
const tslib_1 = __webpack_require__(5);
const metadata_1 = __webpack_require__(77);
const common_1 = __webpack_require__(1);
const metadata_2 = __webpack_require__(83);
const swagger_1 = __webpack_require__(3);
const swagger_2 = __webpack_require__(3);
const microservices_1 = __webpack_require__(8);
const rxjs_1 = __webpack_require__(73);
const ApiFile = (fileName) => (target, propertyKey, descriptor) => {
    (0, swagger_2.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                [fileName]: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })(target, propertyKey, descriptor);
};
exports.ApiFile = ApiFile;
// @Roles(Role.ADMIN)
// @UseGuards(RoleGuard)
let MetadataController = class MetadataController {
    constructor(natsClient) {
        this.natsClient = natsClient;
    }
    createRealm(dto) {
        return this.natsClient.send(metadata_1.RealmPattern.Create, dto);
    }
    updateRealm(dto) {
        return this.natsClient.send(metadata_1.RealmPattern.Update, dto);
    }
    findOneRealm(id) {
        return this.natsClient.send(metadata_1.RealmPattern.FindOne, id);
    }
    findAllRealm(dto) {
        return this.natsClient.send(metadata_1.RealmPattern.FindAll, dto);
    }
    deleteRealm(id) {
        return this.natsClient.send(metadata_1.RealmPattern.Delete, id);
    }
    createMaterialArt(dto) {
        return this.natsClient.send(metadata_1.MaterialArtPattern.Create, dto);
    }
    findOneMaterialArt(id) {
        return this.natsClient.send(metadata_1.MaterialArtPattern.FindOne, id);
    }
    findAllMaterialArt(dto) {
        return this.natsClient.send(metadata_1.MaterialArtPattern.FindAll, dto);
    }
    updateMaterialArt(dto) {
        return this.natsClient.send(metadata_1.MaterialArtPattern.Update, dto);
    }
    deleteMaterialArt(id) {
        return this.natsClient.send(metadata_1.MaterialArtPattern.Delete, id);
    }
    createAchievement(dto) {
        return this.natsClient.send(metadata_1.AchievementPattern.Create, dto);
    }
    findOneAchievement(id) {
        return this.natsClient.send(metadata_1.AchievementPattern.FindOne, id);
    }
    findAllAchievement(dto) {
        return this.natsClient
            .send(metadata_1.AchievementPattern.FindAll, dto)
            .pipe((0, rxjs_1.tap)(() => common_1.Logger.log('findAllAchievement success')));
    }
    updateAchievement(dto) {
        return this.natsClient.send(metadata_1.AchievementPattern.Update, dto);
    }
    deleteAchievement(id) {
        return this.natsClient.send(metadata_1.AchievementPattern.Delete, id);
    }
    createSect(dto) {
        return this.natsClient.send(metadata_1.SectPattern.Create, dto);
    }
    findOneSect(id) {
        return this.natsClient.send(metadata_1.SectPattern.FindOne, id);
    }
    findAllSect(dto) {
        return this.natsClient
            .send(metadata_1.SectPattern.FindAll, dto)
            .pipe((0, rxjs_1.tap)(() => common_1.Logger.log('findAllSect success')));
    }
    updateSect(dto) {
        return this.natsClient.send(metadata_1.SectPattern.Update, dto);
    }
    deleteSect(id) {
        return this.natsClient.send(metadata_1.SectPattern.Delete, id);
    }
};
exports.MetadataController = MetadataController;
tslib_1.__decorate([
    (0, common_1.Post)('realm/create'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo mới một cảnh giới tu luyện' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Tạo ra một cảnh giới thành công',
        schema: {
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            example: '154dd1e2-4613-426e-b004-d230fa5e4a99',
                        },
                        name: { type: 'string', example: 'Luyện khí cảnh' },
                        level: { type: 'number', example: 1 },
                        description: {
                            type: 'string',
                            example: 'Mô tả cấp bậc cảnh giới hiện tại',
                        },
                        createdAt: { type: 'string', example: '2025-01-06T17:18:59.169Z' },
                        updatedAt: { type: 'string', example: '2025-01-06T17:18:59.170Z' },
                    },
                },
                message: { type: 'string', example: 'Tạo thành công cấp bậc tu luyện' },
            },
        },
    }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof metadata_2.CreateRealmDto !== "undefined" && metadata_2.CreateRealmDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "createRealm", null);
tslib_1.__decorate([
    (0, common_1.Patch)('realm/update'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật thông tin cảnh giới' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Cập nhật cảnh giới thành công',
        schema: {
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        level: { type: 'number' },
                        description: { type: 'string' },
                        createdAt: { type: 'string' },
                        updatedAt: { type: 'string' },
                    },
                },
                message: { type: 'string', example: 'Cập nhật cảnh giới thành công' },
            },
        },
    }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof metadata_2.UpdateRealmDto !== "undefined" && metadata_2.UpdateRealmDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "updateRealm", null);
tslib_1.__decorate([
    (0, common_1.Get)('realm/findOne/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Tìm kiếm một cảnh giới theo ID' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Tìm thấy cảnh giới',
        schema: {
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        level: { type: 'number' },
                        description: { type: 'string' },
                        createdAt: { type: 'string' },
                        updatedAt: { type: 'string' },
                    },
                },
                message: { type: 'string', example: 'Tìm thấy cảnh giới' },
            },
        },
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "findOneRealm", null);
tslib_1.__decorate([
    (0, common_1.Post)('realm/findAll'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách tất cả cảnh giới với phân trang' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Lấy danh sách cảnh giới thành công',
        schema: {
            properties: {
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            name: { type: 'string' },
                            level: { type: 'number' },
                            description: { type: 'string' },
                            createdAt: { type: 'string' },
                            updatedAt: { type: 'string' },
                        },
                    },
                },
                meta: {
                    type: 'object',
                    properties: {
                        total: { type: 'number' },
                        offset: { type: 'number' },
                        limit: { type: 'number' },
                    },
                },
                message: {
                    type: 'string',
                    example: 'Lấy danh sách cảnh giới thành công',
                },
            },
        },
    }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof metadata_2.MetadataPaginationDto !== "undefined" && metadata_2.MetadataPaginationDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "findAllRealm", null);
tslib_1.__decorate([
    (0, common_1.Delete)('realm/delete/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Khai trừ vĩnh viễn cảnh giới này khỏi tam thập tam thiên đại thế giới',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Xóa cảnh giới thành công',
        schema: {
            properties: {
                data: null,
                message: { type: 'string', example: 'Đã xóa cảnh giới thành công' },
            },
        },
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "deleteRealm", null);
tslib_1.__decorate([
    (0, common_1.Post)('materialArt/create'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo mới một võ học' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Tạo ra một võ học thành công',
        schema: {
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            example: '7b01a7b1-ebcc-491e-af5e-68126001c848',
                        },
                        name: { type: 'string', example: 'Kiếm Đạo' },
                        description: { type: 'string', example: 'Mô tả về võ học' },
                        level: { type: 'number', example: 1 },
                        sectId: {
                            type: 'string',
                            example: '9b2f6a4b-8489-4d01-9ad4-4008b76b8268',
                        },
                        createdAt: { type: 'string', example: '2025-01-06T17:19:57.289Z' },
                        updatedAt: { type: 'string', example: '2025-01-06T17:19:57.289Z' },
                    },
                },
                message: { type: 'string', example: 'Tạo thành công võ học' },
            },
        },
    }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof metadata_2.CreateMaterialArtDto !== "undefined" && metadata_2.CreateMaterialArtDto) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "createMaterialArt", null);
tslib_1.__decorate([
    (0, common_1.Get)('materialArt/findOne/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Tìm kiếm một võ học theo ID' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Tìm thấy võ học',
        schema: {
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        description: { type: 'string' },
                        level: { type: 'number' },
                        sectId: { type: 'string' },
                        createdAt: { type: 'string' },
                        updatedAt: { type: 'string' },
                    },
                },
                message: { type: 'string', example: 'Tìm thấy võ học' },
            },
        },
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "findOneMaterialArt", null);
tslib_1.__decorate([
    (0, common_1.Post)('materialArt/findAll'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách tất cả võ học với phân trang' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Lấy danh sách võ học thành công',
        schema: {
            properties: {
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            name: { type: 'string' },
                            description: { type: 'string' },
                            level: { type: 'number' },
                            sectId: { type: 'string' },
                            createdAt: { type: 'string' },
                            updatedAt: { type: 'string' },
                        },
                    },
                },
                meta: {
                    type: 'object',
                    properties: {
                        total: { type: 'number' },
                        offset: { type: 'number' },
                        limit: { type: 'number' },
                    },
                },
                message: { type: 'string', example: 'Lấy danh sách võ học thành công' },
            },
        },
    }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof metadata_2.MetadataPaginationDto !== "undefined" && metadata_2.MetadataPaginationDto) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "findAllMaterialArt", null);
tslib_1.__decorate([
    (0, common_1.Patch)('materialArt/update'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật thông tin võ học' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Cập nhật võ học thành công',
        schema: {
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        description: { type: 'string' },
                        level: { type: 'number' },
                        sectId: { type: 'string' },
                        createdAt: { type: 'string' },
                        updatedAt: { type: 'string' },
                    },
                },
                message: { type: 'string', example: 'Cập nhật võ học thành công' },
            },
        },
    }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof metadata_2.UpdateMaterialArtDto !== "undefined" && metadata_2.UpdateMaterialArtDto) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "updateMaterialArt", null);
tslib_1.__decorate([
    (0, common_1.Delete)('materialArt/delete/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Khai trừ vĩnh viễn võ học này khỏi tam thập tam thiên đại thế giới',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Xóa võ học thành công',
        schema: {
            properties: {
                data: null,
                message: { type: 'string', example: 'Đã xóa võ học thành công' },
            },
        },
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "deleteMaterialArt", null);
tslib_1.__decorate([
    (0, common_1.Post)('achievement/create'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo mới một thành tựu' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Tạo ra một thành tựu thành công',
        schema: {
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            example: '9b2f6a4b-8489-4d01-9ad4-4008b76b8268',
                        },
                        name: { type: 'string', example: 'Sơ cấp thuật đạo' },
                        logo: {
                            type: 'string',
                            example: 'Hình ảnh mô tả thành tựu',
                        },
                        createdAt: { type: 'string', example: '2025-01-06T17:19:30.161Z' },
                        updatedAt: { type: 'string', example: '2025-01-06T17:19:30.161Z' },
                    },
                },
                message: { type: 'string', example: 'Tạo thành công thành tựu' },
            },
        },
    }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof metadata_2.CreateAchievementDto !== "undefined" && metadata_2.CreateAchievementDto) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "createAchievement", null);
tslib_1.__decorate([
    (0, common_1.Get)('achievement/findOne/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Tìm kiếm một thành tựu theo ID' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Tìm thấy thành tựu',
        schema: {
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        logo: { type: 'string' },
                        createdAt: { type: 'string' },
                        updatedAt: { type: 'string' },
                    },
                },
                message: { type: 'string', example: 'Tìm thấy thành tựu' },
            },
        },
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "findOneAchievement", null);
tslib_1.__decorate([
    (0, common_1.Post)('achievement/findAll'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách tất cả thành tựu với phân trang' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Lấy danh sách thành tựu thành công',
        schema: {
            properties: {
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            name: { type: 'string' },
                            logo: { type: 'string' },
                            createdAt: { type: 'string' },
                            updatedAt: { type: 'string' },
                        },
                    },
                },
                meta: {
                    type: 'object',
                    properties: {
                        total: { type: 'number' },
                        offset: { type: 'number' },
                        limit: { type: 'number' },
                    },
                },
                message: {
                    type: 'string',
                    example: 'Lấy danh sách thành tựu thành công',
                },
            },
        },
    }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof metadata_2.MetadataPaginationDto !== "undefined" && metadata_2.MetadataPaginationDto) === "function" ? _j : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "findAllAchievement", null);
tslib_1.__decorate([
    (0, common_1.Patch)('achievement/update'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật thông tin thành tựu' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Cập nhật thành tựu thành công',
        schema: {
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        logo: { type: 'string' },
                        createdAt: { type: 'string' },
                        updatedAt: { type: 'string' },
                    },
                },
                message: { type: 'string', example: 'Cập nhật thành tựu thành công' },
            },
        },
    }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_k = typeof metadata_2.UpdateAchievementDto !== "undefined" && metadata_2.UpdateAchievementDto) === "function" ? _k : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "updateAchievement", null);
tslib_1.__decorate([
    (0, common_1.Delete)('achievement/delete/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Khai trừ vĩnh viễn thành tựu này khỏi tam thập tam thiên đại thế giới',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Xóa thành tựu thành công',
        schema: {
            properties: {
                data: null,
                message: { type: 'string', example: 'Đã xóa thành tựu thành công' },
            },
        },
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "deleteAchievement", null);
tslib_1.__decorate([
    (0, common_1.Post)('sect/create'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo mới một môn phái' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Tạo ra một môn phái thành công',
        schema: {
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            example: '7b01a7b1-ebcc-491e-af5e-68126001c848',
                        },
                        name: { type: 'string', example: 'Frontend' },
                        description: { type: 'string', example: 'Mô tả môn phái hiện tại' },
                        logo: { type: 'string', example: 'Mô tả hình ảnh của môn phái' },
                        updatedAt: { type: 'string', example: '2025-01-06T17:19:57.289Z' },
                        createdAt: { type: 'string', example: '2025-01-06T17:19:57.289Z' },
                    },
                },
                message: { type: 'string', example: 'Tạo thành công môn phái' },
            },
        },
    }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_l = typeof metadata_2.CreateSectDto !== "undefined" && metadata_2.CreateSectDto) === "function" ? _l : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "createSect", null);
tslib_1.__decorate([
    (0, common_1.Get)('sect/findOne/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Tìm kiếm một môn phái theo ID' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Tìm thấy môn phái',
        schema: {
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        description: { type: 'string' },
                        logo: { type: 'string' },
                        createdAt: { type: 'string' },
                        updatedAt: { type: 'string' },
                    },
                },
                message: { type: 'string', example: 'Tìm thấy môn phái' },
            },
        },
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "findOneSect", null);
tslib_1.__decorate([
    (0, common_1.Post)('sect/findAll'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách tất cả môn phái với phân trang' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Lấy danh sách môn phái thành công',
        schema: {
            properties: {
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            name: { type: 'string' },
                            description: { type: 'string' },
                            logo: { type: 'string' },
                            createdAt: { type: 'string' },
                            updatedAt: { type: 'string' },
                        },
                    },
                },
                meta: {
                    type: 'object',
                    properties: {
                        total: { type: 'number' },
                        offset: { type: 'number' },
                        limit: { type: 'number' },
                    },
                },
                message: {
                    type: 'string',
                    example: 'Lấy danh sách môn phái thành công',
                },
            },
        },
    }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_m = typeof metadata_2.MetadataPaginationDto !== "undefined" && metadata_2.MetadataPaginationDto) === "function" ? _m : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "findAllSect", null);
tslib_1.__decorate([
    (0, common_1.Patch)('sect/update'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật thông tin môn phái' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Cập nhật môn phái thành công',
        schema: {
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        description: { type: 'string' },
                        logo: { type: 'string' },
                        updatedAt: { type: 'string' },
                        createdAt: { type: 'string' },
                    },
                },
                message: { type: 'string', example: 'Cập nhật môn phái thành công' },
            },
        },
    }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_o = typeof metadata_2.UpdateSectDto !== "undefined" && metadata_2.UpdateSectDto) === "function" ? _o : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "updateSect", null);
tslib_1.__decorate([
    (0, common_1.Delete)('sect/delete/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Khai trừ vĩnh viễn môn phái này khỏi tam thập tam thiên đại thế giới',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Xóa môn phái thành công',
        schema: {
            properties: {
                data: null,
                message: { type: 'string', example: 'Đã xóa môn phái thành công' },
            },
        },
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "deleteSect", null);
exports.MetadataController = MetadataController = tslib_1.__decorate([
    (0, common_1.Controller)('metadata'),
    tslib_1.__param(0, (0, common_1.Inject)('NATS_SERVICE')),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], MetadataController);


/***/ }),
/* 77 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(78), exports);
tslib_1.__exportStar(__webpack_require__(80), exports);
tslib_1.__exportStar(__webpack_require__(81), exports);
tslib_1.__exportStar(__webpack_require__(82), exports);


/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SectPattern = void 0;
const module_1 = __webpack_require__(79);
exports.SectPattern = Object.freeze({
    Create: `${module_1.CoreModule.Sect}/Create`,
    Update: `${module_1.CoreModule.Sect}/Update`,
    Delete: `${module_1.CoreModule.Sect}/Delete`,
    FindOne: `${module_1.CoreModule.Sect}/FindOne`,
    FindAll: `${module_1.CoreModule.Sect}/FindAll`,
});


/***/ }),
/* 79 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CoreModule = void 0;
const __1 = __webpack_require__(12);
exports.CoreModule = Object.freeze({
    Sect: `${__1.MicroServiceName.Core}/Sect`,
    Realm: `${__1.MicroServiceName.Core}/Realm`,
    Achievement: `${__1.MicroServiceName.Core}/Achievement`,
    MaterialArt: `${__1.MicroServiceName.Core}/MaterialArt`,
});


/***/ }),
/* 80 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RealmPattern = void 0;
const module_1 = __webpack_require__(79);
exports.RealmPattern = Object.freeze({
    Create: `${module_1.CoreModule.Realm}/Create`,
    Update: `${module_1.CoreModule.Realm}/Update`,
    Delete: `${module_1.CoreModule.Realm}/Delete`,
    FindOne: `${module_1.CoreModule.Realm}/FindOne`,
    FindAll: `${module_1.CoreModule.Realm}/FindAll`,
});


/***/ }),
/* 81 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AchievementPattern = void 0;
const module_1 = __webpack_require__(79);
exports.AchievementPattern = Object.freeze({
    Create: `${module_1.CoreModule.Achievement}/Create`,
    Update: `${module_1.CoreModule.Achievement}/Update`,
    Delete: `${module_1.CoreModule.Achievement}/Delete`,
    FindOne: `${module_1.CoreModule.Achievement}/FindOne`,
    FindAll: `${module_1.CoreModule.Achievement}/FindAll`,
});


/***/ }),
/* 82 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MaterialArtPattern = void 0;
const module_1 = __webpack_require__(79);
exports.MaterialArtPattern = Object.freeze({
    Create: `${module_1.CoreModule.MaterialArt}/Create`,
    Update: `${module_1.CoreModule.MaterialArt}/Update`,
    Delete: `${module_1.CoreModule.MaterialArt}/Delete`,
    FindOne: `${module_1.CoreModule.MaterialArt}/FindOne`,
    FindAll: `${module_1.CoreModule.MaterialArt}/FindAll`,
});


/***/ }),
/* 83 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(84), exports);
tslib_1.__exportStar(__webpack_require__(85), exports);
tslib_1.__exportStar(__webpack_require__(86), exports);
tslib_1.__exportStar(__webpack_require__(87), exports);
tslib_1.__exportStar(__webpack_require__(88), exports);
tslib_1.__exportStar(__webpack_require__(89), exports);
tslib_1.__exportStar(__webpack_require__(90), exports);
tslib_1.__exportStar(__webpack_require__(91), exports);
tslib_1.__exportStar(__webpack_require__(92), exports);
tslib_1.__exportStar(__webpack_require__(93), exports);


/***/ }),
/* 84 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteDto = void 0;
const tslib_1 = __webpack_require__(5);
const swagger_1 = __webpack_require__(3);
const class_validator_1 = __webpack_require__(16);
class DeleteDto {
}
exports.DeleteDto = DeleteDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'id here...',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], DeleteDto.prototype, "id", void 0);


/***/ }),
/* 85 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MetadataPaginationDto = void 0;
const paging_dto_1 = __webpack_require__(30);
class MetadataPaginationDto extends paging_dto_1.PagingDto {
}
exports.MetadataPaginationDto = MetadataPaginationDto;


/***/ }),
/* 86 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSectDto = void 0;
const tslib_1 = __webpack_require__(5);
const swagger_1 = __webpack_require__(3);
const class_validator_1 = __webpack_require__(16);
class CreateSectDto {
}
exports.CreateSectDto = CreateSectDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        example: 'Frontend',
    }),
    tslib_1.__metadata("design:type", String)
], CreateSectDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Mô môn phái hiện tại.',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateSectDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        example: 'Mô tả hình ảnh của môn phái',
    }),
    tslib_1.__metadata("design:type", String)
], CreateSectDto.prototype, "logo", void 0);


/***/ }),
/* 87 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateSectDto = void 0;
const tslib_1 = __webpack_require__(5);
const swagger_1 = __webpack_require__(3);
const class_validator_1 = __webpack_require__(16);
class UpdateSectDto {
}
exports.UpdateSectDto = UpdateSectDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        example: 'xxxx',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateSectDto.prototype, "id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Frontend',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateSectDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Mô môn phái hiện tại.',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateSectDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Mô tả hình ảnh của môn phái',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateSectDto.prototype, "logo", void 0);


/***/ }),
/* 88 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateRealmDto = void 0;
const tslib_1 = __webpack_require__(5);
const swagger_1 = __webpack_require__(3);
const class_validator_1 = __webpack_require__(16);
class CreateRealmDto {
}
exports.CreateRealmDto = CreateRealmDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        example: 'Luyện khí cảnh',
    }),
    tslib_1.__metadata("design:type", String)
], CreateRealmDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Mô tả cảnh giới hiện tại',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateRealmDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Mô tả cấp bậc cảnh giới hiện tại',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateRealmDto.prototype, "level", void 0);


/***/ }),
/* 89 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateRealmDto = void 0;
const tslib_1 = __webpack_require__(5);
const swagger_1 = __webpack_require__(3);
class UpdateRealmDto {
}
exports.UpdateRealmDto = UpdateRealmDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'xxxx',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateRealmDto.prototype, "id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Luyện khí cảnh',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateRealmDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Mô tả cảnh giới hiện tại',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateRealmDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Mô tả cấp bậc cảnh giới hiện tại',
    }),
    tslib_1.__metadata("design:type", Number)
], UpdateRealmDto.prototype, "level", void 0);


/***/ }),
/* 90 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAchievementDto = void 0;
const tslib_1 = __webpack_require__(5);
const swagger_1 = __webpack_require__(3);
const class_validator_1 = __webpack_require__(16);
class CreateAchievementDto {
}
exports.CreateAchievementDto = CreateAchievementDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        example: 'Sơ cấp thuật đạo',
    }),
    tslib_1.__metadata("design:type", String)
], CreateAchievementDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Hình ảnh mô tả cấp bậc cảnh giới hiện tại',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateAchievementDto.prototype, "logo", void 0);


/***/ }),
/* 91 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAchievementDto = void 0;
const tslib_1 = __webpack_require__(5);
const swagger_1 = __webpack_require__(3);
class UpdateAchievementDto {
}
exports.UpdateAchievementDto = UpdateAchievementDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'xxxx',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateAchievementDto.prototype, "id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Sơ cấp thuật đạo',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateAchievementDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Hình ảnh mô tả cấp bậc cảnh giới hiện tại',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateAchievementDto.prototype, "logo", void 0);


/***/ }),
/* 92 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateMaterialArtDto = void 0;
const tslib_1 = __webpack_require__(5);
const swagger_1 = __webpack_require__(3);
const class_validator_1 = __webpack_require__(16);
class CreateMaterialArtDto {
}
exports.CreateMaterialArtDto = CreateMaterialArtDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        example: 'Angular Thần Công',
    }),
    tslib_1.__metadata("design:type", String)
], CreateMaterialArtDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        example: 'Mô tả môn võ học',
    }),
    tslib_1.__metadata("design:type", String)
], CreateMaterialArtDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        example: 'Thông tin Id của môn phái tạo ra môn võ học này.',
    }),
    tslib_1.__metadata("design:type", String)
], CreateMaterialArtDto.prototype, "sectId", void 0);


/***/ }),
/* 93 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateMaterialArtDto = void 0;
const tslib_1 = __webpack_require__(5);
const swagger_1 = __webpack_require__(3);
class UpdateMaterialArtDto {
}
exports.UpdateMaterialArtDto = UpdateMaterialArtDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'xxxx',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateMaterialArtDto.prototype, "id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Angular Thần Công',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateMaterialArtDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Mô tả môn võ học',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateMaterialArtDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Thông tin Id của môn phái tạo ra môn võ học này.',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateMaterialArtDto.prototype, "sectId", void 0);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(3);
const app_module_1 = __webpack_require__(4);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const globalPrefix = 'api';
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
    });
    app.setGlobalPrefix(globalPrefix);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('TangKinhCode API')
        .setDescription('The TangKinhCode API description')
        .setVersion('1.0')
        .addTag('TangKinhCode')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('', app, documentFactory);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

})();

/******/ })()
;
//# sourceMappingURL=main.js.map