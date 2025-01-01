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
const profile_module_1 = __webpack_require__(32);
const nats_client_1 = __webpack_require__(34);
const configs_1 = __webpack_require__(36);
const config_1 = __webpack_require__(39);
const jwt_1 = __webpack_require__(40);
const jwt_2 = __webpack_require__(29);
const core_1 = __webpack_require__(2);
const guard_1 = __webpack_require__(27);
const cache_health_module_1 = __webpack_require__(42);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            profile_module_1.ProfileModule,
            jwt_1.JwtGlobalModule,
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
            jwt_2.JwtService,
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
const throttler_1 = __webpack_require__(31);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [auth_controller_1.AuthController],
        imports: [
            throttler_1.ThrottlerModule.forRoot([
                {
                    name: 'short',
                    ttl: 1000,
                    limit: 3,
                },
                {
                    name: 'medium',
                    ttl: 10000,
                    limit: 500,
                },
                {
                    name: 'long',
                    ttl: 60000,
                    limit: 10000,
                },
            ]),
        ],
    })
], AuthModule);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const microservices_1 = __webpack_require__(8);
const swagger_1 = __webpack_require__(3);
const account_1 = __webpack_require__(9);
const account_2 = __webpack_require__(14);
const guard_1 = __webpack_require__(27);
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
    (0, common_1.Post)('authenticate'),
    (0, guard_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Sign in with access token' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof account_2.AuthenticateDto !== "undefined" && account_2.AuthenticateDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "authenticate", null);
tslib_1.__decorate([
    (0, common_1.Post)('oauth'),
    (0, guard_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Sign in with github or facebook' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof account_2.SignInOauth !== "undefined" && account_2.SignInOauth) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "signInOauth", null);
tslib_1.__decorate([
    (0, common_1.Post)('signUp'),
    (0, guard_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Sign up with email and password' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof account_2.CreateAccountDto !== "undefined" && account_2.CreateAccountDto) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "signUp", null);
tslib_1.__decorate([
    (0, common_1.Post)('verify'),
    (0, guard_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Verify email after sign up by email' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof account_2.VerifyEmailOtp !== "undefined" && account_2.VerifyEmailOtp) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "verifyEmail", null);
tslib_1.__decorate([
    (0, common_1.Post)('sendOtp'),
    (0, guard_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Send otp to email for verify email' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof account_2.ResendVerifyEmail !== "undefined" && account_2.ResendVerifyEmail) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "sendOtpVerify", null);
tslib_1.__decorate([
    (0, common_1.Patch)('changePassword'),
    (0, swagger_1.ApiOperation)({ summary: 'Change password only for user login by email' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof account_2.ChangePasswordDto !== "undefined" && account_2.ChangePasswordDto) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "changePassword", null);
tslib_1.__decorate([
    (0, common_1.Patch)('deactivate'),
    (0, swagger_1.ApiOperation)({ summary: 'deactivate account only for user login by email' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof account_2.DeactivateDto !== "undefined" && account_2.DeactivateDto) === "function" ? _j : Object]),
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
    AccessToken: `${module_1.AccountModule.Auth}/RefreshToken`,
    RefreshToken: `${module_1.AccountModule.Auth}/AccessToken`,
    Update: `${module_1.AccountModule.Auth}/Update`,
    ChangePassword: `${module_1.AccountModule.Profile}/ChangePassword`,
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
tslib_1.__exportStar(__webpack_require__(25), exports);
tslib_1.__exportStar(__webpack_require__(26), exports);


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
        description: 'Otp use for verify email',
        example: '123456',
    }),
    tslib_1.__metadata("design:type", String)
], VerifyEmailOtp.prototype, "otp", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({
        description: 'Email use for verify email',
        example: 'tangkinhcode@example.com',
    }),
    tslib_1.__metadata("design:type", String)
], VerifyEmailOtp.prototype, "email", void 0);


/***/ }),
/* 18 */
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
/* 21 */
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
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAccountDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(16);
const password_1 = __webpack_require__(23);
const password_match_1 = __webpack_require__(24);
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
/* 23 */
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
/* 24 */
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
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChangePasswordDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(16);
const password_1 = __webpack_require__(23);
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
/* 26 */
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
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(28), exports);
tslib_1.__exportStar(__webpack_require__(30), exports);


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AuthGuard_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthGuard = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(29);
let AuthGuard = AuthGuard_1 = class AuthGuard {
    constructor(reflector, jwtService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(AuthGuard_1.name);
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
            const decoded = this.jwtService.verify(token);
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
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthGuard);


/***/ }),
/* 29 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = __webpack_require__(1);
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;


/***/ }),
/* 31 */
/***/ ((module) => {

module.exports = require("@nestjs/throttler");

/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileModule = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const profile_controller_1 = __webpack_require__(33);
let ProfileModule = class ProfileModule {
};
exports.ProfileModule = ProfileModule;
exports.ProfileModule = ProfileModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [profile_controller_1.ProfileController],
    })
], ProfileModule);


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileController = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(3);
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
exports.ProfileController = ProfileController = tslib_1.__decorate([
    (0, common_1.Controller)('profile')
], ProfileController);


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(35), exports);


/***/ }),
/* 35 */
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
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(37), exports);
tslib_1.__exportStar(__webpack_require__(38), exports);


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Configurations = void 0;
const Configurations = () => ({
    port: parseInt(process.env['POSTGRES_PORT']) || 3000,
    nodeEnv: process.env['NODE_ENV'],
    saltRounds: parseInt(process.env['SALT_ROUNDS']) || 10,
    jwtSecretKey: process.env['JWT_SECRET_KEY'],
    jwtPrivateKey: process.env['JWT_PRIVATE_KEY'],
    github: {
        client_id: process.env['GITHUB_CLIENT_ID'],
        client_secret: process.env['GITHUB_CLIENT_SECRET'],
        url: process.env['GITHUB_AUTHORIZE_URL'],
        userInfoUrl: process.env['GITHUB_USER_INFO_URL'],
    },
    google: {
        clientId: process.env['GOOGLE_CLIENT_ID'],
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
});
exports.Configurations = Configurations;


/***/ }),
/* 39 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(41), exports);


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtGlobalModule = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(29);
const config_1 = __webpack_require__(39);
const configs_1 = __webpack_require__(36);
let JwtGlobalModule = class JwtGlobalModule {
};
exports.JwtGlobalModule = JwtGlobalModule;
exports.JwtGlobalModule = JwtGlobalModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                imports: [
                    config_1.ConfigModule.forRoot({
                        load: [configs_1.Configurations],
                        isGlobal: true,
                    }),
                ],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('jwtSecretKey'),
                    privateKey: configService.get('jwtPrivateKey'),
                    signOptions: {
                        algorithm: 'HS256',
                    },
                }),
            }),
        ],
        exports: [jwt_1.JwtModule],
    })
], JwtGlobalModule);


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheHealthModule = void 0;
const tslib_1 = __webpack_require__(5);
const cache_manager_1 = __webpack_require__(43);
const common_1 = __webpack_require__(1);
const cache_health_controller_1 = __webpack_require__(52);
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
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(44), exports);
tslib_1.__exportStar(__webpack_require__(47), exports);
tslib_1.__exportStar(__webpack_require__(50), exports);


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheManagerModule = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const cache_listener_service_1 = __webpack_require__(45);
const ioredis_1 = __webpack_require__(48);
const cache_manager_service_1 = __webpack_require__(50);
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
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var CacheListener_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheListener = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const event_emitter_1 = __webpack_require__(46);
const cache_message_1 = __webpack_require__(47);
const ioredis_1 = __webpack_require__(48);
const ioredis_2 = tslib_1.__importDefault(__webpack_require__(49));
let CacheListener = CacheListener_1 = class CacheListener {
    constructor(redis) {
        this.redis = redis;
        this.logger = new common_1.Logger(CacheListener_1.name);
    }
    async handleCreateEvent(data) {
        await this.redis.set(data.key, JSON.stringify(data.value));
        await this.redis.expire(data.key, data?.ttl || 120); // 60 giây
        this.logger.log(`Handled create cache for key: ${data.key}`);
    }
    async handleUpdateEvent(data) {
        await this.redis.set(data.key, data.value);
        this.logger.log(`Handled update cache for key: ${data.key}`);
    }
    async handleDeleteEvent(key) {
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
/* 46 */
/***/ ((module) => {

module.exports = require("@nestjs/event-emitter");

/***/ }),
/* 47 */
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
/* 48 */
/***/ ((module) => {

module.exports = require("@nestjs-modules/ioredis");

/***/ }),
/* 49 */
/***/ ((module) => {

module.exports = require("ioredis");

/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var CacheManagerService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheManagerService = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const ioredis_1 = tslib_1.__importDefault(__webpack_require__(49));
const ioredis_2 = __webpack_require__(48);
const rxjs_1 = __webpack_require__(51);
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
/* 51 */
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),
/* 52 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheHealthController = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const cache_manager_1 = __webpack_require__(43);
const guard_1 = __webpack_require__(27);
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