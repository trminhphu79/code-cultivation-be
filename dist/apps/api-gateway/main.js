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
const profile_module_1 = __webpack_require__(36);
const nats_client_1 = __webpack_require__(38);
const configs_1 = __webpack_require__(40);
const config_1 = __webpack_require__(31);
const core_1 = __webpack_require__(2);
const guard_1 = __webpack_require__(29);
const cache_health_module_1 = __webpack_require__(43);
const jwt_1 = __webpack_require__(32);
const metadata_module_1 = __webpack_require__(54);
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
const throttler_1 = __webpack_require__(35);
const core_1 = __webpack_require__(2);
const guard_1 = __webpack_require__(29);
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
const guard_1 = __webpack_require__(29);
const throttler_1 = __webpack_require__(35);
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
    AddAchivement: `${module_1.AccountModule.Profile}/AddAchivement`,
    RemoveAchivement: `${module_1.AccountModule.Profile}/RemoveAchivement`,
    AddMaterialArt: `${module_1.AccountModule.Profile}/AddMaterialArt`,
    RemoveMaterialArt: `${module_1.AccountModule.Profile}/RemoveMaterialArt`,
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


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(30), exports);
tslib_1.__exportStar(__webpack_require__(33), exports);
tslib_1.__exportStar(__webpack_require__(34), exports);


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AuthGuard_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthGuard = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const config_1 = __webpack_require__(31);
const core_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(32);
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
/* 31 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 32 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = __webpack_require__(1);
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomThrottleGuard = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const throttler_1 = __webpack_require__(35);
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
/* 35 */
/***/ ((module) => {

module.exports = require("@nestjs/throttler");

/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileModule = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const profile_controller_1 = __webpack_require__(37);
let ProfileModule = class ProfileModule {
};
exports.ProfileModule = ProfileModule;
exports.ProfileModule = ProfileModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [profile_controller_1.ProfileController],
    })
], ProfileModule);


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileController = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const microservices_1 = __webpack_require__(8);
const swagger_1 = __webpack_require__(3);
const guard_1 = __webpack_require__(29);
const account_1 = __webpack_require__(9);
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
    (0, guard_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Pernament delete account.' }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ProfileController.prototype, "delete", null);
exports.ProfileController = ProfileController = tslib_1.__decorate([
    (0, common_1.Controller)('profile'),
    tslib_1.__param(0, (0, common_1.Inject)('NATS_SERVICE')),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], ProfileController);


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(39), exports);


/***/ }),
/* 39 */
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
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(41), exports);
tslib_1.__exportStar(__webpack_require__(42), exports);


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 42 */
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
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheHealthModule = void 0;
const tslib_1 = __webpack_require__(5);
const cache_manager_1 = __webpack_require__(44);
const common_1 = __webpack_require__(1);
const cache_health_controller_1 = __webpack_require__(53);
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
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(45), exports);
tslib_1.__exportStar(__webpack_require__(48), exports);
tslib_1.__exportStar(__webpack_require__(51), exports);


/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheManagerModule = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const cache_listener_service_1 = __webpack_require__(46);
const ioredis_1 = __webpack_require__(49);
const cache_manager_service_1 = __webpack_require__(51);
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
/* 46 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var CacheListener_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheListener = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const event_emitter_1 = __webpack_require__(47);
const cache_message_1 = __webpack_require__(48);
const ioredis_1 = __webpack_require__(49);
const ioredis_2 = tslib_1.__importDefault(__webpack_require__(50));
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
exports.CacheListener = CacheListener = CacheListener_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, ioredis_1.InjectRedis)()),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof ioredis_2.default !== "undefined" && ioredis_2.default) === "function" ? _a : Object])
], CacheListener);


/***/ }),
/* 47 */
/***/ ((module) => {

module.exports = require("@nestjs/event-emitter");

/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheMessageAction = void 0;
var CacheMessageAction;
(function (CacheMessageAction) {
    CacheMessageAction["Create"] = "Create";
    CacheMessageAction["Update"] = "Update";
    CacheMessageAction["PartialUpdate"] = "PartialUpdate";
    CacheMessageAction["Delete"] = "Delete";
})(CacheMessageAction || (exports.CacheMessageAction = CacheMessageAction = {}));


/***/ }),
/* 49 */
/***/ ((module) => {

module.exports = require("@nestjs-modules/ioredis");

/***/ }),
/* 50 */
/***/ ((module) => {

module.exports = require("ioredis");

/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var CacheManagerService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheManagerService = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const ioredis_1 = tslib_1.__importDefault(__webpack_require__(50));
const ioredis_2 = __webpack_require__(49);
const rxjs_1 = __webpack_require__(52);
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
/* 52 */
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),
/* 53 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheHealthController = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const cache_manager_1 = __webpack_require__(44);
const guard_1 = __webpack_require__(29);
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
/* 54 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MetadataModule = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const metadata_controller_1 = __webpack_require__(55);
const throttler_1 = __webpack_require__(35);
const core_1 = __webpack_require__(2);
const guard_1 = __webpack_require__(29);
const database_1 = __webpack_require__(88);
const metadata_service_1 = __webpack_require__(56);
const file_uploader_1 = __webpack_require__(70);
let MetadataModule = class MetadataModule {
};
exports.MetadataModule = MetadataModule;
exports.MetadataModule = MetadataModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [metadata_controller_1.MetadataController],
        imports: [
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 1000,
                    limit: 100,
                },
            ]),
            file_uploader_1.FileUploaderModule.forRoot({
                publicKey: process.env['IMAGE_KIT_PUBLIC_KEY'],
                urlEndpoint: process.env['IMAGE_KIT_ENDPOINT'],
                privateKey: process.env['IMAGE_KIT_PRIVATE_KEY'],
            }),
            database_1.DatabaseConfigModule,
            database_1.DatabaseConfigFeature,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: guard_1.CustomThrottleGuard,
            },
            metadata_service_1.MetadataService,
        ],
    })
], MetadataModule);


/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MetadataController = exports.ApiFile = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const metadata_service_1 = __webpack_require__(56);
const metadata_1 = __webpack_require__(81);
const guard_1 = __webpack_require__(29);
const swagger_1 = __webpack_require__(3);
const platform_express_1 = __webpack_require__(87);
const swagger_2 = __webpack_require__(3);
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
let MetadataController = class MetadataController {
    constructor(service) {
        this.service = service;
    }
    createRealm(dto) {
        return this.service.createRealm(dto);
    }
    updateRealm(dto) {
        return this.service.updateRealm(dto);
    }
    deleteRealm(id) {
        return this.service.deleteRealm({ id });
    }
    createMaterialArt(file, dto) {
        console.log('createMaterialArt DTO: ', dto);
        console.log('createMaterialArt file: ', typeof file);
        return this.service.createMaterialArt({ ...dto, logo: file });
    }
    updateMaterialArt(dto) {
        return this.service.updateMaterialArt(dto);
    }
    deleteMaterialArt(id) {
        return this.service.deleteMaterialArt({ id });
    }
    createAchievement(dto) {
        return this.service.createAchievement(dto);
    }
    updateAchievement(dto) {
        return this.service.updateAchievement(dto);
    }
    deleteAchievement(id) {
        return this.service.deleteAchievement({ id });
    }
    createSect(dto) {
        return this.service.createSect(dto);
    }
    updateSect(dto) {
        return this.service.updateSect(dto);
    }
    deleteSect(id) {
        return this.service.deleteSect({ id });
    }
};
exports.MetadataController = MetadataController;
tslib_1.__decorate([
    (0, guard_1.Public)(),
    (0, common_1.Post)('realm/create'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Tạo ra một cảnh giới thành công.',
        schema: {
            example: {
                data: {
                    level: 1,
                    createdAt: '2025-01-06T17:18:59.169Z',
                    updatedAt: '2025-01-06T17:18:59.170Z',
                    id: '154dd1e2-4613-426e-b004-d230fa5e4a99',
                    name: 'Luyện khí cảnh',
                    description: 'Mô tả cấp bậc cảnh giới hiện tại',
                },
                message: 'Tạo thành công cấp bậc tu luyện.',
            },
        },
    }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof metadata_1.CreateRealmDto !== "undefined" && metadata_1.CreateRealmDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "createRealm", null);
tslib_1.__decorate([
    (0, guard_1.Public)(),
    (0, common_1.Patch)('realm/update'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "updateRealm", null);
tslib_1.__decorate([
    (0, guard_1.Public)(),
    (0, common_1.Delete)('realm/delete/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Khai trừ vĩnh viễn cảnh giới này khỏi tam thập tam thiên đại thế giới.',
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "deleteRealm", null);
tslib_1.__decorate([
    (0, guard_1.Public)(),
    (0, common_1.Post)('materialArt/create'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, exports.ApiFile)('logo'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    tslib_1.__param(0, (0, common_1.UploadedFile)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_c = typeof metadata_1.CreateMaterialArtDto !== "undefined" && metadata_1.CreateMaterialArtDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "createMaterialArt", null);
tslib_1.__decorate([
    (0, guard_1.Public)(),
    (0, common_1.Patch)('materialArt/update'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "updateMaterialArt", null);
tslib_1.__decorate([
    (0, guard_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Khai trừ vĩnh viễn võ học này khỏi tam thập tam thiên đại thế giới.',
    }),
    (0, common_1.Delete)('materialArt/delete/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "deleteMaterialArt", null);
tslib_1.__decorate([
    (0, guard_1.Public)(),
    (0, common_1.Post)('achievement/create'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Tạo ra một cảnh giới thành công.',
        schema: {
            example: {
                data: {
                    id: '9b2f6a4b-8489-4d01-9ad4-4008b76b8268',
                    name: 'Sơ cấp thuật đạo',
                    logo: 'Hình ảnh mô tả cấp bậc cảnh giới hiện tại',
                    updatedAt: '2025-01-06T17:19:30.161Z',
                    createdAt: '2025-01-06T17:19:30.161Z',
                },
                message: 'Tạo thành công thành tựu.',
            },
        },
    }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof metadata_1.CreateAchievementDto !== "undefined" && metadata_1.CreateAchievementDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "createAchievement", null);
tslib_1.__decorate([
    (0, guard_1.Public)(),
    (0, common_1.Patch)('achievement/update'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "updateAchievement", null);
tslib_1.__decorate([
    (0, guard_1.Public)(),
    (0, common_1.Delete)('achievement/delete/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Khai trừ vĩnh viễn thành tựu này khỏi tam thập tam thiên đại thế giới.',
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "deleteAchievement", null);
tslib_1.__decorate([
    (0, guard_1.Public)(),
    (0, common_1.Post)('sect/create'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Tạo ra một cảnh giới thành công.',
        schema: {
            example: {
                data: {
                    id: '7b01a7b1-ebcc-491e-af5e-68126001c848',
                    name: 'Frontend',
                    description: 'Mô môn phái hiện tại.',
                    logo: 'Mô tả hình ảnh của môn phái',
                    updatedAt: '2025-01-06T17:19:57.289Z',
                    createdAt: '2025-01-06T17:19:57.289Z',
                },
                message: 'Tạo thành công môn phái.',
            },
        },
    }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof metadata_1.CreateSectDto !== "undefined" && metadata_1.CreateSectDto) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "createSect", null);
tslib_1.__decorate([
    (0, guard_1.Public)(),
    (0, common_1.Patch)('sect/update'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "updateSect", null);
tslib_1.__decorate([
    (0, guard_1.Public)(),
    (0, common_1.Delete)('sect/delete/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Khai trừ vĩnh viễn môn phái này khỏi tam thập tam thiên đại thế giới.',
    }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], MetadataController.prototype, "deleteSect", null);
exports.MetadataController = MetadataController = tslib_1.__decorate([
    (0, common_1.Controller)('metadata'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof metadata_service_1.MetadataService !== "undefined" && metadata_service_1.MetadataService) === "function" ? _a : Object])
], MetadataController);
// materialals
// realm


/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MetadataService = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const realm_1 = __webpack_require__(57);
const rxjs_1 = __webpack_require__(52);
const sequelize_1 = __webpack_require__(69);
const material_art_1 = __webpack_require__(67);
const achievement_1 = __webpack_require__(65);
const sect_1 = __webpack_require__(68);
const file_uploader_1 = __webpack_require__(70);
const exception_1 = __webpack_require__(77);
const axios_1 = __webpack_require__(80);
let MetadataService = class MetadataService {
    constructor(sectModel, realmModel, materialArtModel, achievementModel, fileUploader) {
        this.sectModel = sectModel;
        this.realmModel = realmModel;
        this.materialArtModel = materialArtModel;
        this.achievementModel = achievementModel;
        this.fileUploader = fileUploader;
        console.log('fileUploader: ', this.fileUploader);
    }
    // Create Realm
    createRealm(body) {
        return (0, rxjs_1.from)(this.realmModel.create({ ...body })).pipe((0, rxjs_1.map)((res) => ({
            data: res.toJSON(),
            message: 'Tạo thành công cấp bậc tu luyện.',
        })));
    }
    // Update Realm
    updateRealm(body) {
        const { id, ...rest } = body;
        return (0, rxjs_1.from)(this.realmModel.findByPk(id)).pipe((0, rxjs_1.switchMap)((realm) => {
            if (!realm) {
                return (0, rxjs_1.of)({
                    message: 'Cấp bậc tu luyện không tồn tại.',
                });
            }
            return (0, rxjs_1.from)(realm.update({ ...rest })).pipe((0, rxjs_1.map)((updated) => ({
                data: updated.toJSON(),
                message: 'Cập nhật thành công cấp bậc tu luyện.',
            })));
        }));
    }
    // Delete Realm
    deleteRealm(body) {
        return (0, rxjs_1.from)(this.realmModel.findByPk(body.id)).pipe((0, rxjs_1.switchMap)((realm) => {
            if (!realm) {
                return (0, rxjs_1.of)({ message: 'Cấp bậc tu luyện không tồn tại.' });
            }
            return (0, rxjs_1.from)(realm.destroy()).pipe((0, rxjs_1.map)(() => ({
                message: 'Xóa thành công cấp bậc tu luyện.',
            })));
        }));
    }
    // Create Material Art
    createMaterialArt(body) {
        return this.fileUploader
            .upload({
            file: 'https://www.milofoundation.org/wp-content/uploads/2024/09/20240928130759.jpg',
            fileName: 'test_material',
            folder: 'logo',
        })
            .pipe((0, rxjs_1.catchError)((err) => {
            console.log('Error upload: ', err);
            return (0, exception_1.throwException)(axios_1.HttpStatusCode.InternalServerError, 'Tải lên hình ảnh không thành công.');
        }), (0, rxjs_1.switchMap)((response) => {
            console.log('Upload response: ', response);
            if (response && response?.url) {
                return (0, rxjs_1.from)(this.materialArtModel.create({ ...body, logo: response.url })).pipe((0, rxjs_1.map)((res) => ({
                    data: res.toJSON(),
                    message: 'Tạo thành công bộ môn võ học.',
                })));
            }
            (0, exception_1.throwException)(axios_1.HttpStatusCode.InternalServerError, 'Tải lên hình ảnh không thành công.');
        }));
    }
    // Update Material Art
    updateMaterialArt(body) {
        const { id, ...rest } = body;
        return (0, rxjs_1.from)(this.materialArtModel.findByPk(id)).pipe((0, rxjs_1.switchMap)((materialArt) => {
            if (!materialArt) {
                return (0, rxjs_1.of)({
                    message: 'Bộ môn võ học không tồn tại.',
                });
            }
            return (0, rxjs_1.from)(materialArt.update({ ...rest })).pipe((0, rxjs_1.map)((updated) => ({
                data: updated.toJSON(),
                message: 'Cập nhật thành công bộ môn võ học.',
            })));
        }));
    }
    // Delete Material Art
    deleteMaterialArt(body) {
        return (0, rxjs_1.from)(this.materialArtModel.findByPk(body.id)).pipe((0, rxjs_1.switchMap)((materialArt) => {
            if (!materialArt) {
                return (0, rxjs_1.of)({ message: 'Bộ môn võ học không tồn tại.' });
            }
            return (0, rxjs_1.from)(materialArt.destroy()).pipe((0, rxjs_1.map)(() => ({
                message: 'Xóa thành công bộ môn võ học.',
            })));
        }));
    }
    // Create Achievement
    createAchievement(body) {
        return (0, rxjs_1.from)(this.achievementModel.create({ ...body })).pipe((0, rxjs_1.map)((res) => ({
            data: res.toJSON(),
            message: 'Tạo thành công thành tựu.',
        })));
    }
    // Update Achievement
    updateAchievement(body) {
        const { id, ...rest } = body;
        return (0, rxjs_1.from)(this.achievementModel.findByPk(id)).pipe((0, rxjs_1.switchMap)((achievement) => {
            if (!achievement) {
                return (0, rxjs_1.of)({
                    message: 'Thành tựu không tồn tại.',
                });
            }
            return (0, rxjs_1.from)(achievement.update({ ...rest })).pipe((0, rxjs_1.map)((updated) => ({
                data: updated.toJSON(),
                message: 'Cập nhật thành công thành tựu.',
            })));
        }));
    }
    // Delete Achievement
    deleteAchievement(body) {
        return (0, rxjs_1.from)(this.achievementModel.findByPk(body.id)).pipe((0, rxjs_1.switchMap)((achievement) => {
            if (!achievement) {
                return (0, rxjs_1.of)({ message: 'Thành tựu không tồn tại.' });
            }
            return (0, rxjs_1.from)(achievement.destroy()).pipe((0, rxjs_1.map)(() => ({
                message: 'Xóa thành công thành tựu.',
            })));
        }));
    }
    // Create Sect
    createSect(body) {
        return (0, rxjs_1.from)(this.sectModel.create({ ...body })).pipe((0, rxjs_1.map)((res) => ({
            data: res.toJSON(),
            message: 'Tạo thành công môn phái.',
        })));
    }
    // Update Sect
    updateSect(body) {
        const { id, ...rest } = body;
        return (0, rxjs_1.from)(this.sectModel.findByPk(id)).pipe((0, rxjs_1.switchMap)((sect) => {
            if (!sect) {
                return (0, rxjs_1.of)({
                    message: 'Môn phái không tồn tại.',
                });
            }
            return (0, rxjs_1.from)(sect.update({ ...rest })).pipe((0, rxjs_1.map)((updated) => ({
                data: updated.toJSON(),
                message: 'Cập nhật thành công môn phái.',
            })));
        }));
    }
    // Delete Sect
    deleteSect(body) {
        return (0, rxjs_1.from)(this.sectModel.findByPk(body.id)).pipe((0, rxjs_1.switchMap)((sect) => {
            if (!sect) {
                return (0, rxjs_1.of)({ message: 'Môn phái không tồn tại.' });
            }
            return (0, rxjs_1.from)(sect.destroy()).pipe((0, rxjs_1.map)(() => ({
                message: 'Xóa thành công môn phái.',
            })));
        }));
    }
};
exports.MetadataService = MetadataService;
exports.MetadataService = MetadataService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, sequelize_1.InjectModel)(sect_1.Sect)),
    tslib_1.__param(1, (0, sequelize_1.InjectModel)(realm_1.Realm)),
    tslib_1.__param(2, (0, sequelize_1.InjectModel)(material_art_1.MaterialArt)),
    tslib_1.__param(3, (0, sequelize_1.InjectModel)(achievement_1.Achievement)),
    tslib_1.__param(4, (0, file_uploader_1.InjectFileUploader)()),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object, Object, typeof (_a = typeof file_uploader_1.FileUploader !== "undefined" && file_uploader_1.FileUploader) === "function" ? _a : Object])
], MetadataService);


/***/ }),
/* 57 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Realm = void 0;
const tslib_1 = __webpack_require__(5);
const sequelize_typescript_1 = __webpack_require__(58);
const profile_model_1 = __webpack_require__(59);
let Realm = class Realm extends sequelize_typescript_1.Model {
};
exports.Realm = Realm;
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
    }),
    tslib_1.__metadata("design:type", String)
], Realm.prototype, "id", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
        unique: true,
    }),
    tslib_1.__metadata("design:type", String)
], Realm.prototype, "name", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    tslib_1.__metadata("design:type", String)
], Realm.prototype, "description", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.NUMBER,
        allowNull: true,
    }),
    tslib_1.__metadata("design:type", String)
], Realm.prototype, "level", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.HasMany)(() => profile_model_1.Profile),
    tslib_1.__metadata("design:type", Array)
], Realm.prototype, "profiles", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Realm.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Realm.prototype, "updatedAt", void 0);
exports.Realm = Realm = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'realm' })
], Realm);


/***/ }),
/* 58 */
/***/ ((module) => {

module.exports = require("sequelize-typescript");

/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Profile = exports.DefaultProfileValue = void 0;
const tslib_1 = __webpack_require__(5);
const sequelize_typescript_1 = __webpack_require__(58);
const account_model_1 = __webpack_require__(60);
const realm_model_1 = __webpack_require__(57);
const profile_achievement_model_1 = __webpack_require__(64);
const profile_material_art_model_1 = __webpack_require__(66);
exports.DefaultProfileValue = {
    bio: '',
    avatarUrl: '',
    totalExp: 0,
    streak: 0,
    isActive: true,
};
let Profile = class Profile extends sequelize_typescript_1.Model {
};
exports.Profile = Profile;
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
    }),
    tslib_1.__metadata("design:type", String)
], Profile.prototype, "id", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => account_model_1.Account),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    tslib_1.__metadata("design:type", String)
], Profile.prototype, "accountId", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => account_model_1.Account),
    tslib_1.__metadata("design:type", typeof (_a = typeof account_model_1.Account !== "undefined" && account_model_1.Account) === "function" ? _a : Object)
], Profile.prototype, "account", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => realm_model_1.Realm),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: true,
    }),
    tslib_1.__metadata("design:type", String)
], Profile.prototype, "realmId", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => realm_model_1.Realm),
    tslib_1.__metadata("design:type", typeof (_b = typeof realm_model_1.Realm !== "undefined" && realm_model_1.Realm) === "function" ? _b : Object)
], Profile.prototype, "realm", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    tslib_1.__metadata("design:type", String)
], Profile.prototype, "fullName", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: true,
    }),
    tslib_1.__metadata("design:type", String)
], Profile.prototype, "nickName", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    tslib_1.__metadata("design:type", String)
], Profile.prototype, "bio", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    tslib_1.__metadata("design:type", String)
], Profile.prototype, "avatarUrl", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
        defaultValue: '0',
    }),
    tslib_1.__metadata("design:type", Number)
], Profile.prototype, "totalExp", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: 0,
    }),
    tslib_1.__metadata("design:type", Number)
], Profile.prototype, "streak", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: true,
    }),
    tslib_1.__metadata("design:type", Boolean)
], Profile.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        defaultValue: '',
        allowNull: true,
    }),
    tslib_1.__metadata("design:type", String)
], Profile.prototype, "githubLink", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
        allowNull: false,
    }),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Profile.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
        allowNull: false,
    }),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], Profile.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.HasMany)(() => profile_achievement_model_1.ProfileAchievement),
    tslib_1.__metadata("design:type", Array)
], Profile.prototype, "profileAchievements", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.HasMany)(() => profile_material_art_model_1.ProfileMaterialArt),
    tslib_1.__metadata("design:type", Array)
], Profile.prototype, "profileMaterialArts", void 0);
exports.Profile = Profile = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'profile' })
], Profile);


/***/ }),
/* 60 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Account = void 0;
const tslib_1 = __webpack_require__(5);
const sequelize_typescript_1 = __webpack_require__(58);
const profile_model_1 = __webpack_require__(59);
const types_1 = __webpack_require__(61);
function generateRandomNickName() {
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
    const mainPart = Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
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
function generateFullName() {
    // Chọn họ ngẫu nhiên
    const familyName = familyNames[Math.floor(Math.random() * familyNames.length)];
    // Chọn tên đệm ngẫu nhiên
    const middleName = middleNames[Math.floor(Math.random() * middleNames.length)];
    // Chọn tên chính ngẫu nhiên
    const givenName = givenNames[Math.floor(Math.random() * givenNames.length)];
    // Kết hợp họ, tên đệm, và tên chính
    return `${familyName} ${middleName} ${givenName}`;
}
let Account = class Account extends sequelize_typescript_1.Model {
    static async createProfile(instance) {
        const defaultAccount = {
            ...profile_model_1.DefaultProfileValue,
            nickName: generateRandomNickName(),
            accountId: instance.id,
            fullName: generateFullName(),
        };
        try {
            await profile_model_1.Profile.create(defaultAccount);
        }
        catch (error) {
            console.error('Error creating profile:', error);
        }
    }
};
exports.Account = Account;
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
    }),
    tslib_1.__metadata("design:type", String)
], Account.prototype, "id", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Account.prototype, "email", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Account.prototype, "password", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], Account.prototype, "isVerify", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        defaultValue: types_1.CredentialTypeEnum.NONE,
        type: sequelize_typescript_1.DataType.STRING,
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof types_1.CredentialTypeEnum !== "undefined" && types_1.CredentialTypeEnum) === "function" ? _a : Object)
], Account.prototype, "credentialType", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.HasOne)(() => profile_model_1.Profile),
    tslib_1.__metadata("design:type", typeof (_b = typeof profile_model_1.Profile !== "undefined" && profile_model_1.Profile) === "function" ? _b : Object)
], Account.prototype, "profile", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Account.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], Account.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AfterCreate,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Account]),
    tslib_1.__metadata("design:returntype", Promise)
], Account, "createProfile", null);
exports.Account = Account = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'account' })
], Account);


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
exports.AccountVerifyStatusEnum = exports.CredentialTypeEnum = void 0;
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


/***/ }),
/* 64 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileAchievement = void 0;
const tslib_1 = __webpack_require__(5);
const sequelize_typescript_1 = __webpack_require__(58);
const profile_model_1 = __webpack_require__(59);
const achievement_model_1 = __webpack_require__(65);
let ProfileAchievement = class ProfileAchievement extends sequelize_typescript_1.Model {
};
exports.ProfileAchievement = ProfileAchievement;
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
    }),
    tslib_1.__metadata("design:type", String)
], ProfileAchievement.prototype, "id", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => profile_model_1.Profile),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    tslib_1.__metadata("design:type", String)
], ProfileAchievement.prototype, "profileId", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => profile_model_1.Profile),
    tslib_1.__metadata("design:type", typeof (_a = typeof profile_model_1.Profile !== "undefined" && profile_model_1.Profile) === "function" ? _a : Object)
], ProfileAchievement.prototype, "profile", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => achievement_model_1.Achievement),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    tslib_1.__metadata("design:type", String)
], ProfileAchievement.prototype, "achievementId", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => achievement_model_1.Achievement),
    tslib_1.__metadata("design:type", typeof (_b = typeof achievement_model_1.Achievement !== "undefined" && achievement_model_1.Achievement) === "function" ? _b : Object)
], ProfileAchievement.prototype, "achievement", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], ProfileAchievement.prototype, "createdAt", void 0);
exports.ProfileAchievement = ProfileAchievement = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'profile_achievements' })
], ProfileAchievement);


/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Achievement = void 0;
const tslib_1 = __webpack_require__(5);
const sequelize_typescript_1 = __webpack_require__(58);
const profile_achievement_model_1 = __webpack_require__(64);
let Achievement = class Achievement extends sequelize_typescript_1.Model {
};
exports.Achievement = Achievement;
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
    }),
    tslib_1.__metadata("design:type", String)
], Achievement.prototype, "id", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: true,
    }),
    tslib_1.__metadata("design:type", String)
], Achievement.prototype, "name", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    tslib_1.__metadata("design:type", String)
], Achievement.prototype, "logo", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.HasMany)(() => profile_achievement_model_1.ProfileAchievement),
    tslib_1.__metadata("design:type", Array)
], Achievement.prototype, "profileAchievements", void 0);
exports.Achievement = Achievement = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'achievements' })
], Achievement);


/***/ }),
/* 66 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileMaterialArt = void 0;
const tslib_1 = __webpack_require__(5);
const sequelize_typescript_1 = __webpack_require__(58);
const profile_model_1 = __webpack_require__(59);
const material_art_model_1 = __webpack_require__(67);
let ProfileMaterialArt = class ProfileMaterialArt extends sequelize_typescript_1.Model {
};
exports.ProfileMaterialArt = ProfileMaterialArt;
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
    }),
    tslib_1.__metadata("design:type", String)
], ProfileMaterialArt.prototype, "id", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => profile_model_1.Profile),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    tslib_1.__metadata("design:type", String)
], ProfileMaterialArt.prototype, "profileId", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => profile_model_1.Profile),
    tslib_1.__metadata("design:type", typeof (_a = typeof profile_model_1.Profile !== "undefined" && profile_model_1.Profile) === "function" ? _a : Object)
], ProfileMaterialArt.prototype, "profile", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => material_art_model_1.MaterialArt),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    tslib_1.__metadata("design:type", String)
], ProfileMaterialArt.prototype, "materialArtId", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => material_art_model_1.MaterialArt),
    tslib_1.__metadata("design:type", typeof (_b = typeof material_art_model_1.MaterialArt !== "undefined" && material_art_model_1.MaterialArt) === "function" ? _b : Object)
], ProfileMaterialArt.prototype, "materialArt", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        defaultValue: '0',
    }),
    tslib_1.__metadata("design:type", String)
], ProfileMaterialArt.prototype, "masteryLevel", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], ProfileMaterialArt.prototype, "createdAt", void 0);
exports.ProfileMaterialArt = ProfileMaterialArt = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'profile_material_arts' })
], ProfileMaterialArt);


/***/ }),
/* 67 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MaterialArt = void 0;
const tslib_1 = __webpack_require__(5);
const sequelize_typescript_1 = __webpack_require__(58);
const sect_model_1 = __webpack_require__(68);
const profile_material_art_model_1 = __webpack_require__(66);
let MaterialArt = class MaterialArt extends sequelize_typescript_1.Model {
};
exports.MaterialArt = MaterialArt;
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
    }),
    tslib_1.__metadata("design:type", String)
], MaterialArt.prototype, "id", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => sect_model_1.Sect),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    tslib_1.__metadata("design:type", String)
], MaterialArt.prototype, "sectId", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => sect_model_1.Sect),
    tslib_1.__metadata("design:type", typeof (_a = typeof sect_model_1.Sect !== "undefined" && sect_model_1.Sect) === "function" ? _a : Object)
], MaterialArt.prototype, "sect", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: true,
    }),
    tslib_1.__metadata("design:type", String)
], MaterialArt.prototype, "name", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    tslib_1.__metadata("design:type", String)
], MaterialArt.prototype, "logo", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    tslib_1.__metadata("design:type", String)
], MaterialArt.prototype, "description", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.HasMany)(() => profile_material_art_model_1.ProfileMaterialArt),
    tslib_1.__metadata("design:type", Array)
], MaterialArt.prototype, "profileMaterialArts", void 0);
exports.MaterialArt = MaterialArt = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'material_arts' })
], MaterialArt);


/***/ }),
/* 68 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sect = void 0;
const tslib_1 = __webpack_require__(5);
const sequelize_typescript_1 = __webpack_require__(58);
const material_art_model_1 = __webpack_require__(67);
let Sect = class Sect extends sequelize_typescript_1.Model {
};
exports.Sect = Sect;
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
    }),
    tslib_1.__metadata("design:type", String)
], Sect.prototype, "id", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: true
    }),
    tslib_1.__metadata("design:type", String)
], Sect.prototype, "name", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    tslib_1.__metadata("design:type", String)
], Sect.prototype, "logo", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    tslib_1.__metadata("design:type", String)
], Sect.prototype, "description", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.HasMany)(() => material_art_model_1.MaterialArt),
    tslib_1.__metadata("design:type", Array)
], Sect.prototype, "materialArts", void 0);
exports.Sect = Sect = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'sects' })
], Sect);


/***/ }),
/* 69 */
/***/ ((module) => {

module.exports = require("@nestjs/sequelize");

/***/ }),
/* 70 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(71), exports);
tslib_1.__exportStar(__webpack_require__(72), exports);
tslib_1.__exportStar(__webpack_require__(73), exports);
tslib_1.__exportStar(__webpack_require__(75), exports);
tslib_1.__exportStar(__webpack_require__(76), exports);


/***/ }),
/* 71 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileUploader = void 0;
class FileUploader {
}
exports.FileUploader = FileUploader;


/***/ }),
/* 72 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var FileUploaderModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileUploaderModule = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const file_uploader_service_1 = __webpack_require__(73);
const file_uploader_constants_1 = __webpack_require__(76);
let FileUploaderModule = FileUploaderModule_1 = class FileUploaderModule {
    static forRoot(options) {
        const provider = {
            provide: file_uploader_constants_1.FILE_UPLOADER_OPTIONS_TOKEN,
            useValue: options,
        };
        const fileUploader = {
            provide: file_uploader_constants_1.FILE_UPLOADER_TOKEN,
            useClass: file_uploader_service_1.FileUploaderService,
        };
        return {
            exports: [provider, fileUploader],
            module: FileUploaderModule_1,
            providers: [provider, fileUploader],
        };
    }
    static forRootAsync(options) {
        const fileUploaderProvider = {
            inject: [file_uploader_constants_1.FILE_UPLOADER_MODULE_TOKEN],
            provide: file_uploader_constants_1.FILE_UPLOADER_OPTIONS_TOKEN,
            useFactory: (_options) => options.useFactory,
        };
        const asyncProviders = FileUploaderModule_1.createAsyncProviders(options);
        return {
            module: FileUploaderModule_1,
            imports: [...(options.imports || [])],
            providers: [...asyncProviders, fileUploaderProvider],
            exports: [fileUploaderProvider],
        };
    }
    static createAsyncProviders(options) {
        if (options.useFactory || options.useExisting) {
            return [FileUploaderModule_1.createAsyncOptionsProvider(options)];
        }
        return [
            FileUploaderModule_1.createAsyncOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass,
                inject: options.inject,
            },
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: file_uploader_constants_1.FILE_UPLOADER_MODULE_TOKEN,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        return {
            provide: file_uploader_constants_1.FILE_UPLOADER_MODULE_TOKEN,
            useFactory: async (optionsFactory) => await optionsFactory.createFileUploaderModuleOptions(),
            inject: options.useClass ? [options.useClass] : [],
        };
    }
};
exports.FileUploaderModule = FileUploaderModule;
exports.FileUploaderModule = FileUploaderModule = FileUploaderModule_1 = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], FileUploaderModule);


/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var FileUploaderService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileUploaderService = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const ImageKit = __webpack_require__(74);
const file_uploader_decorator_1 = __webpack_require__(75);
const file_uploader_type_1 = __webpack_require__(71);
const rxjs_1 = __webpack_require__(52);
let FileUploaderService = FileUploaderService_1 = class FileUploaderService {
    constructor(options) {
        this.logger = new common_1.Logger(FileUploaderService_1.name);
        this.initizeUploader(options);
    }
    initizeUploader(options) {
        this.instance = new ImageKit(options);
        this.logger.log('Init uploader instance....');
        console.log('initizeUploader: ', this.instance);
    }
    upload(payload) {
        this.logger.log('Start upload file to image kit....', payload.fileName);
        console.log('initizeUploader payload: ', payload);
        return (0, rxjs_1.from)(this.instance.upload(payload));
    }
};
exports.FileUploaderService = FileUploaderService;
exports.FileUploaderService = FileUploaderService = FileUploaderService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, file_uploader_decorator_1.InjectFileUploaderOptions)()),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof file_uploader_type_1.FileUploaderOptions !== "undefined" && file_uploader_type_1.FileUploaderOptions) === "function" ? _a : Object])
], FileUploaderService);


/***/ }),
/* 74 */
/***/ ((module) => {

module.exports = require("imagekit");

/***/ }),
/* 75 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InjectFileUploaderOptions = InjectFileUploaderOptions;
exports.InjectFileUploader = InjectFileUploader;
const common_1 = __webpack_require__(1);
const file_uploader_constants_1 = __webpack_require__(76);
function InjectFileUploaderOptions() {
    return (0, common_1.Inject)(file_uploader_constants_1.FILE_UPLOADER_OPTIONS_TOKEN);
}
function InjectFileUploader() {
    return (0, common_1.Inject)(file_uploader_constants_1.FILE_UPLOADER_TOKEN);
}


/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FILE_UPLOADER_OPTIONS_TOKEN = exports.FILE_UPLOADER_MODULE_TOKEN = exports.FILE_UPLOADER_TOKEN = void 0;
exports.FILE_UPLOADER_TOKEN = 'FILE_UPLOADER_TOKEN';
exports.FILE_UPLOADER_MODULE_TOKEN = 'FILE_UPLOADER_MODULE_TOKEN';
exports.FILE_UPLOADER_OPTIONS_TOKEN = 'FILE_UPLOADER_OPTIONS_TOKEN';


/***/ }),
/* 77 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(78), exports);
tslib_1.__exportStar(__webpack_require__(79), exports);


/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GlobalRpcExceptionFilter = exports.CustomRpcException = void 0;
const tslib_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(8);
const common_1 = __webpack_require__(1);
const rxjs_1 = __webpack_require__(52);
class CustomRpcException extends microservices_1.RpcException {
    constructor(statusCode, message) {
        super({ statusCode, message });
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.CustomRpcException = CustomRpcException;
let GlobalRpcExceptionFilter = class GlobalRpcExceptionFilter {
    catch(exception, host) {
        return (0, rxjs_1.throwError)(() => ({
            statusCode: exception.statusCode,
            message: exception.message,
        }));
    }
};
exports.GlobalRpcExceptionFilter = GlobalRpcExceptionFilter;
exports.GlobalRpcExceptionFilter = GlobalRpcExceptionFilter = tslib_1.__decorate([
    (0, common_1.Catch)(CustomRpcException)
], GlobalRpcExceptionFilter);


/***/ }),
/* 79 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.throwException = void 0;
const rxjs_1 = __webpack_require__(52);
const rcp_exception_1 = __webpack_require__(78);
const throwException = (code, message) => (0, rxjs_1.throwError)(() => {
    return new rcp_exception_1.CustomRpcException(code, message);
});
exports.throwException = throwException;


/***/ }),
/* 80 */
/***/ ((module) => {

module.exports = require("axios");

/***/ }),
/* 81 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(82), exports);
tslib_1.__exportStar(__webpack_require__(83), exports);
tslib_1.__exportStar(__webpack_require__(84), exports);
tslib_1.__exportStar(__webpack_require__(85), exports);
tslib_1.__exportStar(__webpack_require__(86), exports);


/***/ }),
/* 82 */
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
/* 83 */
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
/* 84 */
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
/* 85 */
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
/* 86 */
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
/* 87 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),
/* 88 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(89), exports);
tslib_1.__exportStar(__webpack_require__(91), exports);
tslib_1.__exportStar(__webpack_require__(90), exports);


/***/ }),
/* 89 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sequelizeModuleOptions = void 0;
const config_1 = __webpack_require__(31);
const configs_1 = __webpack_require__(40);
const database_models_1 = __webpack_require__(90);
exports.sequelizeModuleOptions = {
    imports: [
        config_1.ConfigModule.forRoot({
            load: [configs_1.Configurations],
        }),
    ],
    inject: [config_1.ConfigService],
    useFactory(configService) {
        const configs = configService.get('database');
        return {
            host: configs?.host,
            port: configs?.port,
            dialect: configs?.dialect,
            username: configs?.username,
            password: configs?.password,
            database: configs?.database,
            autoLoadModels: true,
            synchronize: true,
            models: database_models_1.DatabaseModels,
        };
    },
};


/***/ }),
/* 90 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModels = void 0;
const account_1 = __webpack_require__(60);
const achievement_1 = __webpack_require__(65);
const material_art_1 = __webpack_require__(67);
const profile_1 = __webpack_require__(59);
const profile_achievement_1 = __webpack_require__(64);
const profile_material_art_1 = __webpack_require__(66);
const realm_1 = __webpack_require__(57);
const sect_1 = __webpack_require__(68);
exports.DatabaseModels = [
    account_1.Account,
    profile_1.Profile,
    realm_1.Realm,
    material_art_1.MaterialArt,
    achievement_1.Achievement,
    sect_1.Sect,
    profile_achievement_1.ProfileAchievement,
    profile_material_art_1.ProfileMaterialArt,
];


/***/ }),
/* 91 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseConfigModule = exports.DatabaseConfigFeature = void 0;
const tslib_1 = __webpack_require__(5);
const sequelize_1 = __webpack_require__(69);
const database_config_1 = __webpack_require__(89);
const common_1 = __webpack_require__(1);
const database_models_1 = __webpack_require__(90);
exports.DatabaseConfigFeature = Object.freeze(sequelize_1.SequelizeModule.forFeature(database_models_1.DatabaseModels));
let DatabaseConfigModule = class DatabaseConfigModule {
};
exports.DatabaseConfigModule = DatabaseConfigModule;
exports.DatabaseConfigModule = DatabaseConfigModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forRootAsync(database_config_1.sequelizeModuleOptions)],
        exports: [sequelize_1.SequelizeModule.forRootAsync(database_config_1.sequelizeModuleOptions)],
    })
], DatabaseConfigModule);


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