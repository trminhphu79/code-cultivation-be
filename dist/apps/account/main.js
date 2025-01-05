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
const account_module_1 = __webpack_require__(21);
const bcrypt_1 = __webpack_require__(65);
const event_emitter_1 = __webpack_require__(67);
const cache_manager_1 = __webpack_require__(47);
const auth_module_1 = __webpack_require__(70);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            bcrypt_1.BcryptModule,
            account_module_1.AccountModule,
            config_1.ConfigModule.forRoot({
                load: [configs_1.Configurations],
                isGlobal: true,
            }),
            cache_manager_1.CacheManagerModule,
            database_1.DatabaseConfigModule,
            event_emitter_1.GlobalEventEmitterModule,
        ],
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
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(10), exports);
tslib_1.__exportStar(__webpack_require__(19), exports);
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
const profile_1 = __webpack_require__(14);
const realm_1 = __webpack_require__(15);
exports.DatabaseModels = [account_1.Account, profile_1.Profile, realm_1.Realm];


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Account = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_typescript_1 = __webpack_require__(13);
const profile_model_1 = __webpack_require__(14);
const types_1 = __webpack_require__(16);
let Account = class Account extends sequelize_typescript_1.Model {
    static async createProfile(instance) {
        return { ...profile_model_1.DefaultProfileValue, accountId: instance.id };
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
/* 13 */
/***/ ((module) => {

module.exports = require("sequelize-typescript");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Profile = exports.DefaultProfileValue = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_typescript_1 = __webpack_require__(13);
const account_model_1 = __webpack_require__(12);
const realm_model_1 = __webpack_require__(15);
exports.DefaultProfileValue = {
    fullName: 'Vô danh',
    nickName: 'unknown',
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
exports.Profile = Profile = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'profile' })
], Profile);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Realm = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_typescript_1 = __webpack_require__(13);
const profile_model_1 = __webpack_require__(14);
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
        allowNull: false,
    }),
    tslib_1.__metadata("design:type", String)
], Realm.prototype, "name", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    tslib_1.__metadata("design:type", String)
], Realm.prototype, "description", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.HasMany)(() => profile_model_1.Profile),
    tslib_1.__metadata("design:type", Array)
], Realm.prototype, "profiles", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
        allowNull: false,
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Realm.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
        allowNull: false,
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Realm.prototype, "updatedAt", void 0);
exports.Realm = Realm = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'realm' })
], Realm);


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(17), exports);
tslib_1.__exportStar(__webpack_require__(18), exports);


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 18 */
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
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseConfigModule = exports.DatabaseConfigFeature = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_1 = __webpack_require__(20);
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
/* 20 */
/***/ ((module) => {

module.exports = require("@nestjs/sequelize");

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const account_controller_1 = __webpack_require__(22);
const account_service_1 = __webpack_require__(44);
const database_1 = __webpack_require__(9);
const mailer_1 = __webpack_require__(58);
const jwt_1 = __webpack_require__(46);
const config_1 = __webpack_require__(5);
const configs_1 = __webpack_require__(6);
let AccountModule = class AccountModule {
};
exports.AccountModule = AccountModule;
exports.AccountModule = AccountModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        controllers: [account_controller_1.AccountController],
        providers: [account_service_1.AccountService],
        imports: [
            database_1.DatabaseConfigFeature,
            mailer_1.MailerModule,
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
        ],
        exports: [account_service_1.AccountService],
    })
], AccountModule);


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const microservices_1 = __webpack_require__(23);
const account_1 = __webpack_require__(24);
const account_2 = __webpack_require__(39);
const account_service_1 = __webpack_require__(44);
let AccountController = class AccountController {
    constructor(accountService) {
        this.accountService = accountService;
    }
    handleChangePassword(body) {
        return this.accountService.handleChangePassword(body);
    }
    handleDeactivate(body) {
        return this.accountService.handleDeactivate(body);
    }
};
exports.AccountController = AccountController;
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)(account_2.AuthMsgPattern.ChangePassword),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof account_1.ChangePasswordDto !== "undefined" && account_1.ChangePasswordDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AccountController.prototype, "handleChangePassword", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)(account_2.AuthMsgPattern.Deactivate),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof account_1.DeactivateDto !== "undefined" && account_1.DeactivateDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AccountController.prototype, "handleDeactivate", null);
exports.AccountController = AccountController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof account_service_1.AccountService !== "undefined" && account_service_1.AccountService) === "function" ? _a : Object])
], AccountController);


/***/ }),
/* 23 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(25), exports);
tslib_1.__exportStar(__webpack_require__(28), exports);
tslib_1.__exportStar(__webpack_require__(29), exports);
tslib_1.__exportStar(__webpack_require__(30), exports);
tslib_1.__exportStar(__webpack_require__(31), exports);
tslib_1.__exportStar(__webpack_require__(32), exports);
tslib_1.__exportStar(__webpack_require__(33), exports);
tslib_1.__exportStar(__webpack_require__(34), exports);
tslib_1.__exportStar(__webpack_require__(37), exports);
tslib_1.__exportStar(__webpack_require__(38), exports);


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignInDto = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(26);
const class_validator_1 = __webpack_require__(27);
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
/* 26 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 27 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResendVerifyEmail = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(26);
const class_validator_1 = __webpack_require__(27);
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
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeactivateDto = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(26);
const class_validator_1 = __webpack_require__(27);
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
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VerifyEmailOtp = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(26);
const class_validator_1 = __webpack_require__(27);
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
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthenticateDto = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(26);
const class_validator_1 = __webpack_require__(27);
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
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RefreshTokenDto = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(26);
const class_validator_1 = __webpack_require__(27);
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
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignInOauth = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(26);
const class_validator_1 = __webpack_require__(27);
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
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAccountDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(27);
const password_1 = __webpack_require__(35);
const password_match_1 = __webpack_require__(36);
const swagger_1 = __webpack_require__(26);
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
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IsStrongPasswordConstraint = void 0;
exports.IsStrongPassword = IsStrongPassword;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(27);
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
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IsPasswordMatchConstraint = void 0;
exports.IsPasswordMatch = IsPasswordMatch;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(27);
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
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateProfileDto = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(26);
const class_validator_1 = __webpack_require__(27);
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
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChangePasswordDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(27);
const password_1 = __webpack_require__(35);
const swagger_1 = __webpack_require__(26);
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
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(40), exports);
tslib_1.__exportStar(__webpack_require__(43), exports);


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthMsgPattern = void 0;
const module_1 = __webpack_require__(41);
exports.AuthMsgPattern = Object.freeze({
    SignUp: `${module_1.AccountModule.Auth}/SignUp`,
    SignIn: `${module_1.AccountModule.Auth}/SignIn`,
    SignInOauth: `${module_1.AccountModule.Auth}/SignInOauth`,
    Authenticate: `${module_1.AccountModule.Auth}/Authenticate`,
    AccessToken: `${module_1.AccountModule.Auth}/AccessToken`,
    RefreshToken: `${module_1.AccountModule.Auth}/RefreshToken`,
    Update: `${module_1.AccountModule.Auth}/Update`,
    ChangePassword: `${module_1.AccountModule.Profile}/ChangePassword`,
    Deactivate: `${module_1.AccountModule.Profile}/Deactivate`,
    GetCache: `${module_1.AccountModule.Auth}/GetCache`,
    VerifyEmail: `${module_1.AccountModule.Auth}/VerifyEmail`,
    SendOtpVerifyEmail: `${module_1.AccountModule.Auth}/SendOtpVerifyEmail`,
});


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountModule = void 0;
const __1 = __webpack_require__(42);
exports.AccountModule = Object.freeze({
    Auth: `${__1.MicroServiceName.Account}/Auth`,
    Profile: `${__1.MicroServiceName.Account}/Profile`,
});


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MicroServiceName = void 0;
exports.MicroServiceName = Object.freeze({
    Account: 'AccountService',
    Guild: 'GuildService',
    Scripture: 'ScriptureService',
});


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileMsgPattern = void 0;
const module_1 = __webpack_require__(41);
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
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AccountService_1;
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const event_emitter_1 = __webpack_require__(45);
const jwt_1 = __webpack_require__(46);
const sequelize_1 = __webpack_require__(20);
const config_1 = __webpack_require__(5);
const cache_manager_1 = __webpack_require__(47);
const exception_1 = __webpack_require__(55);
const mailer_1 = __webpack_require__(58);
const account_1 = __webpack_require__(12);
const profile_1 = __webpack_require__(14);
const types_1 = __webpack_require__(16);
const rxjs_1 = __webpack_require__(54);
const bcrypt_service_1 = __webpack_require__(62);
const axios_1 = __webpack_require__(64);
let AccountService = AccountService_1 = class AccountService {
    constructor(profileModel, accountModel, jwtService, eventEmitter, mailerService, bcryptService, configService, cacheService) {
        this.profileModel = profileModel;
        this.accountModel = accountModel;
        this.jwtService = jwtService;
        this.eventEmitter = eventEmitter;
        this.mailerService = mailerService;
        this.bcryptService = bcryptService;
        this.configService = configService;
        this.cacheService = cacheService;
        this.logger = new common_1.Logger(AccountService_1.name);
        this.jwtConfig = this.configService.get('jwt');
    }
    handleChangePassword(body) {
        return (0, rxjs_1.of)({ message: 'Not impelemnted!!' });
    }
    handleDeactivate(body) {
        return (0, rxjs_1.of)({ message: 'Not impelemnted!!' });
    }
    handleVerifyEmail(payload) {
        return (0, rxjs_1.from)(this.jwtService.verifyAsync(payload.token, {
            secret: this.jwtConfig?.secret,
        })).pipe((0, rxjs_1.catchError)(() => {
            return (0, exception_1.throwException)(axios_1.HttpStatusCode.BadRequest, 'Token xác thực tài khoản đã hết hạn, xin vui lòng thử lại.');
        }), (0, rxjs_1.switchMap)((source) => {
            const key = `${types_1.AccountVerifyStatusEnum.UNVERIFY}#${source.email}`;
            return this.cacheService.get(key).pipe((0, rxjs_1.switchMap)((response) => {
                if (!response) {
                    return (0, exception_1.throwException)(axios_1.HttpStatusCode.BadRequest, 'Token xác thực tài khoản đã hết hạn, xin vui lòng thử lại.');
                }
                if (payload?.token !== response?.token) {
                    return (0, exception_1.throwException)(axios_1.HttpStatusCode.BadRequest, 'Có lỗi xảy ra trong quá trình xác thực, xin vui lòng thử lại.');
                }
                return this.accountModel.update({ isVerify: true }, { where: { email: response.email } });
            }), (0, rxjs_1.tap)(() => {
                this.removeVerifyTokenCache(source.email);
            }));
        }), (0, rxjs_1.map)(() => ({
            data: true,
            message: 'Tài khoản đã được xác thực thành công.',
        })));
    }
    handleCreateAccount({ password, email }) {
        this.logger.log('handleCreateAccount...', email);
        return this.bcryptService.hashPassword(password).pipe((0, rxjs_1.switchMap)((hashPassword) => (0, rxjs_1.from)(this.accountModel.create({
            email,
            password: hashPassword,
        })).pipe((0, rxjs_1.map)((response) => response.toJSON()), (0, rxjs_1.tap)((result) => {
            const key = this.getCacheKey(email);
            this.eventEmitter.emit(cache_manager_1.CacheMessageAction.Create, {
                key,
                value: { ...result, profile: profile_1.DefaultProfileValue },
                ttl: '7d',
            });
            this.handleSendTokenVerifyEmail(result?.email);
        }))), (0, rxjs_1.map)(() => ({
            message: `Đường dẫn xác thực tài khoản đã được gửi đến email: ${email}. Vui lòng kiểm tra hộp thư để hoàn tất quá trình xác thực tài khoản.`,
        })));
    }
    handleSendTokenVerifyEmail(email) {
        const token = this.generateTokenVerify(email);
        const verificationLink = this.getVerifyLink(token);
        this.logger.log(`handleSendTokenVerifyEmail ${token}`);
        this.mailerService
            .sendOtpVerifyEmail(email, verificationLink)
            .pipe((0, rxjs_1.tap)(() => {
            this.logger.log(`Verification email sent to ${email}`);
            this.eventEmitter.emit(cache_manager_1.CacheMessageAction.Create, {
                key: `${types_1.AccountVerifyStatusEnum.UNVERIFY}#${email}`,
                value: {
                    token,
                    email,
                },
                ttl: 180, // 3 phut
            });
        }))
            .subscribe();
    }
    handleCreateProfile(body, accountId) {
        return (0, rxjs_1.from)(this.profileModel.create({
            ...body,
            accountId,
        }));
    }
    getCacheKey(email, credentialType = types_1.CredentialTypeEnum.NONE) {
        return `ACCOUNT#${email}#${credentialType}`;
    }
    generateTokenVerify(email) {
        const code = new Date().getTime();
        const token = this.jwtService.sign({ email, code }, { expiresIn: '3m' });
        return token;
    }
    getVerifyLink(token) {
        const verificationLink = `${this.configService.get('verifyRedirect')}?token=${token}`;
        return verificationLink;
    }
    removeVerifyTokenCache(email) {
        const removeKey = `${types_1.AccountVerifyStatusEnum.UNVERIFY}#${email}`;
        this.eventEmitter.emit(cache_manager_1.CacheMessageAction.Delete, removeKey);
    }
    /**
     *
     * @param email
     * @param credentialType
     * @returns Return the current cached user if it exists; otherwise, fetch it from the database.
     */
    getExistingAccount(email, credentialType = types_1.CredentialTypeEnum.NONE) {
        const cacheKey = this.getCacheKey(email, credentialType);
        return this.cacheService.get(cacheKey).pipe((0, rxjs_1.switchMap)((cacheData) => {
            if (cacheData) {
                return (0, rxjs_1.of)(cacheData);
            }
            return (0, rxjs_1.from)(this.accountModel.findOne({
                where: { email, credentialType },
                include: [
                    {
                        association: 'profile',
                        required: false, // Set to true if the profile must exist
                    },
                ],
            })).pipe((0, rxjs_1.map)((response) => response?.toJSON?.() || null));
        }));
    }
};
exports.AccountService = AccountService;
exports.AccountService = AccountService = AccountService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, sequelize_1.InjectModel)(profile_1.Profile)),
    tslib_1.__param(1, (0, sequelize_1.InjectModel)(account_1.Account)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof event_emitter_1.EventEmitter2 !== "undefined" && event_emitter_1.EventEmitter2) === "function" ? _b : Object, typeof (_c = typeof mailer_1.EmailService !== "undefined" && mailer_1.EmailService) === "function" ? _c : Object, typeof (_d = typeof bcrypt_service_1.BcryptService !== "undefined" && bcrypt_service_1.BcryptService) === "function" ? _d : Object, typeof (_e = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _e : Object, typeof (_f = typeof cache_manager_1.CacheManagerService !== "undefined" && cache_manager_1.CacheManagerService) === "function" ? _f : Object])
], AccountService);


/***/ }),
/* 45 */
/***/ ((module) => {

module.exports = require("@nestjs/event-emitter");

/***/ }),
/* 46 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(48), exports);
tslib_1.__exportStar(__webpack_require__(50), exports);
tslib_1.__exportStar(__webpack_require__(53), exports);


/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheManagerModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const cache_listener_service_1 = __webpack_require__(49);
const ioredis_1 = __webpack_require__(51);
const cache_manager_service_1 = __webpack_require__(53);
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
/* 49 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var CacheListener_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheListener = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const event_emitter_1 = __webpack_require__(45);
const cache_message_1 = __webpack_require__(50);
const ioredis_1 = __webpack_require__(51);
const ioredis_2 = tslib_1.__importDefault(__webpack_require__(52));
let CacheListener = CacheListener_1 = class CacheListener {
    constructor(redis) {
        this.redis = redis;
        this.logger = new common_1.Logger(CacheListener_1.name);
    }
    async handleCreateEvent(data) {
        await this.redis.set(data.key, JSON.stringify(data.value));
        await this.redis.expire(data.key, data?.ttl || 120); // 60 giây
        this.logger.log(`Handled create cache for key: ${data.key}`);
        console.log(`Handled create cache for key: ${data.key} and value: `, JSON.stringify(data.value));
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
/* 50 */
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
/* 51 */
/***/ ((module) => {

module.exports = require("@nestjs-modules/ioredis");

/***/ }),
/* 52 */
/***/ ((module) => {

module.exports = require("ioredis");

/***/ }),
/* 53 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var CacheManagerService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheManagerService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const ioredis_1 = tslib_1.__importDefault(__webpack_require__(52));
const ioredis_2 = __webpack_require__(51);
const rxjs_1 = __webpack_require__(54);
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
/* 54 */
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(56), exports);
tslib_1.__exportStar(__webpack_require__(57), exports);


/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GlobalRpcExceptionFilter = exports.CustomRpcException = void 0;
const tslib_1 = __webpack_require__(4);
const microservices_1 = __webpack_require__(23);
const common_1 = __webpack_require__(1);
const rxjs_1 = __webpack_require__(54);
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
/* 57 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.throwException = void 0;
const rxjs_1 = __webpack_require__(54);
const rcp_exception_1 = __webpack_require__(56);
const throwException = (code, message) => (0, rxjs_1.throwError)(() => {
    return new rcp_exception_1.CustomRpcException(code, message);
});
exports.throwException = throwException;


/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(59), exports);
tslib_1.__exportStar(__webpack_require__(60), exports);


/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MailerModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const mailer_service_1 = __webpack_require__(60);
const config_1 = __webpack_require__(5);
const configs_1 = __webpack_require__(6);
let MailerModule = class MailerModule {
};
exports.MailerModule = MailerModule;
exports.MailerModule = MailerModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configs_1.Configurations],
                isGlobal: true,
            }),
        ],
        providers: [mailer_service_1.EmailService],
        exports: [mailer_service_1.EmailService],
    })
], MailerModule);


/***/ }),
/* 60 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmailService = exports.EMAIL_TEMPLATE = exports.RESEND_FORGOT_PASSWORD_TEMPLATE = exports.VERIFY_SIGN_UP = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const rxjs_1 = __webpack_require__(54);
const nodemailer_1 = __webpack_require__(61);
const config_1 = __webpack_require__(5);
exports.VERIFY_SIGN_UP = {
    NAME: 'TangKinhCode',
    SUBJECT_VRF: 'Xác thực tài khoản',
    HTML: '<span>Vui lòng nhấp vào <a href="${token}" style="font-weight:600">xác thực</a> để kích hoạt tài khoản của bạn</span>',
    SUBJECT_RS: 'Xác thực tài khoản',
};
exports.RESEND_FORGOT_PASSWORD_TEMPLATE = {
    NAME: 'Univiec',
    SUBJECT: 'Resend OTP',
    HTML: '<span>Your OTP: <strong>${otp}</strong> OTP will expire in <strong>3 minues</strong>. Please do not <strong>share</strong> this OTP with anyone</span>',
    SUBJECT_RS: 'Reset password',
};
exports.EMAIL_TEMPLATE = {
    FORGOT_PASSWRD: exports.RESEND_FORGOT_PASSWORD_TEMPLATE,
    VERIFY_SIGN_UP: exports.VERIFY_SIGN_UP,
};
let EmailService = class EmailService {
    constructor(configService) {
        const mailer = configService.get('mailer');
        this.mailer = (0, nodemailer_1.createTransport)({
            service: 'gmail',
            host: mailer?.host,
            port: mailer?.port,
            secure: true,
            auth: {
                user: mailer?.user,
                pass: mailer?.pass,
            },
        });
    }
    /**
     *
     * @param to  email address
     * @param otp
     * @returns observable
     */
    sendOtpVerifyEmail(email, token) {
        common_1.Logger.log('sendOtpVerifyEmail: ', email);
        const payload = {
            to: email,
            from: {
                name: exports.EMAIL_TEMPLATE.VERIFY_SIGN_UP.NAME,
                address: 'No reply noreply@tangkinhcode.com',
            },
            subject: exports.EMAIL_TEMPLATE.VERIFY_SIGN_UP.SUBJECT_VRF,
            html: exports.EMAIL_TEMPLATE.VERIFY_SIGN_UP.HTML.replace('${token}', token),
        };
        console.log('payload: ', payload);
        return (0, rxjs_1.from)(this.mailer.sendMail(payload));
    }
    /**
     *
     * @param to email address
     * @param otp
     * @returns observable
     */
    sendResetPasswordEmail(to, otp) {
        return (0, rxjs_1.from)(this.mailer.sendMail({
            to,
            from: {
                name: 'TangKinhCode',
                address: 'No reply noreply@tangkinhcode.com',
            },
            subject: exports.EMAIL_TEMPLATE.FORGOT_PASSWRD.SUBJECT_RS,
            html: exports.EMAIL_TEMPLATE.FORGOT_PASSWRD.HTML.replace('${otp}', otp),
        }));
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], EmailService);


/***/ }),
/* 61 */
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BcryptService = void 0;
const tslib_1 = __webpack_require__(4);
const config_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const bcrypt = tslib_1.__importStar(__webpack_require__(63));
const rxjs_1 = __webpack_require__(54);
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
/* 63 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 64 */
/***/ ((module) => {

module.exports = require("axios");

/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(66), exports);


/***/ }),
/* 66 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BcryptModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const bcrypt_service_1 = __webpack_require__(62);
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
/* 67 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(68), exports);
tslib_1.__exportStar(__webpack_require__(69), exports);


/***/ }),
/* 68 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GlobalEventEmitterModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const event_emitter_1 = __webpack_require__(45);
const event_emitter_service_1 = __webpack_require__(69);
let GlobalEventEmitterModule = class GlobalEventEmitterModule {
};
exports.GlobalEventEmitterModule = GlobalEventEmitterModule;
exports.GlobalEventEmitterModule = GlobalEventEmitterModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [event_emitter_1.EventEmitterModule.forRoot()],
        providers: [event_emitter_service_1.EventEmitterService],
        exports: [event_emitter_service_1.EventEmitterService],
    })
], GlobalEventEmitterModule);


/***/ }),
/* 69 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var EventEmitterService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventEmitterService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const event_emitter_1 = __webpack_require__(45);
let EventEmitterService = EventEmitterService_1 = class EventEmitterService {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.logger = new common_1.Logger(EventEmitterService_1.name);
    }
    emit(event, payload) {
        this.eventEmitter.emit(event, payload);
        this.logger.log(`Event emitted: ${event}`);
    }
    on(event, listener) {
        this.eventEmitter.on(event, listener);
        this.logger.log(`Listener registered for event: ${event}`);
    }
};
exports.EventEmitterService = EventEmitterService;
exports.EventEmitterService = EventEmitterService = EventEmitterService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof event_emitter_1.EventEmitter2 !== "undefined" && event_emitter_1.EventEmitter2) === "function" ? _a : Object])
], EventEmitterService);


/***/ }),
/* 70 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const auth_service_1 = __webpack_require__(71);
const auth_controller_1 = __webpack_require__(75);
const axios_1 = __webpack_require__(73);
const database_1 = __webpack_require__(9);
const jwt_1 = __webpack_require__(46);
const config_1 = __webpack_require__(5);
const configs_1 = __webpack_require__(6);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [auth_service_1.AuthService],
        controllers: [auth_controller_1.AuthController],
        imports: [
            axios_1.HttpModule,
            database_1.DatabaseConfigFeature,
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
        ],
    })
], AuthModule);


/***/ }),
/* 71 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AuthService_1;
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const config_1 = __webpack_require__(5);
const jwt_1 = __webpack_require__(46);
const rxjs_1 = __webpack_require__(54);
const operators_1 = __webpack_require__(72);
const exception_1 = __webpack_require__(55);
const axios_1 = __webpack_require__(73);
const event_emitter_1 = __webpack_require__(45);
const sequelize_1 = __webpack_require__(20);
const google_auth_library_1 = __webpack_require__(74);
const cache_manager_1 = __webpack_require__(47);
const account_1 = __webpack_require__(12);
const axios_2 = __webpack_require__(64);
const bcrypt_service_1 = __webpack_require__(62);
const types_1 = __webpack_require__(16);
const account_service_1 = __webpack_require__(44);
let AuthService = AuthService_1 = class AuthService {
    constructor(accountModel, jwtService, httpService, cacheService, eventEmitter, bcryptService, configService, accountService) {
        this.accountModel = accountModel;
        this.jwtService = jwtService;
        this.httpService = httpService;
        this.cacheService = cacheService;
        this.eventEmitter = eventEmitter;
        this.bcryptService = bcryptService;
        this.configService = configService;
        this.accountService = accountService;
        this.logger = new common_1.Logger(AuthService_1.name);
        this.githubConfig = this.configService.get('github');
        this.googleConfig = this.configService.get('google');
        this.jwtConfig = this.configService.get('jwt');
        console.log('jwtConfig: ', this.jwtConfig);
        this.oauthClient = new google_auth_library_1.OAuth2Client({
            clientId: this.googleConfig?.clientId,
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
    generateFullTokens(payload) {
        console.log(this.jwtService);
        return (0, rxjs_1.of)(payload).pipe((0, operators_1.map)((payload) => ({
            accessToken: this.jwtService.sign(payload, {
                expiresIn: this.jwtConfig.accessExpiry,
            }),
        })), (0, operators_1.tap)((token) => this.logger.log('accessToken: ', token?.accessToken)), (0, operators_1.map)(({ accessToken }) => ({
            accessToken,
            refreshToken: this.jwtService.sign(payload, {
                expiresIn: this.jwtConfig.refreshExpiry,
            }),
        })), (0, operators_1.tap)((token) => this.logger.log('refreshToken: ', token.refreshToken)), (0, operators_1.catchError)((error) => (0, exception_1.throwException)(500, `Lỗi tạo token ${error.message}`)));
    }
    // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
    generateAccessTokens(payload) {
        return (0, rxjs_1.of)(payload).pipe((0, operators_1.map)((payload) => ({
            accessToken: this.jwtService.sign(payload, {
                expiresIn: '2m',
            }),
        })), (0, operators_1.catchError)((error) => (0, exception_1.throwException)(500, `Lỗi tạo token ${error.message}`)));
    }
    verifyToken(token) {
        return (0, rxjs_1.from)(this.jwtService.verifyAsync(token, { secret: this.jwtConfig?.secret })).pipe((0, operators_1.catchError)(() => (0, exception_1.throwException)(401, `Token không hợp lệ hoặc đã hết hạn!`)));
    }
    handleVerifyEmail(body) {
        return this.accountService.handleVerifyEmail(body);
    }
    handleSendTokenVerifyEmail(body) {
        return this.accountService.getExistingAccount(body.email).pipe((0, operators_1.switchMap)((existingUser) => {
            if (!existingUser) {
                return (0, exception_1.throwException)(common_1.HttpStatus.NOT_FOUND, 'Tài khoản không tồn tại, vui lòng thử lại với email khác.');
            }
            if (existingUser && !existingUser.isVerify) {
                const key = `${types_1.AccountVerifyStatusEnum.UNVERIFY}#${body.email}`;
                return this.cacheService.get(key).pipe((0, operators_1.switchMap)((cacheData) => {
                    if (cacheData) {
                        return (0, exception_1.throwException)(axios_2.HttpStatusCode.BadRequest, 'Vui lòng thử lại sau ít phút.');
                    }
                    return (0, rxjs_1.of)({
                        message: `Đường dẫn xác thực tài khoản đã được gửi đến email: ${body.email}. Vui lòng kiểm tra hộp thư để hoàn tất quá trình xác thực tài khoản.`,
                    });
                }), (0, operators_1.tap)(() => {
                    this.accountService.handleSendTokenVerifyEmail(body.email);
                }));
            }
            return (0, exception_1.throwException)(common_1.HttpStatus.BAD_REQUEST, 'Tài khoản này đã được xác thực, vui lòng thử lại với email khác. ');
        }));
    }
    handleSignUp({ email, password, confirmPassword }) {
        return this.accountService.getExistingAccount(email).pipe((0, operators_1.switchMap)((existingUser) => {
            if (existingUser && existingUser?.isVerify) {
                return (0, exception_1.throwException)(common_1.HttpStatus.BAD_REQUEST, 'Tài khoản đã tồn tại, vui lòng thử lại với email khác.');
            }
            if (existingUser && !existingUser?.isVerify) {
                return (0, exception_1.throwException)(common_1.HttpStatus.BAD_REQUEST, 'Tài khoản đã tồn tại nhưng chưa xác thực, xin vui lòng xác thực để đăng nhập.');
            }
            return this.accountService.handleCreateAccount({
                email: email,
                password: password,
                confirmPassword,
            });
        }));
    }
    handleSignIn({ email, password }) {
        return this.accountService.getExistingAccount(email).pipe((0, operators_1.switchMap)((userData) => {
            if (userData) {
                return this.bcryptService
                    .comparePassword(password, userData.password)
                    .pipe((0, operators_1.switchMap)((isMatch) => {
                    if (!isMatch) {
                        return (0, exception_1.throwException)(common_1.HttpStatus.BAD_REQUEST, 'Mật khẩu không chính xác.');
                    }
                    delete userData.password;
                    return (0, rxjs_1.from)(this.generateFullTokens(userData)).pipe((0, operators_1.map)((tokens) => ({
                        message: 'Đăng nhập thành công.',
                        data: {
                            ...userData,
                            tokens,
                        },
                    })));
                }));
            }
            return (0, exception_1.throwException)(axios_2.HttpStatusCode.NotFound, 'Không tìm thấy người dùng.');
        }));
    }
    handleSignInWithToken({ token }) {
        return this.verifyToken(token).pipe((0, operators_1.switchMap)(() => {
            const source = this.jwtService.decode(token);
            console.log('source: ', source);
            if (!source?.email) {
                return (0, exception_1.throwException)(axios_2.HttpStatusCode.NotFound, 'Không tìm thấy người dùng.');
            }
            return this.accountService.getExistingAccount(source.email, source.credentialType);
        }), (0, operators_1.switchMap)((response) => {
            if (!response) {
                return (0, exception_1.throwException)(axios_2.HttpStatusCode.NotFound, 'Không tìm thấy người dùng.');
            }
            delete response.password;
            return (0, rxjs_1.of)({
                data: response,
                message: 'Đăng nhập thành công.',
            });
        }));
    }
    handleOAuth({ token, credentialType }) {
        switch (credentialType) {
            case types_1.CredentialTypeEnum.GITHUB:
                return this.handleOAuthGithub({ token, credentialType });
            default:
                return this.handleOAuthGoogle({ token, credentialType });
        }
    }
    handleRefreshToken({ refreshToken }) {
        return (0, rxjs_1.from)(this.jwtService.verifyAsync(refreshToken, {
            secret: this.jwtConfig?.secret,
        })).pipe((0, operators_1.catchError)(() => (0, exception_1.throwException)(axios_2.HttpStatusCode.Unauthorized, 'Token đã hết hạn hoặc không hợp lệ vui lòng thử lại.')), (0, operators_1.switchMap)((decodedData) => {
            if (!decodedData || !decodedData?.email) {
                return (0, exception_1.throwException)(axios_2.HttpStatusCode.Unauthorized, 'Token đã hết hạn hoặc không hợp lệ vui lòng thử lại.');
            }
            return this.accountService
                .getExistingAccount(decodedData.email, decodedData.credentialType)
                .pipe((0, operators_1.switchMap)((cacheData) => {
                if (cacheData) {
                    delete cacheData?.password;
                    return this.generateFullTokens(cacheData).pipe((0, operators_1.map)((tokens) => ({
                        data: { ...cacheData, tokens },
                        message: 'Tạo mới token thành công.',
                    })));
                }
                return (0, exception_1.throwException)(axios_2.HttpStatusCode.Unauthorized, 'Token đã hết hạn hoặc không hợp lệ vui lòng thử lại.');
            }));
        }));
    }
    handleOAuthGoogle({ token }) {
        this.logger.log('handleOAuthGoogle: ', token);
        return (0, rxjs_1.from)(this.oauthClient.verifyIdToken({
            idToken: token,
            audience: this.googleConfig.clientId,
        })).pipe((0, operators_1.catchError)(() => (0, exception_1.throwException)(axios_2.HttpStatusCode.BadRequest, 'Có lỗi xảy ra trong quá trình xác thực người dùng từ gmail.')), (0, operators_1.map)((googlResponse) => googlResponse.getPayload()), (0, operators_1.switchMap)((response) => {
            console.log('Oauth google resposne: ', response);
            return this.accountService
                .getExistingAccount(response.email, types_1.CredentialTypeEnum.GOOLGE)
                .pipe((0, operators_1.switchMap)((existingAccount) => {
                if (existingAccount) {
                    delete existingAccount.password;
                    return this.generateFullTokens(existingAccount).pipe((0, operators_1.map)((tokens) => ({
                        message: 'Đăng nhập thành công.',
                        data: { ...existingAccount, tokens },
                    })));
                }
                const payload = {
                    email: response.email,
                    name: response?.name ||
                        response?.family_name + ' ' + response?.given_name,
                    avatarUrl: response?.picture,
                    credentialType: types_1.CredentialTypeEnum.GOOLGE,
                    bio: '',
                    githubLink: '',
                    nickName: response?.email?.split('@')?.[0] || '',
                };
                return this.createNewAccountAndProfile(payload);
            }));
        }));
    }
    handleOAuthGithub({ token }) {
        const { client_id, client_secret, url } = this.githubConfig;
        const payload = {
            client_id,
            client_secret,
            code: token,
            accept: 'json',
        };
        return this.httpService.post(url, payload).pipe((0, operators_1.filter)((response) => !!response?.data), (0, operators_1.map)((response) => {
            const tokenMatch = response?.data?.match(/access_token=([^&]*)/)?.[1];
            if (!tokenMatch) {
                return (0, exception_1.throwException)(common_1.HttpStatus.BAD_REQUEST, 'Lỗi xác thực người dùng github, vui lòng thử lại.');
            }
            return tokenMatch;
        }), (0, operators_1.switchMap)((token) => {
            this.logger.log('Received Token:', token);
            return this.getGithubUserInfo(token);
        }), (0, operators_1.switchMap)((userInfo) => this.handleGetOrCreateGithubAccount(userInfo.data)), (0, operators_1.catchError)((error) => {
            this.logger.error('Error during OAuth sign-in:', error);
            return (0, exception_1.throwException)(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Có lỗi xảy ra trong quá trình xác thực người dùng từ github.');
        }));
    }
    getGithubUserInfo(token) {
        return this.httpService
            .get(this.githubConfig.userInfoUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .pipe((0, operators_1.catchError)((error) => {
            this.logger.error('Error fetching GitHub user info:', error);
            return (0, exception_1.throwException)(common_1.HttpStatus.BAD_REQUEST, 'Lấy thông tin người dùng từ github thất bại');
        }));
    }
    handleGetOrCreateGithubAccount(userInfo) {
        const { email, name, avatar_url, bio, login, html_url } = userInfo;
        this.logger.log('GitHubUser: ', userInfo);
        const _email = email || login + '@github.com';
        return this.accountService
            .getExistingAccount(_email, types_1.CredentialTypeEnum.GITHUB)
            .pipe((0, operators_1.switchMap)((existingAccount) => {
            if (existingAccount) {
                delete existingAccount.password;
                return this.generateFullTokens(existingAccount).pipe((0, operators_1.map)((tokens) => ({
                    message: 'Đăng nhập thành công.',
                    data: { ...existingAccount, tokens },
                })));
            }
            const payload = {
                email: _email,
                name,
                avatarUrl: avatar_url,
                credentialType: types_1.CredentialTypeEnum.GITHUB,
                bio,
                githubLink: html_url,
                nickName: _email?.split('@')?.[0] || '',
            };
            return this.createNewAccountAndProfile(payload);
        }));
    }
    createNewAccountAndProfile({ email, name, bio, avatarUrl, credentialType, githubLink, nickName, }) {
        let accountData;
        this.logger.log('CREATE new account and profile');
        return (0, rxjs_1.from)(this.accountModel.create({ email, credentialType, isVerify: true })).pipe((0, operators_1.map)((account) => {
            accountData = account.toJSON();
            return accountData;
        }), (0, operators_1.switchMap)((account) => this.createProfile({
            accountId: account.id,
            fullName: name,
            avatarUrl,
            bio,
            githubLink,
            nickName,
        }).pipe((0, operators_1.tap)((profile) => {
            const key = this.getCacheKey(email, credentialType);
            this.eventEmitter.emit(cache_manager_1.CacheMessageAction.Create, {
                key,
                value: { ...accountData, email, profile },
                ttl: '7d',
            });
        }), (0, operators_1.switchMap)((profile) => this.generateFullTokens({
            ...accountData,
            fullName: profile.fullName,
        }).pipe((0, operators_1.tap)(() => {
            delete accountData.password;
        }), (0, operators_1.map)((tokens) => ({
            message: 'Đăng nhập thành công.',
            data: { ...accountData, tokens, profile },
        })))))));
    }
    createProfile({ accountId, fullName, avatarUrl, bio, githubLink, nickName, }) {
        return (0, rxjs_1.from)(this.accountService.handleCreateProfile({
            fullName,
            avatarUrl,
            bio,
            githubLink,
            nickName,
        }, accountId)).pipe((0, operators_1.catchError)((error) => {
            this.logger.error('Error creating profile:', error);
            return (0, exception_1.throwException)(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Tạo thông tin người dùng thất bại.');
        }));
    }
    getCacheKey(email, credentialType = types_1.CredentialTypeEnum.NONE) {
        return `ACCOUNT#${email}#${credentialType}`;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, sequelize_1.InjectModel)(account_1.Account)),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _b : Object, typeof (_c = typeof cache_manager_1.CacheManagerService !== "undefined" && cache_manager_1.CacheManagerService) === "function" ? _c : Object, typeof (_d = typeof event_emitter_1.EventEmitter2 !== "undefined" && event_emitter_1.EventEmitter2) === "function" ? _d : Object, typeof (_e = typeof bcrypt_service_1.BcryptService !== "undefined" && bcrypt_service_1.BcryptService) === "function" ? _e : Object, typeof (_f = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _f : Object, typeof (_g = typeof account_service_1.AccountService !== "undefined" && account_service_1.AccountService) === "function" ? _g : Object])
], AuthService);


/***/ }),
/* 72 */
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),
/* 73 */
/***/ ((module) => {

module.exports = require("@nestjs/axios");

/***/ }),
/* 74 */
/***/ ((module) => {

module.exports = require("google-auth-library");

/***/ }),
/* 75 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const microservices_1 = __webpack_require__(23);
const account_1 = __webpack_require__(24);
const account_2 = __webpack_require__(39);
const auth_service_1 = __webpack_require__(71);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    handleSignInWithToken(body) {
        return this.authService.handleSignInWithToken(body);
    }
    handleSignIn(body) {
        return this.authService.handleSignIn(body);
    }
    handleOAuth(body) {
        return this.authService.handleOAuth(body);
    }
    handleSignUp(body) {
        return this.authService.handleSignUp(body);
    }
    handleVerifyEmail(body) {
        return this.authService.handleVerifyEmail(body);
    }
    handleSendTokenVerifyEmail(body) {
        return this.authService.handleSendTokenVerifyEmail(body);
    }
    handleRefreshToken(body) {
        return this.authService.handleRefreshToken(body);
    }
};
exports.AuthController = AuthController;
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)(account_2.AuthMsgPattern.Authenticate),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof account_1.AuthenticateDto !== "undefined" && account_1.AuthenticateDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "handleSignInWithToken", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)(account_2.AuthMsgPattern.SignIn),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof account_1.SignInDto !== "undefined" && account_1.SignInDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "handleSignIn", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)(account_2.AuthMsgPattern.SignInOauth),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof account_1.SignInOauth !== "undefined" && account_1.SignInOauth) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "handleOAuth", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)(account_2.AuthMsgPattern.SignUp),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof account_1.CreateAccountDto !== "undefined" && account_1.CreateAccountDto) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "handleSignUp", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)(account_2.AuthMsgPattern.VerifyEmail),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof account_1.VerifyEmailOtp !== "undefined" && account_1.VerifyEmailOtp) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "handleVerifyEmail", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)(account_2.AuthMsgPattern.SendOtpVerifyEmail),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof account_1.ResendVerifyEmail !== "undefined" && account_1.ResendVerifyEmail) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "handleSendTokenVerifyEmail", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)(account_2.AuthMsgPattern.RefreshToken),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof account_1.RefreshTokenDto !== "undefined" && account_1.RefreshTokenDto) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "handleRefreshToken", null);
exports.AuthController = AuthController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
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
const microservices_1 = __webpack_require__(23);
const exception_1 = __webpack_require__(55);
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