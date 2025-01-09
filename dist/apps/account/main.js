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
const account_module_1 = __webpack_require__(26);
const bcrypt_1 = __webpack_require__(71);
const event_emitter_1 = __webpack_require__(73);
const cache_manager_1 = __webpack_require__(53);
const auth_module_1 = __webpack_require__(76);
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
tslib_1.__exportStar(__webpack_require__(24), exports);
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
const achievement_1 = __webpack_require__(17);
const material_art_1 = __webpack_require__(19);
const profile_1 = __webpack_require__(14);
const profile_achievement_1 = __webpack_require__(16);
const profile_material_art_1 = __webpack_require__(18);
const realm_1 = __webpack_require__(15);
const sect_1 = __webpack_require__(20);
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
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Account = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_typescript_1 = __webpack_require__(13);
const profile_model_1 = __webpack_require__(14);
const types_1 = __webpack_require__(21);
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
const profile_achievement_model_1 = __webpack_require__(16);
const profile_material_art_model_1 = __webpack_require__(18);
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
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileAchievement = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_typescript_1 = __webpack_require__(13);
const profile_model_1 = __webpack_require__(14);
const achievement_model_1 = __webpack_require__(17);
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
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Achievement = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_typescript_1 = __webpack_require__(13);
const profile_achievement_model_1 = __webpack_require__(16);
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
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileMaterialArt = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_typescript_1 = __webpack_require__(13);
const profile_model_1 = __webpack_require__(14);
const material_art_model_1 = __webpack_require__(19);
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
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MaterialArt = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_typescript_1 = __webpack_require__(13);
const sect_model_1 = __webpack_require__(20);
const profile_material_art_model_1 = __webpack_require__(18);
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
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sect = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_typescript_1 = __webpack_require__(13);
const material_art_model_1 = __webpack_require__(19);
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
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(22), exports);
tslib_1.__exportStar(__webpack_require__(23), exports);


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 23 */
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
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseConfigModule = exports.DatabaseConfigFeature = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_1 = __webpack_require__(25);
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
/* 25 */
/***/ ((module) => {

module.exports = require("@nestjs/sequelize");

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const account_controller_1 = __webpack_require__(27);
const account_service_1 = __webpack_require__(50);
const database_1 = __webpack_require__(9);
const mailer_1 = __webpack_require__(64);
const jwt_1 = __webpack_require__(52);
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
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const microservices_1 = __webpack_require__(28);
const account_1 = __webpack_require__(29);
const account_2 = __webpack_require__(45);
const account_service_1 = __webpack_require__(50);
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
    handleDeleteAccount(body) {
        return this.accountService.handleDeleteAccount(body);
    }
};
exports.AccountController = AccountController;
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)(account_2.ProfileMsgPattern.ChangePassword),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof account_1.ChangePasswordDto !== "undefined" && account_1.ChangePasswordDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AccountController.prototype, "handleChangePassword", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)(account_2.ProfileMsgPattern.Deactivate),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof account_1.DeactivateDto !== "undefined" && account_1.DeactivateDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AccountController.prototype, "handleDeactivate", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)(account_2.ProfileMsgPattern.Delete),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof account_1.DeleteAccountDto !== "undefined" && account_1.DeleteAccountDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AccountController.prototype, "handleDeleteAccount", null);
exports.AccountController = AccountController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof account_service_1.AccountService !== "undefined" && account_service_1.AccountService) === "function" ? _a : Object])
], AccountController);


/***/ }),
/* 28 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(30), exports);
tslib_1.__exportStar(__webpack_require__(33), exports);
tslib_1.__exportStar(__webpack_require__(34), exports);
tslib_1.__exportStar(__webpack_require__(35), exports);
tslib_1.__exportStar(__webpack_require__(36), exports);
tslib_1.__exportStar(__webpack_require__(37), exports);
tslib_1.__exportStar(__webpack_require__(38), exports);
tslib_1.__exportStar(__webpack_require__(39), exports);
tslib_1.__exportStar(__webpack_require__(40), exports);
tslib_1.__exportStar(__webpack_require__(43), exports);
tslib_1.__exportStar(__webpack_require__(44), exports);


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignInDto = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(31);
const class_validator_1 = __webpack_require__(32);
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
/* 31 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 32 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResendVerifyEmail = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(31);
const class_validator_1 = __webpack_require__(32);
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
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteAccountDto = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(31);
const class_validator_1 = __webpack_require__(32);
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
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeactivateDto = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(31);
const class_validator_1 = __webpack_require__(32);
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
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VerifyEmailOtp = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(31);
const class_validator_1 = __webpack_require__(32);
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
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthenticateDto = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(31);
const class_validator_1 = __webpack_require__(32);
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
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RefreshTokenDto = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(31);
const class_validator_1 = __webpack_require__(32);
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
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignInOauth = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(31);
const class_validator_1 = __webpack_require__(32);
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
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAccountDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(32);
const password_1 = __webpack_require__(41);
const password_match_1 = __webpack_require__(42);
const swagger_1 = __webpack_require__(31);
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
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IsStrongPasswordConstraint = void 0;
exports.IsStrongPassword = IsStrongPassword;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(32);
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
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IsPasswordMatchConstraint = void 0;
exports.IsPasswordMatch = IsPasswordMatch;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(32);
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
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateProfileDto = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(31);
const class_validator_1 = __webpack_require__(32);
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
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChangePasswordDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(32);
const password_1 = __webpack_require__(41);
const swagger_1 = __webpack_require__(31);
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
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(46), exports);
tslib_1.__exportStar(__webpack_require__(49), exports);


/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthMsgPattern = void 0;
const module_1 = __webpack_require__(47);
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
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountModule = void 0;
const __1 = __webpack_require__(48);
exports.AccountModule = Object.freeze({
    Auth: `${__1.MicroServiceName.Account}/Auth`,
    Profile: `${__1.MicroServiceName.Account}/Profile`,
});


/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MicroServiceName = void 0;
exports.MicroServiceName = Object.freeze({
    Account: 'AccountService',
    Guild: 'GuildService',
    Scripture: 'ScriptureService',
});


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileMsgPattern = void 0;
const module_1 = __webpack_require__(47);
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
/* 50 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AccountService_1;
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const event_emitter_1 = __webpack_require__(51);
const jwt_1 = __webpack_require__(52);
const sequelize_1 = __webpack_require__(25);
const config_1 = __webpack_require__(5);
const cache_manager_1 = __webpack_require__(53);
const exception_1 = __webpack_require__(61);
const mailer_1 = __webpack_require__(64);
const account_1 = __webpack_require__(12);
const profile_1 = __webpack_require__(14);
const types_1 = __webpack_require__(21);
const rxjs_1 = __webpack_require__(60);
const bcrypt_service_1 = __webpack_require__(68);
const axios_1 = __webpack_require__(70);
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
                return (0, rxjs_1.from)(this.accountModel.update({ isVerify: true }, {
                    where: {
                        email: response?.email,
                        credentialType: response?.credentialType,
                    },
                })).pipe((0, rxjs_1.map)(() => ({
                    email: response.email,
                    credentialType: response.credentialType,
                })));
            }), (0, rxjs_1.tap)(() => {
                this.removeVerifyTokenCache(source.email);
            }));
        }));
    }
    handleCreateAccount({ password, email }) {
        this.logger.log('handleCreateAccount...', email);
        return this.bcryptService.hashPassword(password).pipe((0, rxjs_1.switchMap)((hashPassword) => (0, rxjs_1.from)(this.accountModel.create({
            email,
            password: hashPassword,
        })).pipe((0, rxjs_1.map)((response) => response.toJSON()), (0, rxjs_1.switchMap)((accountResponse) => {
            delete accountResponse?.password;
            return (0, rxjs_1.from)(this.profileModel.findOne({
                where: {
                    accountId: accountResponse?.id,
                },
            })).pipe((0, rxjs_1.map)((profile) => ({
                ...accountResponse,
                profile,
            })));
        }), (0, rxjs_1.tap)((fullyData) => {
            const key = this.getCacheKey(email);
            const ttlInSeconds = 7 * 24 * 60 * 60;
            this.eventEmitter.emit(cache_manager_1.CacheMessageAction.Create, {
                key,
                value: fullyData,
                ttl: ttlInSeconds,
            });
        }))));
    }
    handleSendTokenVerifyEmail({ email, credentialType, }) {
        const token = this.generateTokenVerify(email);
        const verificationLink = this.getVerifyLink(token);
        this.logger.log(`handleSendTokenVerifyEmail ${token}`);
        this.mailerService
            .sendOtpVerifyEmail(email, verificationLink)
            .pipe((0, rxjs_1.catchError)((e) => {
            this.logger.error('Có lỗi sãy ra khi gửi otp verify email');
            return e;
        }), (0, rxjs_1.tap)(() => {
            this.logger.log(`Verification email sent to ${email}`);
            this.eventEmitter.emit(cache_manager_1.CacheMessageAction.Create, {
                key: `${types_1.AccountVerifyStatusEnum.UNVERIFY}#${email}`,
                value: {
                    token,
                    email,
                    credentialType,
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
    handleDeleteAccount(body) {
        return (0, rxjs_1.from)(this.accountModel.findOne({ where: { id: body.id } })).pipe((0, rxjs_1.catchError)(() => (0, exception_1.throwException)(axios_1.HttpStatusCode.InternalServerError, 'Có lỗi xảy ra khi xoá tài khoản.')), (0, rxjs_1.switchMap)((user) => {
            if (user) {
                return (0, rxjs_1.from)(user.destroy()).pipe((0, rxjs_1.tap)(() => {
                    this.eventEmitter.emit(cache_manager_1.CacheMessageAction.Delete, this.getCacheKey(user.email, user.credentialType));
                }), (0, rxjs_1.map)(() => ({ message: 'Xoá tài khoản thành công.', data: body.id })));
            }
            return (0, exception_1.throwException)(axios_1.HttpStatusCode.NotFound, 'Tài khoản không tồn tại.');
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
/* 51 */
/***/ ((module) => {

module.exports = require("@nestjs/event-emitter");

/***/ }),
/* 52 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 53 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(54), exports);
tslib_1.__exportStar(__webpack_require__(56), exports);
tslib_1.__exportStar(__webpack_require__(59), exports);


/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheManagerModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const cache_listener_service_1 = __webpack_require__(55);
const ioredis_1 = __webpack_require__(57);
const cache_manager_service_1 = __webpack_require__(59);
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
/* 55 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var CacheListener_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheListener = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const event_emitter_1 = __webpack_require__(51);
const cache_message_1 = __webpack_require__(56);
const ioredis_1 = __webpack_require__(57);
const ioredis_2 = tslib_1.__importDefault(__webpack_require__(58));
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
/* 56 */
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
/* 57 */
/***/ ((module) => {

module.exports = require("@nestjs-modules/ioredis");

/***/ }),
/* 58 */
/***/ ((module) => {

module.exports = require("ioredis");

/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var CacheManagerService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheManagerService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const ioredis_1 = tslib_1.__importDefault(__webpack_require__(58));
const ioredis_2 = __webpack_require__(57);
const rxjs_1 = __webpack_require__(60);
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
/* 60 */
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(62), exports);
tslib_1.__exportStar(__webpack_require__(63), exports);


/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GlobalRpcExceptionFilter = exports.CustomRpcException = void 0;
const tslib_1 = __webpack_require__(4);
const microservices_1 = __webpack_require__(28);
const common_1 = __webpack_require__(1);
const rxjs_1 = __webpack_require__(60);
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
/* 63 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.throwException = void 0;
const rxjs_1 = __webpack_require__(60);
const rcp_exception_1 = __webpack_require__(62);
const throwException = (code, message) => (0, rxjs_1.throwError)(() => {
    return new rcp_exception_1.CustomRpcException(code, message);
});
exports.throwException = throwException;


/***/ }),
/* 64 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(65), exports);
tslib_1.__exportStar(__webpack_require__(66), exports);


/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MailerModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const mailer_service_1 = __webpack_require__(66);
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
/* 66 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmailService = exports.EMAIL_TEMPLATE = exports.RESEND_FORGOT_PASSWORD_TEMPLATE = exports.VERIFY_SIGN_UP = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const rxjs_1 = __webpack_require__(60);
const nodemailer_1 = __webpack_require__(67);
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
/* 67 */
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),
/* 68 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BcryptService = void 0;
const tslib_1 = __webpack_require__(4);
const config_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const bcrypt = tslib_1.__importStar(__webpack_require__(69));
const rxjs_1 = __webpack_require__(60);
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
/* 69 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 70 */
/***/ ((module) => {

module.exports = require("axios");

/***/ }),
/* 71 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(72), exports);


/***/ }),
/* 72 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BcryptModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const bcrypt_service_1 = __webpack_require__(68);
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
/* 73 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(74), exports);
tslib_1.__exportStar(__webpack_require__(75), exports);


/***/ }),
/* 74 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GlobalEventEmitterModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const event_emitter_1 = __webpack_require__(51);
const event_emitter_service_1 = __webpack_require__(75);
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
/* 75 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var EventEmitterService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventEmitterService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const event_emitter_1 = __webpack_require__(51);
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
/* 76 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const auth_service_1 = __webpack_require__(77);
const auth_controller_1 = __webpack_require__(81);
const axios_1 = __webpack_require__(79);
const database_1 = __webpack_require__(9);
const jwt_1 = __webpack_require__(52);
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
/* 77 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AuthService_1;
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const config_1 = __webpack_require__(5);
const jwt_1 = __webpack_require__(52);
const rxjs_1 = __webpack_require__(60);
const operators_1 = __webpack_require__(78);
const exception_1 = __webpack_require__(61);
const axios_1 = __webpack_require__(79);
const event_emitter_1 = __webpack_require__(51);
const sequelize_1 = __webpack_require__(25);
const google_auth_library_1 = __webpack_require__(80);
const cache_manager_1 = __webpack_require__(53);
const account_1 = __webpack_require__(12);
const axios_2 = __webpack_require__(70);
const bcrypt_service_1 = __webpack_require__(68);
const types_1 = __webpack_require__(21);
const account_service_1 = __webpack_require__(50);
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
    generateAccessToken(payload) {
        return (0, rxjs_1.of)(payload).pipe((0, operators_1.map)((payload) => ({
            accessToken: this.jwtService.sign(payload, {
                expiresIn: this.jwtConfig.accessExpiry,
            }),
        })), (0, operators_1.tap)((token) => this.logger.log('generateAccessTokens: ', token.accessToken)), (0, operators_1.catchError)((error) => (0, exception_1.throwException)(500, `Lỗi tạo token ${error.message}`)));
    }
    verifyToken(token) {
        return (0, rxjs_1.from)(this.jwtService.verifyAsync(token, { secret: this.jwtConfig?.secret })).pipe((0, operators_1.catchError)(() => (0, exception_1.throwException)(401, `Token không hợp lệ hoặc đã hết hạn!`)));
    }
    handleVerifyEmail(body) {
        return this.accountService.handleVerifyEmail(body).pipe((0, operators_1.switchMap)((response) => {
            return this.accountModel.findOne({
                where: {
                    email: response.email,
                    credentialType: response.credentialType,
                },
                include: [
                    {
                        association: 'profile',
                        required: false, // Set to true if the profile must exist
                    },
                ],
            });
        }), (0, operators_1.switchMap)((userData) => {
            const jsonData = userData?.toJSON?.();
            delete jsonData?.password;
            return this.generateFullTokens(jsonData).pipe((0, operators_1.map)((tokens) => ({
                data: {
                    ...jsonData,
                    tokens,
                },
                message: 'Xác thực tài khoản thành công.',
            })));
        }));
    }
    handleSendTokenVerifyEmail(body) {
        return this.accountService.getExistingAccount(body.email).pipe((0, operators_1.switchMap)((existingUser) => {
            if (!existingUser) {
                return (0, exception_1.throwException)(common_1.HttpStatus.NOT_FOUND, 'Tài khoản không tồn tại, vui lòng thử lại với email khác.');
            }
            console.log('existingUser: ', existingUser);
            if (existingUser && !existingUser.isVerify) {
                return (0, rxjs_1.of)({
                    message: `Đường dẫn xác thực tài khoản đã được gửi đến email: ${body.email}. Vui lòng kiểm tra hộp thư để hoàn tất quá trình xác thực tài khoản.`,
                }).pipe((0, operators_1.tap)(() => {
                    this.accountService.handleSendTokenVerifyEmail({
                        email: body.email,
                        credentialType: existingUser.credentialType,
                    });
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
        }), (0, operators_1.map)((response) => ({
            data: response,
            message: 'Tạo tài khoản thành công',
        })), (0, operators_1.tap)(() => {
            this.accountService.handleSendTokenVerifyEmail({
                email,
                credentialType: types_1.CredentialTypeEnum.NONE,
            });
        }));
    }
    handleSignIn({ email, password }) {
        return (0, rxjs_1.from)(this.accountModel.findOne({
            where: { email, credentialType: types_1.CredentialTypeEnum.NONE },
            include: [
                {
                    association: 'profile',
                    required: false, // Set to true if the profile must exist
                },
            ],
        })).pipe((0, operators_1.switchMap)((userData) => {
            if (userData) {
                userData = userData.toJSON();
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
        })).pipe((0, operators_1.catchError)(() => (0, exception_1.throwException)(axios_2.HttpStatusCode.Forbidden, 'Token đã hết hạn hoặc không hợp lệ vui lòng thử lại.')), (0, operators_1.switchMap)((decodedData) => {
            if (!decodedData || !decodedData?.email) {
                return (0, exception_1.throwException)(axios_2.HttpStatusCode.Forbidden, 'Token đã hết hạn hoặc không hợp lệ vui lòng thử lại.');
            }
            return this.accountService
                .getExistingAccount(decodedData.email, decodedData.credentialType)
                .pipe((0, operators_1.switchMap)((cacheData) => {
                if (cacheData) {
                    delete cacheData?.password;
                    return this.generateAccessToken(cacheData).pipe((0, operators_1.map)((token) => ({
                        data: token,
                        message: 'Tạo mới token thành công.',
                    })));
                }
                return (0, exception_1.throwException)(axios_2.HttpStatusCode.Forbidden, 'Token đã hết hạn hoặc không hợp lệ vui lòng thử lại.');
            }));
        }));
    }
    handleOAuthGoogle({ token }) {
        this.logger.log('handleOAuthGoogle: ', token);
        return (0, rxjs_1.from)(this.oauthClient.verifyIdToken({
            idToken: token,
            audience: this.googleConfig.clientId,
        })).pipe((0, operators_1.catchError)(() => (0, exception_1.throwException)(axios_2.HttpStatusCode.BadRequest, 'Có lỗi xảy ra trong quá trình xác thực người dùng từ gmail.')), (0, operators_1.map)((googlResponse) => googlResponse.getPayload()), (0, operators_1.switchMap)((response) => {
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
    createNewAccountAndProfile({ email, name, bio, avatarUrl, credentialType, githubLink, }) {
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
        }).pipe((0, operators_1.tap)((profile) => {
            const key = this.getCacheKey(email, credentialType);
            const ttlInSeconds = 7 * 24 * 60 * 60;
            this.eventEmitter.emit(cache_manager_1.CacheMessageAction.Create, {
                key,
                value: { ...accountData, email, profile },
                ttl: ttlInSeconds,
            });
        }), (0, operators_1.switchMap)((profile) => this.generateFullTokens({
            ...accountData,
            fullName: profile.fullName,
        }).pipe((0, operators_1.tap)(() => {
            delete accountData?.password;
        }), (0, operators_1.map)((tokens) => ({
            message: 'Đăng nhập thành công.',
            data: { ...accountData, tokens, profile },
        })))))));
    }
    createProfile({ accountId, fullName, avatarUrl, bio, githubLink, }) {
        return (0, rxjs_1.from)(this.accountService.handleCreateProfile({
            fullName,
            avatarUrl,
            bio,
            githubLink,
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
/* 78 */
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),
/* 79 */
/***/ ((module) => {

module.exports = require("@nestjs/axios");

/***/ }),
/* 80 */
/***/ ((module) => {

module.exports = require("google-auth-library");

/***/ }),
/* 81 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const microservices_1 = __webpack_require__(28);
const account_1 = __webpack_require__(29);
const account_2 = __webpack_require__(45);
const auth_service_1 = __webpack_require__(77);
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
const microservices_1 = __webpack_require__(28);
const exception_1 = __webpack_require__(61);
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