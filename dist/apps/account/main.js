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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const config_1 = __webpack_require__(5);
const configs_1 = __webpack_require__(6);
const database_1 = __webpack_require__(9);
const account_module_1 = __webpack_require__(16);
const bcrypt_1 = __webpack_require__(42);
const jwt_1 = __webpack_require__(44);
const auth_module_1 = __webpack_require__(46);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configs_1.Configurations],
                isGlobal: true,
            }),
            database_1.DatabaseConfigModule,
            account_module_1.AccountModule,
            bcrypt_1.BcryptModule,
            jwt_1.JwtGlobalModule,
            auth_module_1.AuthModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(7), exports);
tslib_1.__exportStar(__webpack_require__(8), exports);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Configurations = void 0;
const Configurations = () => ({
    port: parseInt(process.env['POSTGRES_PORT']) || 3000,
    nodeEnv: process.env['NODE_ENV'],
    saltRounds: parseInt(process.env['SALT_ROUNDS']) || 10,
    jwtSecretKey: process.env['JWT_SECRET_KEY'],
    jwtPrivateKey: process.env['JWT_PRIVATE_KEY'],
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
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(10), exports);
tslib_1.__exportStar(__webpack_require__(14), exports);
tslib_1.__exportStar(__webpack_require__(11), exports);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sequelizeModuleOptions = void 0;
const config_1 = __webpack_require__(5);
const configs_1 = __webpack_require__(6);
const database_models_1 = __webpack_require__(11);
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
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModels = void 0;
const account_1 = __webpack_require__(12);
exports.DatabaseModels = [account_1.Account];


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Account = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_typescript_1 = __webpack_require__(13);
let Account = class Account extends sequelize_typescript_1.Model {
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
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Account.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Account.prototype, "updatedAt", void 0);
exports.Account = Account = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'account' })
], Account);


/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("sequelize-typescript");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseConfigModule = exports.DatabaseConfigFeature = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_1 = __webpack_require__(15);
const database_config_1 = __webpack_require__(10);
const common_1 = __webpack_require__(1);
const database_models_1 = __webpack_require__(11);
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


/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("@nestjs/sequelize");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const account_controller_1 = __webpack_require__(17);
const account_service_1 = __webpack_require__(31);
const database_1 = __webpack_require__(9);
let AccountModule = class AccountModule {
};
exports.AccountModule = AccountModule;
exports.AccountModule = AccountModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        controllers: [account_controller_1.AccountController],
        providers: [account_service_1.AccountService],
        imports: [database_1.DatabaseConfigFeature],
    })
], AccountModule);


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountController = void 0;
const tslib_1 = __webpack_require__(4);
const account_1 = __webpack_require__(18);
const common_1 = __webpack_require__(1);
const microservices_1 = __webpack_require__(25);
const account_2 = __webpack_require__(26);
const account_service_1 = __webpack_require__(31);
let AccountController = class AccountController {
    constructor(accountService) {
        this.accountService = accountService;
    }
    handleSignIn(body) {
        return this.accountService.signIn(body);
    }
    handleSignUp(body) {
        return this.accountService.createAccountDto(body);
    }
};
exports.AccountController = AccountController;
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)(account_2.AuthMsgPattern.SignIn),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof account_1.SignInDto !== "undefined" && account_1.SignInDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AccountController.prototype, "handleSignIn", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)(account_2.AuthMsgPattern.SignUp),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof account_1.CreateAccountDto !== "undefined" && account_1.CreateAccountDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AccountController.prototype, "handleSignUp", null);
exports.AccountController = AccountController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof account_service_1.AccountService !== "undefined" && account_service_1.AccountService) === "function" ? _a : Object])
], AccountController);


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(19), exports);
tslib_1.__exportStar(__webpack_require__(24), exports);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAccountDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(20);
const password_validation_1 = __webpack_require__(21);
const password_match_1 = __webpack_require__(22);
const swagger_1 = __webpack_require__(23);
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
    (0, password_validation_1.IsStrongPassword)(),
    (0, swagger_1.ApiProperty)({
        description: 'Password must be at least 8 characters long and contain at least one number.',
        example: 'vodich123',
    }),
    tslib_1.__metadata("design:type", String)
], CreateAccountDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, password_validation_1.IsStrongPassword)(),
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
/* 20 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IsStrongPasswordConstraint = void 0;
exports.IsStrongPassword = IsStrongPassword;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(20);
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
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IsPasswordMatchConstraint = void 0;
exports.IsPasswordMatch = IsPasswordMatch;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(20);
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
/* 23 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignInDto = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(23);
const class_validator_1 = __webpack_require__(20);
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
/* 25 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(27), exports);
tslib_1.__exportStar(__webpack_require__(30), exports);


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthMsgPattern = void 0;
const module_1 = __webpack_require__(28);
exports.AuthMsgPattern = Object.freeze({
    SignUp: `${module_1.AccountModule.Auth}/SignUp`,
    SignIn: `${module_1.AccountModule.Auth}/SignIn`,
    SignInGithub: `${module_1.AccountModule.Auth}/SignInGitHub`,
    SignInFacebook: `${module_1.AccountModule.Auth}/SignInFacebook`,
    AccessToken: `${module_1.AccountModule.Auth}/RefreshToken`,
    RefreshToken: `${module_1.AccountModule.Auth}/AccessToken`,
    Update: `${module_1.AccountModule.Auth}/Update`,
});


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountModule = void 0;
const __1 = __webpack_require__(29);
exports.AccountModule = Object.freeze({
    Auth: `${__1.MicroServiceName.Account}/Auth`,
    Profile: `${__1.MicroServiceName.Account}/Profile`,
});


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MicroServiceName = void 0;
exports.MicroServiceName = Object.freeze({
    Account: 'AccountService',
    Guild: 'GuildService',
    Scripture: 'ScriptureService',
});


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileMsgPattern = void 0;
const module_1 = __webpack_require__(28);
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
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const sequelize_1 = __webpack_require__(15);
const account_1 = __webpack_require__(12);
const rxjs_1 = __webpack_require__(32);
const bcrypt_service_1 = __webpack_require__(33);
const exception_1 = __webpack_require__(35);
const auth_service_1 = __webpack_require__(38);
const axios_1 = __webpack_require__(41);
let AccountService = class AccountService {
    constructor(userModel, authService, bcryptService) {
        this.userModel = userModel;
        this.authService = authService;
        this.bcryptService = bcryptService;
    }
    createAccountDto({ email, password }) {
        return (0, rxjs_1.from)(this.userModel.findOne({ where: { email } })).pipe((0, rxjs_1.switchMap)((existingUser) => {
            if (existingUser) {
                return (0, exception_1.throwException)(common_1.HttpStatus.BAD_REQUEST, 'Email already exist!');
            }
            return (0, rxjs_1.from)(this.bcryptService.hashPassword(password)).pipe((0, rxjs_1.switchMap)((hashedPassword) => (0, rxjs_1.from)(this.userModel.create({
                email,
                password: hashedPassword,
            })).pipe((0, rxjs_1.map)((response) => {
                const result = response.toJSON();
                delete result.password;
                return result;
            }), (0, rxjs_1.switchMap)((data) => (0, rxjs_1.of)({
                message: 'Account created successfully!',
                data,
            })))), (0, rxjs_1.catchError)((error) => (0, exception_1.throwException)(common_1.HttpStatus.INTERNAL_SERVER_ERROR, `Database error: ${error.message}`)));
        }));
    }
    signIn({ email, password }) {
        return (0, rxjs_1.from)(this.userModel.findOne({ where: { email } })).pipe((0, rxjs_1.catchError)((error) => {
            return (0, exception_1.throwException)(common_1.HttpStatus.INTERNAL_SERVER_ERROR, `Database error: ${error.message}`);
        }), (0, rxjs_1.switchMap)((existingUser) => {
            if (existingUser) {
                return this.bcryptService
                    .comparePassword(password, existingUser.password)
                    .pipe((0, rxjs_1.switchMap)((isMatch) => {
                    common_1.Logger.log('Is Matched: ', isMatch);
                    if (!isMatch) {
                        return (0, exception_1.throwException)(common_1.HttpStatus.BAD_REQUEST, 'Password is incorrect');
                    }
                    const result = existingUser.toJSON();
                    delete result.password;
                    return (0, rxjs_1.from)(this.authService.generateFullTokens(result)).pipe((0, rxjs_1.tap)((r) => console.log('Genereated: ', r)), (0, rxjs_1.map)((token) => ({
                        message: 'Sign in successfully!',
                        data: {
                            ...result,
                            token,
                        },
                    })));
                }));
            }
            return (0, exception_1.throwException)(axios_1.HttpStatusCode.NotFound, 'User not found');
        }));
    }
};
exports.AccountService = AccountService;
exports.AccountService = AccountService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, sequelize_1.InjectModel)(account_1.Account)),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object, typeof (_b = typeof bcrypt_service_1.BcryptService !== "undefined" && bcrypt_service_1.BcryptService) === "function" ? _b : Object])
], AccountService);


/***/ }),
/* 32 */
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BcryptService = void 0;
const tslib_1 = __webpack_require__(4);
const config_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const bcrypt = tslib_1.__importStar(__webpack_require__(34));
const rxjs_1 = __webpack_require__(32);
let BcryptService = class BcryptService {
    constructor(configService) {
        this.configService = configService;
    }
    /**
     * Hash a plain text password.
     * @param plainPassword - The plain text password.
     * @returns The hashed password.
     */
    hashPassword(plainPassword) {
        common_1.Logger.log("this.configService.get('saltRounds') as number: ", this.configService.get('saltRounds'));
        return (0, rxjs_1.from)(bcrypt.hash(plainPassword, this.configService.get('saltRounds')));
    }
    /**
     * Compare a plain text password with a hashed password.
     * @param plainPassword - The plain text password.
     * @param hashedPassword - The hashed password.
     * @returns True if they match, false otherwise.
     */
    comparePassword(plainPassword, hashedPassword) {
        return (0, rxjs_1.from)(bcrypt.compare(plainPassword, hashedPassword));
    }
};
exports.BcryptService = BcryptService;
exports.BcryptService = BcryptService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], BcryptService);


/***/ }),
/* 34 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(36), exports);
tslib_1.__exportStar(__webpack_require__(37), exports);


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GlobalRpcExceptionFilter = exports.CustomRpcException = void 0;
const tslib_1 = __webpack_require__(4);
const microservices_1 = __webpack_require__(25);
const common_1 = __webpack_require__(1);
const rxjs_1 = __webpack_require__(32);
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
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.throwException = void 0;
const rxjs_1 = __webpack_require__(32);
const rcp_exception_1 = __webpack_require__(36);
const throwException = (code, message) => (0, rxjs_1.throwError)(() => {
    return new rcp_exception_1.CustomRpcException(code, message);
});
exports.throwException = throwException;


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const config_1 = __webpack_require__(5);
const jwt_1 = __webpack_require__(39);
const rxjs_1 = __webpack_require__(32);
const operators_1 = __webpack_require__(40);
const exception_1 = __webpack_require__(35);
let AuthService = class AuthService {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
    }
    // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
    generateFullTokens(payload) {
        return (0, rxjs_1.of)(payload).pipe((0, operators_1.map)((payload) => ({
            accessToken: this.jwtService.sign(payload, {
                expiresIn: '2m',
            }),
        })), (0, operators_1.tap)((token) => common_1.Logger.log('accessToken: ', token?.accessToken)), (0, operators_1.map)(({ accessToken }) => ({
            accessToken,
            refreshToken: this.jwtService.sign(payload, {
                expiresIn: '7d',
            }),
        })), (0, operators_1.tap)((token) => common_1.Logger.log('refreshToken: ', token.refreshToken)), (0, operators_1.catchError)((error) => (0, exception_1.throwException)(400, `Token generation failed: ${error.message}`)));
    }
    // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
    generateAccessTokens(payload) {
        return (0, rxjs_1.of)(payload).pipe((0, operators_1.map)((payload) => ({
            accessToken: this.jwtService.sign(payload, {
                expiresIn: '2m',
            }),
        })), (0, operators_1.catchError)((error) => (0, exception_1.throwException)(400, `Token generation failed: ${error.message}`)));
    }
    verifyToken(token) {
        return (0, rxjs_1.from)(this.jwtService.verifyAsync(token)).pipe((0, operators_1.catchError)(() => (0, exception_1.throwException)(400, `'Invalid or expired token`)));
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], AuthService);


/***/ }),
/* 39 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 40 */
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),
/* 41 */
/***/ ((module) => {

module.exports = require("axios");

/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(43), exports);


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BcryptModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const bcrypt_service_1 = __webpack_require__(33);
const config_1 = __webpack_require__(5);
const configs_1 = __webpack_require__(6);
let BcryptModule = class BcryptModule {
};
exports.BcryptModule = BcryptModule;
exports.BcryptModule = BcryptModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configs_1.Configurations],
                isGlobal: true,
            }),
        ],
        providers: [bcrypt_service_1.BcryptService],
        exports: [bcrypt_service_1.BcryptService],
    })
], BcryptModule);


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(45), exports);


/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtGlobalModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(39);
const config_1 = __webpack_require__(5);
const configs_1 = __webpack_require__(6);
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
/* 46 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const auth_service_1 = __webpack_require__(38);
const auth_controller_1 = __webpack_require__(47);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [auth_service_1.AuthService],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);


/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
let AuthController = class AuthController {
};
exports.AuthController = AuthController;
exports.AuthController = AuthController = tslib_1.__decorate([
    (0, common_1.Controller)('auth')
], AuthController);


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
const app_module_1 = __webpack_require__(3);
const microservices_1 = __webpack_require__(25);
const exception_1 = __webpack_require__(35);
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.NATS,
        options: {
            servers: [process.env.NATS_URL],
        },
    });
    app.useGlobalFilters(new exception_1.GlobalRpcExceptionFilter());
    await app.listen();
    common_1.Logger.log('Account Microservice is Running!');
}
bootstrap();

})();

/******/ })()
;
//# sourceMappingURL=main.js.map