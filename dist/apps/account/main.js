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
const account_module_1 = __webpack_require__(40);
const bcrypt_1 = __webpack_require__(96);
const event_emitter_1 = __webpack_require__(98);
const cache_manager_1 = __webpack_require__(78);
const auth_module_1 = __webpack_require__(101);
const profile_module_1 = __webpack_require__(107);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            bcrypt_1.BcryptModule,
            account_module_1.AccountModule,
            profile_module_1.ProfileModule,
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
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(10), exports);
tslib_1.__exportStar(__webpack_require__(38), exports);
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
            pool: {
                max: 20,
                min: 2,
                idle: 10000,
                acquire: 30000,
            },
        };
    },
};


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModels = void 0;
const account_1 = __webpack_require__(12);
const achievement_1 = __webpack_require__(29);
const material_art_1 = __webpack_require__(31);
const profile_1 = __webpack_require__(26);
const profile_achievement_1 = __webpack_require__(28);
const profile_material_art_1 = __webpack_require__(30);
const realm_1 = __webpack_require__(27);
const sect_1 = __webpack_require__(32);
const profile_social_model_1 = __webpack_require__(33);
const social_model_1 = __webpack_require__(34);
exports.DatabaseModels = [
    account_1.Account,
    profile_1.Profile,
    realm_1.Realm,
    material_art_1.MaterialArt,
    achievement_1.Achievement,
    sect_1.Sect,
    profile_achievement_1.ProfileAchievement,
    profile_material_art_1.ProfileMaterialArt,
    profile_social_model_1.ProfileSocial,
    social_model_1.Social,
];


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Account = void 0;
const tslib_1 = __webpack_require__(4);
const guard_1 = __webpack_require__(13);
const sequelize_typescript_1 = __webpack_require__(25);
const profile_model_1 = __webpack_require__(26);
const types_1 = __webpack_require__(35);
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
        type: sequelize_typescript_1.DataType.STRING,
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof guard_1.Role !== "undefined" && guard_1.Role) === "function" ? _a : Object)
], Account.prototype, "role", void 0);
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
    tslib_1.__metadata("design:type", typeof (_b = typeof types_1.CredentialTypeEnum !== "undefined" && types_1.CredentialTypeEnum) === "function" ? _b : Object)
], Account.prototype, "credentialType", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.HasOne)(() => profile_model_1.Profile),
    tslib_1.__metadata("design:type", typeof (_c = typeof profile_model_1.Profile !== "undefined" && profile_model_1.Profile) === "function" ? _c : Object)
], Account.prototype, "profile", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], Account.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    tslib_1.__metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(14), exports);
tslib_1.__exportStar(__webpack_require__(16), exports);
tslib_1.__exportStar(__webpack_require__(17), exports);
tslib_1.__exportStar(__webpack_require__(19), exports);
tslib_1.__exportStar(__webpack_require__(20), exports);
tslib_1.__exportStar(__webpack_require__(22), exports);
tslib_1.__exportStar(__webpack_require__(21), exports);
tslib_1.__exportStar(__webpack_require__(23), exports);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AuthGuard_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthGuard = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const config_1 = __webpack_require__(5);
const core_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(15);
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
/* 15 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = __webpack_require__(1);
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomThrottleGuard = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const throttler_1 = __webpack_require__(18);
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
/* 18 */
/***/ ((module) => {

module.exports = require("@nestjs/throttler");

/***/ }),
/* 19 */
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
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleGuard = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const role_decorator_1 = __webpack_require__(21);
const access_control_service_1 = __webpack_require__(22);
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
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLE_KEY = void 0;
const common_1 = __webpack_require__(1);
exports.ROLE_KEY = 'role';
const Roles = (...role) => (0, common_1.SetMetadata)(exports.ROLE_KEY, role);
exports.Roles = Roles;


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccessControlService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const role_enum_1 = __webpack_require__(19);
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
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OwnerGuard = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const account_1 = __webpack_require__(24);
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
/* 24 */
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
/* 25 */
/***/ ((module) => {

module.exports = require("sequelize-typescript");

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Profile = exports.DefaultProfileValue = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_typescript_1 = __webpack_require__(25);
const account_model_1 = __webpack_require__(12);
const realm_model_1 = __webpack_require__(27);
const profile_achievement_model_1 = __webpack_require__(28);
const profile_material_art_model_1 = __webpack_require__(30);
const profile_social_model_1 = __webpack_require__(33);
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
tslib_1.__decorate([
    (0, sequelize_typescript_1.HasMany)(() => profile_social_model_1.ProfileSocial),
    tslib_1.__metadata("design:type", Array)
], Profile.prototype, "profileSocials", void 0);
exports.Profile = Profile = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'profile' })
], Profile);


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Realm = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_typescript_1 = __webpack_require__(25);
const profile_model_1 = __webpack_require__(26);
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
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.NUMBER,
        allowNull: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Realm.prototype, "requireExp", void 0);
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
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileAchievement = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_typescript_1 = __webpack_require__(25);
const profile_model_1 = __webpack_require__(26);
const achievement_model_1 = __webpack_require__(29);
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
    (0, sequelize_typescript_1.Table)({ tableName: 'profileAchievements' })
], ProfileAchievement);


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Achievement = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_typescript_1 = __webpack_require__(25);
const profile_achievement_model_1 = __webpack_require__(28);
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
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileMaterialArt = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_typescript_1 = __webpack_require__(25);
const profile_model_1 = __webpack_require__(26);
const material_art_model_1 = __webpack_require__(31);
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
    (0, sequelize_typescript_1.Table)({ tableName: 'profileMaterialArts' })
], ProfileMaterialArt);


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MaterialArt = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_typescript_1 = __webpack_require__(25);
const sect_model_1 = __webpack_require__(32);
const profile_material_art_model_1 = __webpack_require__(30);
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
    (0, sequelize_typescript_1.Table)({ tableName: 'materialArts' })
], MaterialArt);


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sect = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_typescript_1 = __webpack_require__(25);
const material_art_model_1 = __webpack_require__(31);
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
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileSocial = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_typescript_1 = __webpack_require__(25);
const profile_model_1 = __webpack_require__(26);
const social_model_1 = __webpack_require__(34);
let ProfileSocial = class ProfileSocial extends sequelize_typescript_1.Model {
};
exports.ProfileSocial = ProfileSocial;
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
    }),
    tslib_1.__metadata("design:type", String)
], ProfileSocial.prototype, "id", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => profile_model_1.Profile),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    tslib_1.__metadata("design:type", String)
], ProfileSocial.prototype, "profileId", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => profile_model_1.Profile),
    tslib_1.__metadata("design:type", typeof (_a = typeof profile_model_1.Profile !== "undefined" && profile_model_1.Profile) === "function" ? _a : Object)
], ProfileSocial.prototype, "profile", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => social_model_1.Social),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    tslib_1.__metadata("design:type", String)
], ProfileSocial.prototype, "socialId", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => social_model_1.Social),
    tslib_1.__metadata("design:type", typeof (_b = typeof social_model_1.Social !== "undefined" && social_model_1.Social) === "function" ? _b : Object)
], ProfileSocial.prototype, "social", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    tslib_1.__metadata("design:type", String)
], ProfileSocial.prototype, "link", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    tslib_1.__metadata("design:type", String)
], ProfileSocial.prototype, "status", void 0);
exports.ProfileSocial = ProfileSocial = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'profileSocials' })
], ProfileSocial);


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Social = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_typescript_1 = __webpack_require__(25);
let Social = class Social extends sequelize_typescript_1.Model {
};
exports.Social = Social;
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
    }),
    tslib_1.__metadata("design:type", String)
], Social.prototype, "id", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    tslib_1.__metadata("design:type", String)
], Social.prototype, "name", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    tslib_1.__metadata("design:type", String)
], Social.prototype, "logo", void 0);
exports.Social = Social = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'socials' })
], Social);


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(36), exports);
tslib_1.__exportStar(__webpack_require__(37), exports);


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 37 */
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
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseConfigModule = exports.DatabaseConfigFeature = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_1 = __webpack_require__(39);
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
/* 39 */
/***/ ((module) => {

module.exports = require("@nestjs/sequelize");

/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const account_controller_1 = __webpack_require__(41);
const account_service_1 = __webpack_require__(76);
const database_1 = __webpack_require__(9);
const mailer_1 = __webpack_require__(89);
const jwt_1 = __webpack_require__(15);
const config_1 = __webpack_require__(5);
const configs_1 = __webpack_require__(6);
const query_builder_1 = __webpack_require__(62);
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
            query_builder_1.QueryBuilderModule,
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
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const microservices_1 = __webpack_require__(42);
const account_1 = __webpack_require__(43);
const account_2 = __webpack_require__(71);
const account_service_1 = __webpack_require__(76);
const paging_dto_1 = __webpack_require__(60);
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
    handlePagingAccount(body) {
        return this.accountService.handlePagingAccount(body);
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
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)(account_2.ProfileMsgPattern.ListAccount),
    tslib_1.__param(0, (0, microservices_1.Payload)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof paging_dto_1.PagingDto !== "undefined" && paging_dto_1.PagingDto) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AccountController.prototype, "handlePagingAccount", null);
exports.AccountController = AccountController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof account_service_1.AccountService !== "undefined" && account_service_1.AccountService) === "function" ? _a : Object])
], AccountController);


/***/ }),
/* 42 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(44), exports);
tslib_1.__exportStar(__webpack_require__(47), exports);
tslib_1.__exportStar(__webpack_require__(48), exports);
tslib_1.__exportStar(__webpack_require__(49), exports);
tslib_1.__exportStar(__webpack_require__(50), exports);
tslib_1.__exportStar(__webpack_require__(51), exports);
tslib_1.__exportStar(__webpack_require__(52), exports);
tslib_1.__exportStar(__webpack_require__(53), exports);
tslib_1.__exportStar(__webpack_require__(54), exports);
tslib_1.__exportStar(__webpack_require__(57), exports);
tslib_1.__exportStar(__webpack_require__(58), exports);
tslib_1.__exportStar(__webpack_require__(59), exports);
tslib_1.__exportStar(__webpack_require__(69), exports);
tslib_1.__exportStar(__webpack_require__(70), exports);


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignInDto = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(45);
const class_validator_1 = __webpack_require__(46);
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
/* 45 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 46 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResendVerifyEmail = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(45);
const class_validator_1 = __webpack_require__(46);
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
/* 48 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteAccountDto = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(45);
const class_validator_1 = __webpack_require__(46);
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
/* 49 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeactivateDto = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(45);
const class_validator_1 = __webpack_require__(46);
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
/* 50 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VerifyEmailOtp = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(45);
const class_validator_1 = __webpack_require__(46);
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
/* 51 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthenticateDto = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(45);
const class_validator_1 = __webpack_require__(46);
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
/* 52 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RefreshTokenDto = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(45);
const class_validator_1 = __webpack_require__(46);
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
/* 53 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignInOauth = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(45);
const class_validator_1 = __webpack_require__(46);
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
/* 54 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAccountDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(46);
const password_1 = __webpack_require__(55);
const password_match_1 = __webpack_require__(56);
const swagger_1 = __webpack_require__(45);
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
/* 55 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IsStrongPasswordConstraint = void 0;
exports.IsStrongPassword = IsStrongPassword;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(46);
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
/* 56 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IsPasswordMatchConstraint = void 0;
exports.IsPasswordMatch = IsPasswordMatch;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(46);
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
/* 57 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateProfileDto = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(45);
const class_validator_1 = __webpack_require__(46);
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
/* 58 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChangePasswordDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(46);
const password_1 = __webpack_require__(55);
const swagger_1 = __webpack_require__(45);
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
/* 59 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountPagingDto = void 0;
const tslib_1 = __webpack_require__(4);
const paging_dto_1 = __webpack_require__(60);
const swagger_1 = __webpack_require__(45);
const class_validator_1 = __webpack_require__(46);
const guard_1 = __webpack_require__(13);
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
/* 60 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PagingDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_transformer_1 = __webpack_require__(61);
const class_validator_1 = __webpack_require__(46);
const swagger_1 = __webpack_require__(45);
const query_builder_1 = __webpack_require__(62);
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
/* 61 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(63), exports);
tslib_1.__exportStar(__webpack_require__(64), exports);
tslib_1.__exportStar(__webpack_require__(67), exports);
tslib_1.__exportStar(__webpack_require__(65), exports);
tslib_1.__exportStar(__webpack_require__(68), exports);


/***/ }),
/* 63 */
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
/* 64 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueryBuilderModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const query_builder_service_1 = __webpack_require__(65);
const query_builder_constant_1 = __webpack_require__(67);
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
/* 65 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var QueryBuilderService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueryBuilderService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const sequelize_1 = __webpack_require__(66);
const query_builder_type_1 = __webpack_require__(63);
const query_builder_constant_1 = __webpack_require__(67);
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
/* 66 */
/***/ ((module) => {

module.exports = require("sequelize");

/***/ }),
/* 67 */
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
/* 68 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InjectQueryBuilder = void 0;
const common_1 = __webpack_require__(1);
const query_builder_constant_1 = __webpack_require__(67);
const InjectQueryBuilder = () => (0, common_1.Inject)(query_builder_constant_1.QUERY_BUILDER_TOKEN);
exports.InjectQueryBuilder = InjectQueryBuilder;


/***/ }),
/* 69 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateExpProfileDto = exports.DeleteSocialProfileDto = exports.UpdateSocialProfileDto = exports.CreateSocialProfileDto = void 0;
const tslib_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(45);
const class_validator_1 = __webpack_require__(46);
const types_1 = __webpack_require__(35);
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
/* 70 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileActivityDto = void 0;
class ProfileActivityDto {
}
exports.ProfileActivityDto = ProfileActivityDto;


/***/ }),
/* 71 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(72), exports);
tslib_1.__exportStar(__webpack_require__(75), exports);


/***/ }),
/* 72 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthMsgPattern = void 0;
const module_1 = __webpack_require__(73);
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
/* 73 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountModule = void 0;
const __1 = __webpack_require__(74);
exports.AccountModule = Object.freeze({
    Auth: `${__1.MicroServiceName.Account}/Auth`,
    Profile: `${__1.MicroServiceName.Account}/Profile`,
});


/***/ }),
/* 74 */
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
/* 75 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileMsgPattern = void 0;
const module_1 = __webpack_require__(73);
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
/* 76 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AccountService_1;
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const event_emitter_1 = __webpack_require__(77);
const jwt_1 = __webpack_require__(15);
const sequelize_1 = __webpack_require__(39);
const config_1 = __webpack_require__(5);
const cache_manager_1 = __webpack_require__(78);
const exception_1 = __webpack_require__(86);
const mailer_1 = __webpack_require__(89);
const account_1 = __webpack_require__(12);
const profile_1 = __webpack_require__(26);
const types_1 = __webpack_require__(35);
const rxjs_1 = __webpack_require__(85);
const bcrypt_service_1 = __webpack_require__(93);
const axios_1 = __webpack_require__(95);
const account_2 = __webpack_require__(24);
const query_builder_1 = __webpack_require__(62);
let AccountService = AccountService_1 = class AccountService {
    constructor(profileModel, accountModel, jwtService, eventEmitter, mailerService, bcryptService, configService, cacheService, queryBuilder) {
        this.profileModel = profileModel;
        this.accountModel = accountModel;
        this.jwtService = jwtService;
        this.eventEmitter = eventEmitter;
        this.mailerService = mailerService;
        this.bcryptService = bcryptService;
        this.configService = configService;
        this.cacheService = cacheService;
        this.queryBuilder = queryBuilder;
        this.logger = new common_1.Logger(AccountService_1.name);
        this.TTL_CACHE_TIME = 7 * 24 * 60 * 60;
        this.TTL_CACHE_VERIFY_EMAIL = 180;
        this.jwtConfig = this.configService.get('jwt');
    }
    handleChangePassword(body) {
        return (0, rxjs_1.of)({ message: account_2.AccountAlert.NotImplemented });
    }
    handleDeactivate(body) {
        return (0, rxjs_1.of)({ message: account_2.AccountAlert.NotImplemented });
    }
    handleVerifyEmail(payload) {
        return (0, rxjs_1.from)(this.jwtService.verifyAsync(payload.token, {
            secret: this.jwtConfig?.secret,
        })).pipe((0, rxjs_1.catchError)(() => {
            return (0, exception_1.throwException)(axios_1.HttpStatusCode.BadRequest, account_2.AccountAlert.VerificationTokenExpired);
        }), (0, rxjs_1.switchMap)((source) => {
            const key = `${types_1.AccountVerifyStatusEnum.UNVERIFY}#${source.email}`;
            return this.cacheService.get(key).pipe((0, rxjs_1.switchMap)((response) => {
                if (!response) {
                    return (0, exception_1.throwException)(axios_1.HttpStatusCode.BadRequest, account_2.AccountAlert.VerificationTokenExpired);
                }
                if (payload?.token !== response?.token) {
                    return (0, exception_1.throwException)(axios_1.HttpStatusCode.BadRequest, account_2.AccountAlert.VerificationError);
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
            this.logger.log('accountResponse: ', accountResponse?.id);
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
            this.eventEmitter.emit(cache_manager_1.CacheMessageAction.Create, {
                key,
                value: fullyData,
                ttl: this.TTL_CACHE_TIME,
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
            this.logger.error(account_2.AccountAlert.VerificationEmailError);
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
                ttl: this.TTL_CACHE_VERIFY_EMAIL,
            });
        }))
            .subscribe();
    }
    handleCreateProfile(body, accountId) {
        return (0, rxjs_1.from)(this.profileModel.create({
            ...body,
            accountId,
        })).pipe();
    }
    handleUpdateProfile(body, profileId) {
        return (0, rxjs_1.from)(this.profileModel.update(body, {
            where: { id: profileId },
        })).pipe();
    }
    createAccountForSoicalLogin({ email, name, bio, avatarUrl, credentialType, githubLink, }) {
        let accountData;
        this.logger.log('CREATE new account and profile');
        return (0, rxjs_1.from)(this.accountModel.create({ email, credentialType, isVerify: true })).pipe((0, rxjs_1.map)((account) => {
            accountData = account.toJSON();
            return accountData;
        }), (0, rxjs_1.switchMap)((account) => this.handleUpdateProfile({
            fullName: name,
            avatarUrl,
            bio,
            githubLink,
        }, account.id).pipe((0, rxjs_1.tap)((profile) => {
            const key = this.getCacheKey(email, credentialType);
            delete accountData?.password;
            this.eventEmitter.emit(cache_manager_1.CacheMessageAction.Create, {
                key,
                value: { ...accountData, profile },
                ttl: this.TTL_CACHE_TIME,
            });
        }), (0, rxjs_1.map)((profile) => ({
            ...accountData,
            profile,
        })))));
    }
    handleDeleteAccount(body) {
        return (0, rxjs_1.from)(this.accountModel.findOne({ where: { id: body.id } })).pipe((0, rxjs_1.catchError)(() => (0, exception_1.throwException)(axios_1.HttpStatusCode.InternalServerError, account_2.AccountAlert.ProfileDeleteError)), (0, rxjs_1.switchMap)((user) => {
            if (user) {
                return (0, rxjs_1.from)(user.destroy()).pipe((0, rxjs_1.map)(() => ({
                    message: account_2.AccountAlert.ProfileDeleteSuccess,
                    data: body.id,
                })));
            }
            return (0, exception_1.throwException)(axios_1.HttpStatusCode.NotFound, account_2.AccountAlert.AccountNotFound);
        }));
    }
    getCacheKey(email, credentialType = types_1.CredentialTypeEnum.NONE) {
        return `ACCOUNT#${email}#${credentialType}`;
    }
    getProfileCacheKey(profileId) {
        return `PROFILE#${profileId}`;
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
    getExistingAccountByEmail(email, credentialType = types_1.CredentialTypeEnum.NONE) {
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
            })).pipe((0, rxjs_1.map)((response) => {
                const jsonData = response?.toJSON?.();
                delete jsonData?.password;
                return jsonData;
            }), (0, rxjs_1.tap)((fullyData) => {
                const key = this.getCacheKey(email);
                this.eventEmitter.emit(cache_manager_1.CacheMessageAction.Create, {
                    key,
                    value: fullyData,
                    ttl: this.TTL_CACHE_TIME,
                });
            }));
        }));
    }
    /**
     * @description Get the existing profile by profileId, check in cache before get from database
     */
    getExistingProfileByProfileId(profileId) {
        const cacheKey = this.getProfileCacheKey(profileId);
        return this.cacheService.get(cacheKey).pipe((0, rxjs_1.switchMap)((cacheData) => {
            if (cacheData) {
                return (0, rxjs_1.of)(cacheData);
            }
            return (0, rxjs_1.from)(this.profileModel.findOne({
                where: { id: profileId },
            })).pipe((0, rxjs_1.map)((response) => response?.toJSON()), (0, rxjs_1.tap)((fullyData) => {
                const key = this.getProfileCacheKey(profileId);
                this.eventEmitter.emit(cache_manager_1.CacheMessageAction.Create, {
                    key,
                    value: fullyData,
                    ttl: this.TTL_CACHE_TIME,
                });
            }));
        }));
    }
    handlePagingAccount(body) {
        const { offset, limit, sortBy, sortOrder, filter } = body;
        const whereClause = this.queryBuilder.build({
            filters: filter,
            offset,
            limit,
            sortBy,
            sortOrder,
            group: [],
        });
        return (0, rxjs_1.from)(this.accountModel.findAndCountAll(whereClause)).pipe((0, rxjs_1.map)(({ rows, count }) => ({
            data: rows,
            meta: {
                total: count,
                offset,
                limit,
            },
        })));
    }
};
exports.AccountService = AccountService;
exports.AccountService = AccountService = AccountService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, sequelize_1.InjectModel)(profile_1.Profile)),
    tslib_1.__param(1, (0, sequelize_1.InjectModel)(account_1.Account)),
    tslib_1.__param(8, (0, query_builder_1.InjectQueryBuilder)()),
    tslib_1.__metadata("design:paramtypes", [Object, Object, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof event_emitter_1.EventEmitter2 !== "undefined" && event_emitter_1.EventEmitter2) === "function" ? _b : Object, typeof (_c = typeof mailer_1.EmailService !== "undefined" && mailer_1.EmailService) === "function" ? _c : Object, typeof (_d = typeof bcrypt_service_1.BcryptService !== "undefined" && bcrypt_service_1.BcryptService) === "function" ? _d : Object, typeof (_e = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _e : Object, typeof (_f = typeof cache_manager_1.CacheManagerService !== "undefined" && cache_manager_1.CacheManagerService) === "function" ? _f : Object, typeof (_g = typeof query_builder_1.QueryBuilderService !== "undefined" && query_builder_1.QueryBuilderService) === "function" ? _g : Object])
], AccountService);


/***/ }),
/* 77 */
/***/ ((module) => {

module.exports = require("@nestjs/event-emitter");

/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(79), exports);
tslib_1.__exportStar(__webpack_require__(81), exports);
tslib_1.__exportStar(__webpack_require__(84), exports);


/***/ }),
/* 79 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheManagerModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const cache_listener_service_1 = __webpack_require__(80);
const ioredis_1 = __webpack_require__(82);
const cache_manager_service_1 = __webpack_require__(84);
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
/* 80 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var CacheListener_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheListener = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const event_emitter_1 = __webpack_require__(77);
const cache_message_1 = __webpack_require__(81);
const ioredis_1 = __webpack_require__(82);
const ioredis_2 = tslib_1.__importDefault(__webpack_require__(83));
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
/* 81 */
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
/* 82 */
/***/ ((module) => {

module.exports = require("@nestjs-modules/ioredis");

/***/ }),
/* 83 */
/***/ ((module) => {

module.exports = require("ioredis");

/***/ }),
/* 84 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var CacheManagerService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheManagerService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const ioredis_1 = tslib_1.__importDefault(__webpack_require__(83));
const ioredis_2 = __webpack_require__(82);
const rxjs_1 = __webpack_require__(85);
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
/* 85 */
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),
/* 86 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(87), exports);
tslib_1.__exportStar(__webpack_require__(88), exports);


/***/ }),
/* 87 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GlobalRpcExceptionFilter = exports.CustomRpcException = void 0;
const tslib_1 = __webpack_require__(4);
const microservices_1 = __webpack_require__(42);
const common_1 = __webpack_require__(1);
const rxjs_1 = __webpack_require__(85);
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
/* 88 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.throwException = void 0;
const rxjs_1 = __webpack_require__(85);
const rcp_exception_1 = __webpack_require__(87);
const throwException = (code, message) => (0, rxjs_1.throwError)(() => {
    return new rcp_exception_1.CustomRpcException(code, message);
});
exports.throwException = throwException;


/***/ }),
/* 89 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(90), exports);
tslib_1.__exportStar(__webpack_require__(91), exports);


/***/ }),
/* 90 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MailerModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const mailer_service_1 = __webpack_require__(91);
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
/* 91 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmailService = exports.EMAIL_TEMPLATE = exports.RESEND_FORGOT_PASSWORD_TEMPLATE = exports.VERIFY_SIGN_UP = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const rxjs_1 = __webpack_require__(85);
const nodemailer_1 = __webpack_require__(92);
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
/* 92 */
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),
/* 93 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BcryptService = void 0;
const tslib_1 = __webpack_require__(4);
const config_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const bcrypt = tslib_1.__importStar(__webpack_require__(94));
const rxjs_1 = __webpack_require__(85);
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
/* 94 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 95 */
/***/ ((module) => {

module.exports = require("axios");

/***/ }),
/* 96 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(97), exports);


/***/ }),
/* 97 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BcryptModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const bcrypt_service_1 = __webpack_require__(93);
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
/* 98 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(99), exports);
tslib_1.__exportStar(__webpack_require__(100), exports);


/***/ }),
/* 99 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GlobalEventEmitterModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const event_emitter_1 = __webpack_require__(77);
const event_emitter_service_1 = __webpack_require__(100);
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
/* 100 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var EventEmitterService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventEmitterService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const event_emitter_1 = __webpack_require__(77);
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
/* 101 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const auth_service_1 = __webpack_require__(102);
const auth_controller_1 = __webpack_require__(106);
const axios_1 = __webpack_require__(104);
const database_1 = __webpack_require__(9);
const jwt_1 = __webpack_require__(15);
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
/* 102 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AuthService_1;
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const config_1 = __webpack_require__(5);
const jwt_1 = __webpack_require__(15);
const rxjs_1 = __webpack_require__(85);
const operators_1 = __webpack_require__(103);
const exception_1 = __webpack_require__(86);
const axios_1 = __webpack_require__(104);
const sequelize_1 = __webpack_require__(39);
const google_auth_library_1 = __webpack_require__(105);
const account_1 = __webpack_require__(12);
const axios_2 = __webpack_require__(95);
const bcrypt_service_1 = __webpack_require__(93);
const types_1 = __webpack_require__(35);
const account_2 = __webpack_require__(24);
const account_service_1 = __webpack_require__(76);
let AuthService = AuthService_1 = class AuthService {
    constructor(accountModel, jwtService, httpService, bcryptService, configService, accountService) {
        this.accountModel = accountModel;
        this.jwtService = jwtService;
        this.httpService = httpService;
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
        return (0, rxjs_1.of)(payload).pipe((0, operators_1.map)((payload) => ({
            accessToken: this.jwtService.sign(payload, {
                expiresIn: this.jwtConfig.accessExpiry,
                secret: this.jwtConfig.secret,
            }),
        })), (0, operators_1.tap)((token) => this.logger.log('accessToken: ', token?.accessToken)), (0, operators_1.map)(({ accessToken }) => ({
            accessToken,
            refreshToken: this.jwtService.sign(payload, {
                expiresIn: this.jwtConfig.refreshExpiry,
                secret: this.jwtConfig.secret,
            }),
        })), (0, operators_1.tap)((token) => this.logger.log('refreshToken: ', token.refreshToken)), (0, operators_1.catchError)((error) => (0, exception_1.throwException)(500, account_2.AccountAlert.TokenGenerationError)));
    }
    // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
    generateAccessToken(payload) {
        return (0, rxjs_1.of)(payload).pipe((0, operators_1.map)((payload) => ({
            accessToken: this.jwtService.sign(payload, {
                expiresIn: this.jwtConfig.accessExpiry,
                secret: this.jwtConfig.secret,
            }),
        })), (0, operators_1.tap)((token) => this.logger.log('generateAccessTokens: ', token.accessToken)), (0, operators_1.catchError)((error) => (0, exception_1.throwException)(500, account_2.AccountAlert.TokenGenerationError)));
    }
    verifyToken(token) {
        return (0, rxjs_1.from)(this.jwtService.verifyAsync(token, { secret: this.jwtConfig?.secret })).pipe((0, operators_1.catchError)(() => (0, exception_1.throwException)(401, account_2.AccountAlert.TokenError)));
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
            const payload = {
                email: jsonData?.email,
                credentialType: jsonData?.credentialType,
                fullName: jsonData?.profile?.fullName,
                role: jsonData?.role,
            };
            return this.generateFullTokens(payload).pipe((0, operators_1.map)((tokens) => ({
                data: {
                    ...jsonData,
                    tokens,
                },
                message: account_2.AccountAlert.AccountVerified,
            })));
        }));
    }
    handleSendTokenVerifyEmail(body) {
        return this.accountService.getExistingAccountByEmail(body.email).pipe((0, operators_1.switchMap)((existingUser) => {
            if (!existingUser) {
                return (0, exception_1.throwException)(common_1.HttpStatus.NOT_FOUND, account_2.AccountAlert.AccountNotFound);
            }
            if (existingUser && !existingUser.isVerify) {
                return (0, rxjs_1.of)({
                    message: account_2.AccountAlert.VerificationEmailSent.replace('{email}', body.email),
                }).pipe((0, operators_1.tap)(() => {
                    this.accountService.handleSendTokenVerifyEmail({
                        email: body.email,
                        credentialType: existingUser.credentialType,
                    });
                }));
            }
            return (0, exception_1.throwException)(common_1.HttpStatus.BAD_REQUEST, account_2.AccountAlert.AccountAlreadyVerified);
        }));
    }
    handleSignUp({ email, password, confirmPassword }) {
        return this.accountService.getExistingAccountByEmail(email).pipe((0, operators_1.switchMap)((existingUser) => {
            if (existingUser && existingUser?.isVerify) {
                return (0, exception_1.throwException)(common_1.HttpStatus.BAD_REQUEST, account_2.AccountAlert.AccountAlreadyExists);
            }
            if (existingUser && !existingUser?.isVerify) {
                return (0, exception_1.throwException)(common_1.HttpStatus.BAD_REQUEST, account_2.AccountAlert.AccountNotVerified);
            }
            return this.accountService.handleCreateAccount({
                email: email,
                password: password,
                confirmPassword,
            });
        }), (0, operators_1.map)((response) => ({
            data: response,
            message: account_2.AccountAlert.AccountCreated,
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
            attributes: ['email', 'password'],
        })).pipe((0, operators_1.switchMap)((userData) => {
            if (userData) {
                userData = userData.toJSON();
                return this.bcryptService
                    .comparePassword(password, userData.password)
                    .pipe((0, operators_1.switchMap)((isMatch) => {
                    if (!isMatch) {
                        return (0, exception_1.throwException)(common_1.HttpStatus.BAD_REQUEST, account_2.AccountAlert.LoginFailed);
                    }
                    return this.accountService
                        .getExistingAccountByEmail(email, types_1.CredentialTypeEnum.NONE)
                        .pipe((0, operators_1.switchMap)((response) => {
                        const payload = {
                            email: response?.email,
                            credentialType: response?.credentialType,
                            fullName: response?.profile?.fullName,
                            role: response?.role,
                        };
                        return (0, rxjs_1.from)(this.generateFullTokens(payload)).pipe((0, operators_1.map)((tokens) => ({
                            message: account_2.AccountAlert.LoginSuccess,
                            data: {
                                ...response,
                                tokens,
                            },
                        })));
                    }));
                }));
            }
            return (0, exception_1.throwException)(axios_2.HttpStatusCode.BadRequest, account_2.AccountAlert.LoginFailed);
        }));
    }
    handleSignInWithToken({ token }) {
        return this.verifyToken(token).pipe((0, operators_1.switchMap)(() => {
            const source = this.jwtService.decode(token);
            if (!source?.email) {
                return (0, exception_1.throwException)(axios_2.HttpStatusCode.Unauthorized, account_2.AccountAlert.TokenExpired);
            }
            return this.accountService.getExistingAccountByEmail(source.email, source.credentialType);
        }), (0, operators_1.switchMap)((response) => {
            if (!response) {
                return (0, exception_1.throwException)(axios_2.HttpStatusCode.NotFound, account_2.AccountAlert.AccountNotFound);
            }
            delete response.password;
            return (0, rxjs_1.of)({
                data: response,
                message: account_2.AccountAlert.LoginSuccess,
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
        })).pipe((0, operators_1.catchError)(() => (0, exception_1.throwException)(axios_2.HttpStatusCode.Forbidden, account_2.AccountAlert.TokenExpired)), (0, operators_1.switchMap)((decodedData) => {
            if (!decodedData || !decodedData?.email) {
                return (0, exception_1.throwException)(axios_2.HttpStatusCode.Forbidden, account_2.AccountAlert.TokenExpired);
            }
            return this.accountService
                .getExistingAccountByEmail(decodedData.email, decodedData.credentialType)
                .pipe((0, operators_1.switchMap)((cacheData) => {
                if (cacheData) {
                    delete cacheData?.password;
                    const payload = {
                        email: cacheData?.email,
                        credentialType: cacheData?.credentialType,
                        fullName: cacheData?.profile?.fullName,
                    };
                    return this.generateAccessToken(payload).pipe((0, operators_1.map)((token) => ({
                        data: token,
                        message: account_2.AccountAlert.TokenRefreshSuccess,
                    })));
                }
                return (0, exception_1.throwException)(axios_2.HttpStatusCode.Forbidden, account_2.AccountAlert.TokenExpired);
            }));
        }));
    }
    handleOAuthGoogle({ token }) {
        this.logger.log('handleOAuthGoogle: ', token);
        return (0, rxjs_1.from)(this.oauthClient.verifyIdToken({
            idToken: token,
            audience: this.googleConfig.clientId,
        })).pipe((0, operators_1.catchError)(() => (0, exception_1.throwException)(axios_2.HttpStatusCode.BadRequest, account_2.AccountAlert.GoogleAuthError)), (0, operators_1.map)((googlResponse) => googlResponse.getPayload()), (0, operators_1.switchMap)((response) => {
            return this.accountService
                .getExistingAccountByEmail(response.email, types_1.CredentialTypeEnum.GOOLGE)
                .pipe((0, operators_1.switchMap)((existingAccount) => {
                if (existingAccount) {
                    delete existingAccount.password;
                    const payload = {
                        email: existingAccount?.email,
                        credentialType: existingAccount?.credentialType,
                        fullName: existingAccount?.profile?.fullName,
                        role: existingAccount?.role,
                    };
                    return this.generateFullTokens(payload).pipe((0, operators_1.map)((tokens) => ({
                        message: account_2.AccountAlert.OAuthLoginSuccess,
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
                return this.accountService
                    .createAccountForSoicalLogin(payload)
                    .pipe((0, operators_1.catchError)((error) => {
                    this.logger.error('Error creating profile:', error);
                    return (0, exception_1.throwException)(common_1.HttpStatus.INTERNAL_SERVER_ERROR, account_2.AccountAlert.ProfileCreateError);
                }), (0, operators_1.switchMap)((data) => {
                    const payload = {
                        email: existingAccount?.email,
                        credentialType: existingAccount?.credentialType,
                        fullName: existingAccount?.profile?.fullName,
                        role: existingAccount?.role,
                    };
                    return this.generateFullTokens(payload).pipe((0, operators_1.map)((tokens) => ({
                        message: account_2.AccountAlert.LoginSuccess,
                        data: { ...data, tokens },
                    })));
                }));
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
                return (0, exception_1.throwException)(common_1.HttpStatus.BAD_REQUEST, account_2.AccountAlert.GithubAuthError);
            }
            return tokenMatch;
        }), (0, operators_1.switchMap)((token) => {
            this.logger.log('Received Token:', token);
            return this.getGithubUserInfo(token);
        }), (0, operators_1.switchMap)((userInfo) => this.handleGetOrCreateGithubAccount(userInfo.data)), (0, operators_1.catchError)((error) => {
            this.logger.error('Error during OAuth sign-in:', error);
            return (0, exception_1.throwException)(common_1.HttpStatus.INTERNAL_SERVER_ERROR, account_2.AccountAlert.OAuthError);
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
            return (0, exception_1.throwException)(common_1.HttpStatus.BAD_REQUEST, account_2.AccountAlert.GithubUserInfoError);
        }));
    }
    handleGetOrCreateGithubAccount(userInfo) {
        const { email, name, avatar_url, bio, login, html_url } = userInfo;
        this.logger.log('GitHubUser: ', userInfo);
        const _email = email || login + '@github.com';
        return this.accountService
            .getExistingAccountByEmail(_email, types_1.CredentialTypeEnum.GITHUB)
            .pipe((0, operators_1.switchMap)((existingAccount) => {
            if (existingAccount) {
                delete existingAccount.password;
                const payload = {
                    email: existingAccount?.email,
                    credentialType: existingAccount?.credentialType,
                    fullName: existingAccount?.profile?.fullName,
                    role: existingAccount?.role,
                };
                return this.generateFullTokens(payload).pipe((0, operators_1.map)((tokens) => ({
                    message: account_2.AccountAlert.OAuthLoginSuccess,
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
            return this.accountService.createAccountForSoicalLogin(payload).pipe((0, operators_1.catchError)((error) => {
                this.logger.error('Error creating profile:', error);
                return (0, exception_1.throwException)(common_1.HttpStatus.INTERNAL_SERVER_ERROR, account_2.AccountAlert.ProfileCreateError);
            }), (0, operators_1.switchMap)((data) => {
                const payload = {
                    email: data?.email,
                    credentialType: data?.credentialType,
                    fullName: data?.profile?.fullName,
                    role: data?.role,
                };
                return this.generateFullTokens(payload).pipe((0, operators_1.map)((tokens) => ({
                    message: account_2.AccountAlert.LoginSuccess,
                    data: { ...data, tokens },
                })));
            }));
        }));
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, sequelize_1.InjectModel)(account_1.Account)),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _b : Object, typeof (_c = typeof bcrypt_service_1.BcryptService !== "undefined" && bcrypt_service_1.BcryptService) === "function" ? _c : Object, typeof (_d = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _d : Object, typeof (_e = typeof account_service_1.AccountService !== "undefined" && account_service_1.AccountService) === "function" ? _e : Object])
], AuthService);


/***/ }),
/* 103 */
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),
/* 104 */
/***/ ((module) => {

module.exports = require("@nestjs/axios");

/***/ }),
/* 105 */
/***/ ((module) => {

module.exports = require("google-auth-library");

/***/ }),
/* 106 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const microservices_1 = __webpack_require__(42);
const account_1 = __webpack_require__(43);
const account_2 = __webpack_require__(71);
const auth_service_1 = __webpack_require__(102);
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


/***/ }),
/* 107 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const database_1 = __webpack_require__(9);
const mailer_1 = __webpack_require__(89);
const jwt_1 = __webpack_require__(15);
const config_1 = __webpack_require__(5);
const configs_1 = __webpack_require__(6);
const query_builder_1 = __webpack_require__(62);
const profile_controller_1 = __webpack_require__(108);
const profile_service_1 = __webpack_require__(109);
let ProfileModule = class ProfileModule {
};
exports.ProfileModule = ProfileModule;
exports.ProfileModule = ProfileModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        controllers: [profile_controller_1.ProfileController],
        providers: [profile_service_1.ProfileService],
        imports: [
            database_1.DatabaseConfigFeature,
            mailer_1.MailerModule,
            query_builder_1.QueryBuilderModule,
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
        exports: [profile_service_1.ProfileService],
    })
], ProfileModule);


/***/ }),
/* 108 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const microservices_1 = __webpack_require__(42);
const account_1 = __webpack_require__(71);
const profile_service_1 = __webpack_require__(109);
const account_2 = __webpack_require__(43);
let ProfileController = class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
    }
    handleUpdateStreak(id) {
        return this.profileService.handleGetDetailProfile(id);
    }
    handleUpdateExp(id) {
        return this.profileService.handleGetDetailProfile(id);
    }
    handleGetDetailProfile(id) {
        return this.profileService.handleGetDetailProfile(id);
    }
    handleAddSocialProfile(body) {
        return this.profileService.handleAddSocialProfile(body);
    }
    handleUpdateSocialProfile(body) {
        return this.profileService.handleUpdateSocialProfile(body);
    }
    handleDeleteSocialProfile(body) {
        return this.profileService.handleDeleteSocialProfile(body);
    }
};
exports.ProfileController = ProfileController;
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)(account_1.ProfileMsgPattern.UpdateStreak),
    tslib_1.__param(0, (0, microservices_1.Payload)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ProfileController.prototype, "handleUpdateStreak", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)(account_1.ProfileMsgPattern.UpdateExp),
    tslib_1.__param(0, (0, microservices_1.Payload)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ProfileController.prototype, "handleUpdateExp", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)(account_1.ProfileMsgPattern.GetAllRelatedInfoProfile),
    tslib_1.__param(0, (0, microservices_1.Payload)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ProfileController.prototype, "handleGetDetailProfile", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)(account_1.ProfileMsgPattern.AddSocialProfile),
    tslib_1.__param(0, (0, microservices_1.Payload)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof account_2.CreateSocialProfileDto !== "undefined" && account_2.CreateSocialProfileDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ProfileController.prototype, "handleAddSocialProfile", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)(account_1.ProfileMsgPattern.UpdateSocialProfile),
    tslib_1.__param(0, (0, microservices_1.Payload)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof account_2.UpdateSocialProfileDto !== "undefined" && account_2.UpdateSocialProfileDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ProfileController.prototype, "handleUpdateSocialProfile", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)(account_1.ProfileMsgPattern.DeleteSocialProfile),
    tslib_1.__param(0, (0, microservices_1.Payload)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof account_2.DeleteSocialProfileDto !== "undefined" && account_2.DeleteSocialProfileDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ProfileController.prototype, "handleDeleteSocialProfile", null);
exports.ProfileController = ProfileController = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof profile_service_1.ProfileService !== "undefined" && profile_service_1.ProfileService) === "function" ? _a : Object])
], ProfileController);


/***/ }),
/* 109 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var ProfileService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const sequelize_1 = __webpack_require__(39);
const profile_1 = __webpack_require__(26);
const rxjs_1 = __webpack_require__(85);
const cache_manager_1 = __webpack_require__(78);
const event_emitter_1 = __webpack_require__(77);
const profile_social_model_1 = __webpack_require__(33);
const account_1 = __webpack_require__(24);
const axios_1 = __webpack_require__(95);
const exception_1 = __webpack_require__(86);
const types_1 = __webpack_require__(35);
let ProfileService = ProfileService_1 = class ProfileService {
    constructor(profileModel, profileSocialModel, cacheService, eventEmitter) {
        this.profileModel = profileModel;
        this.profileSocialModel = profileSocialModel;
        this.cacheService = cacheService;
        this.eventEmitter = eventEmitter;
        this.logger = new common_1.Logger(ProfileService_1.name);
        this.TTL_CACHE_TIME = 7 * 24 * 60 * 60;
        this.cacheRealmMetadataKey = 'REALM_METADATA';
    }
    handleGetDetailProfile(id) {
        const cacheKey = this.getCacheKey(id, 'ALL');
        return this.cacheService.get(cacheKey).pipe((0, rxjs_1.mergeMap)((existingData) => {
            if (existingData) {
                return (0, rxjs_1.of)({ data: existingData });
            }
            return (0, rxjs_1.from)(this.profileModel.findOne({
                where: {
                    id,
                },
                attributes: ['id', 'totalExp'],
                include: [
                    {
                        association: 'realm',
                        required: false,
                        attributes: ['id', 'level', 'requireExp'],
                    },
                    {
                        where: { profileId: id },
                        association: 'profileSocials',
                        required: false,
                        attributes: ['status', 'id', 'link'],
                        include: [
                            {
                                association: 'socials',
                                attributes: ['logo'],
                                required: false,
                            },
                        ],
                    },
                    {
                        where: { profileId: id },
                        association: 'profileAchievements',
                        required: false,
                        attributes: ['id'],
                        include: [
                            {
                                association: 'achievements',
                                attributes: ['logo', 'name'],
                                required: false,
                            },
                        ],
                    },
                    {
                        where: { profileId: id },
                        association: 'profileMaterialArts',
                        required: false,
                        include: [
                            {
                                association: 'materialArts',
                                attributes: ['logo', 'name'],
                                required: false,
                            },
                        ],
                    },
                ],
            })).pipe((0, rxjs_1.tap)((response) => {
                console.log('Response: ', response);
                this.logger.log('Get profile detail successfully!');
                const jsonData = response.toJSON();
                this.eventEmitter.emit(cache_manager_1.CacheMessageAction.Create, {
                    key: cacheKey,
                    value: jsonData,
                    ttl: this.TTL_CACHE_TIME,
                });
            }), (0, rxjs_1.map)((response) => {
                const jsonData = response.toJSON();
                return {
                    data: jsonData,
                };
            }));
        }));
    }
    handleAddSocialProfile(body) {
        const { profileId, socialId, link } = body;
        return (0, rxjs_1.from)(this.profileSocialModel.findOne({ where: { profileId, socialId } })).pipe((0, rxjs_1.catchError)(() => (0, exception_1.throwException)(axios_1.HttpStatusCode.InternalServerError, account_1.AccountAlert.ProfilePerformError)), (0, rxjs_1.mergeMap)((existingItem) => {
            if (existingItem) {
                return (0, rxjs_1.of)({
                    data: existingItem,
                    message: account_1.AccountAlert.SocialProfileFailExisting,
                }); // Return existing item if found
            }
            return (0, rxjs_1.from)(this.profileSocialModel.create({ profileId, socialId, link })).pipe((0, rxjs_1.map)((response) => {
                const jsonData = response.toJSON();
                return {
                    data: jsonData,
                    message: account_1.AccountAlert.SocialProfileCreateSuccess,
                };
            }));
        }));
    }
    handleUpdateSocialProfile(body) {
        const id = body.id;
        delete body.id;
        return (0, rxjs_1.from)(this.profileSocialModel.update(body, {
            where: { id },
        })).pipe((0, rxjs_1.catchError)(() => (0, exception_1.throwException)(axios_1.HttpStatusCode.InternalServerError, account_1.AccountAlert.ProfilePerformError)), (0, rxjs_1.map)(() => {
            return {
                message: account_1.AccountAlert.SocialProfileUpdateSuccess,
            };
        }));
    }
    handleDeleteSocialProfile(body) {
        const id = body.id;
        return (0, rxjs_1.from)(this.profileSocialModel.destroy({
            where: { id },
        })).pipe((0, rxjs_1.catchError)(() => (0, exception_1.throwException)(axios_1.HttpStatusCode.InternalServerError, account_1.AccountAlert.ProfilePerformError)), (0, rxjs_1.map)(() => {
            return {
                message: account_1.AccountAlert.SocialProfileDeleteSuccess,
            };
        }));
    }
    handleUpdateStreak(id) {
        return (0, rxjs_1.from)(this.profileModel.findByPk(id, {
            attributes: ['streak'],
            rejectOnEmpty: true,
        })).pipe((0, rxjs_1.mergeMap)((data) => {
            data.streak++;
            return data.save();
        }), (0, rxjs_1.map)((response) => ({ message: '' })), (0, rxjs_1.catchError)(() => (0, exception_1.throwException)(axios_1.HttpStatusCode.InternalServerError, account_1.AccountAlert.ProfilePerformError)));
    }
    handleUpdateExp(body) {
        return (0, rxjs_1.forkJoin)([
            this.handleGetDetailProfile(body.id),
            this.cacheService.get(this.cacheRealmMetadataKey),
        ]).pipe((0, rxjs_1.switchMap)(([detailProfile, realmMetadata]) => {
            const earnExp = this.getExpForUserByActionType(body.actionType, 1);
            const currentExp = detailProfile.data?.totalExp;
            const nextLevel = detailProfile.data?.realm?.level + 1;
            const metadata = realmMetadata;
            const nextRealm = metadata.find((item) => nextLevel == item.level // Tìm cảnh giới tiếp theo
            );
            const payloadUpdate = {
                data: {
                    totalExp: Number(currentExp) + Number(earnExp),
                },
                options: {
                    where: {
                        id: body.id,
                    },
                },
            };
            if (currentExp + earnExp >= nextRealm.requireExp) {
                payloadUpdate.data['realmId'] = nextRealm.id;
            }
            console.log('Payload update exp: ', payloadUpdate);
            this.logger.log('Upload exp....');
            return this.profileModel.update(payloadUpdate.data, payloadUpdate.options);
        }), (0, rxjs_1.map)((response) => ({ message: '' })), (0, rxjs_1.catchError)(() => (0, exception_1.throwException)(axios_1.HttpStatusCode.InternalServerError, account_1.AccountAlert.ProfilePerformError)));
    }
    getCacheKey(id, type) {
        return `PROFILE_DETAIL#${type}#${id}`;
    }
    getExpForUserByActionType(actionType, ratio) {
        let result = 0;
        switch (actionType) {
            case types_1.ActionExpType.CHECK_IN:
                result = 10;
                break;
            case types_1.ActionExpType.READ_POST:
                result = 1;
                break;
            case types_1.ActionExpType.COMMENT_POST:
                result = 2;
                break;
            case types_1.ActionExpType.LIKE_POST:
                result = 1;
                break;
            case types_1.ActionExpType.DISLIKE_POST:
                result = 1;
                break;
            case types_1.ActionExpType.CREATE_GUILD:
                result = 1;
                break;
        }
        return ratio ? ratio * result : result;
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = ProfileService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, sequelize_1.InjectModel)(profile_1.Profile)),
    tslib_1.__param(1, (0, sequelize_1.InjectModel)(profile_social_model_1.ProfileSocial)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, typeof (_a = typeof cache_manager_1.CacheManagerService !== "undefined" && cache_manager_1.CacheManagerService) === "function" ? _a : Object, typeof (_b = typeof event_emitter_1.EventEmitter2 !== "undefined" && event_emitter_1.EventEmitter2) === "function" ? _b : Object])
], ProfileService);


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
const microservices_1 = __webpack_require__(42);
const exception_1 = __webpack_require__(86);
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