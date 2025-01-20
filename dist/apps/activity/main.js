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
const profile_module_1 = __webpack_require__(5);
const nats_client_1 = __webpack_require__(24);
const cache_manager_1 = __webpack_require__(9);
const event_emitter_1 = __webpack_require__(26);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            profile_module_1.ProfileModule,
            nats_client_1.NatsClientModule,
            cache_manager_1.CacheManagerModule,
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const profile_gateway_1 = __webpack_require__(6);
const profile_listener_1 = __webpack_require__(22);
let ProfileModule = class ProfileModule {
};
exports.ProfileModule = ProfileModule;
exports.ProfileModule = ProfileModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [profile_listener_1.ProfileListener, profile_gateway_1.ProfileGateway],
    })
], ProfileModule);


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var ProfileGateway_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileGateway = void 0;
const tslib_1 = __webpack_require__(4);
const websockets_1 = __webpack_require__(7);
const common_1 = __webpack_require__(1);
const event_emitter_1 = __webpack_require__(8);
const cache_manager_1 = __webpack_require__(9);
const socket_io_1 = __webpack_require__(17);
const activity_1 = __webpack_require__(18);
let ProfileGateway = ProfileGateway_1 = class ProfileGateway {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.logger = new common_1.Logger(ProfileGateway_1.name);
        this.CACHE_CONNECTED_CLIENTS = 'profile.connected.clients';
        this.userSocketMap = new Map();
    }
    handleUserPingOnline(client, payload) {
        if (this.userSocketMap.has(payload.profileId)) {
            this.logger.log(`Client already online ${payload.profileId}`);
            return;
        }
        // Store the mapping of id to socket client
        this.userSocketMap.set(payload.profileId, client);
        this.eventEmitter.emit(cache_manager_1.CacheMessageAction.ArrayAdd, {
            key: this.CACHE_CONNECTED_CLIENTS,
            value: { ...payload, socketId: client.id },
        });
        this.logger.log(`Client online ${payload.profileId}`);
    }
    handleConnection(client) {
        this.logger.log('Client connected');
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected ${client.id}`);
        // Remove from userSocketMap
        for (const [id, socket] of this.userSocketMap.entries()) {
            if (socket === client) {
                this.userSocketMap.delete(id);
                this.eventEmitter.emit(cache_manager_1.CacheMessageAction.ArrayRemove, {
                    key: this.CACHE_CONNECTED_CLIENTS,
                    predicate: `item.socketId === '${client.id}'`,
                });
                break;
            }
        }
        this.logger.log(`Client disconnected ${client.id}`);
    }
    // Method to emit to specific user
    emitToProfile(profileId, event, data) {
        const userSocket = this.userSocketMap.get(profileId);
        if (userSocket) {
            userSocket.emit(event, data);
            this.logger.log(`Emit to profile ${profileId} event ${event}`);
            return;
        }
        this.logger.log(`No user socket found for profile ${profileId}`);
    }
};
exports.ProfileGateway = ProfileGateway;
tslib_1.__decorate([
    (0, websockets_1.WebSocketServer)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _b : Object)
], ProfileGateway.prototype, "server", void 0);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)(activity_1.ActivitySocket.UserPingOnline),
    (0, websockets_1.SubscribeMessage)(activity_1.ActivitySocket.UserPingOnline),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _c : Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ProfileGateway.prototype, "handleUserPingOnline", null);
exports.ProfileGateway = ProfileGateway = ProfileGateway_1 = tslib_1.__decorate([
    (0, websockets_1.WebSocketGateway)({
        path: '/profile_channel',
        namespace: 'profile',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof event_emitter_1.EventEmitter2 !== "undefined" && event_emitter_1.EventEmitter2) === "function" ? _a : Object])
], ProfileGateway);


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/websockets");

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@nestjs/event-emitter");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(10), exports);
tslib_1.__exportStar(__webpack_require__(12), exports);
tslib_1.__exportStar(__webpack_require__(15), exports);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheManagerModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const cache_listener_service_1 = __webpack_require__(11);
const ioredis_1 = __webpack_require__(13);
const cache_manager_service_1 = __webpack_require__(15);
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
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var CacheListener_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheListener = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const event_emitter_1 = __webpack_require__(8);
const cache_message_1 = __webpack_require__(12);
const ioredis_1 = __webpack_require__(13);
const ioredis_2 = tslib_1.__importDefault(__webpack_require__(14));
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
/* 12 */
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
/* 13 */
/***/ ((module) => {

module.exports = require("@nestjs-modules/ioredis");

/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("ioredis");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var CacheManagerService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheManagerService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const ioredis_1 = tslib_1.__importDefault(__webpack_require__(14));
const ioredis_2 = __webpack_require__(13);
const rxjs_1 = __webpack_require__(16);
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
/* 16 */
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = require("socket.io");

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(19), exports);
tslib_1.__exportStar(__webpack_require__(20), exports);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfilePattern = void 0;
exports.ProfilePattern = {};


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActivitySocket = exports.ActivityPattern = void 0;
const __1 = __webpack_require__(21);
exports.ActivityPattern = Object.freeze({
    UpdateExperience: `${__1.MicroServiceName.Activity}/UpdateExperience`,
});
exports.ActivitySocket = Object.freeze({
    ProfileAddExperience: 'PROFILE_ADD_EXPERIENCE',
    ProfileUpgradeLevel: 'PROFILE_UPGRADE_LEVEL',
    UserPingOnline: 'USER_PING_ONLINE',
});


/***/ }),
/* 21 */
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
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var ProfileListener_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileListener = void 0;
const tslib_1 = __webpack_require__(4);
const activity_1 = __webpack_require__(18);
const common_1 = __webpack_require__(1);
const microservices_1 = __webpack_require__(23);
const profile_gateway_1 = __webpack_require__(6);
let ProfileListener = ProfileListener_1 = class ProfileListener {
    constructor(profileGateway, natsClient) {
        this.profileGateway = profileGateway;
        this.natsClient = natsClient;
        this.logger = new common_1.Logger(ProfileListener_1.name);
    }
    async onModuleInit() {
        await this.natsClient.connect();
    }
    handleProfileEvent(data) {
        this.logger.log(`handleProfileEvent ${data.profileId}`);
        this.profileGateway.emitToProfile(data.profileId, activity_1.ActivitySocket.ProfileAddExperience, data);
    }
};
exports.ProfileListener = ProfileListener;
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)(activity_1.ActivityPattern.UpdateExperience),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ProfileListener.prototype, "handleProfileEvent", null);
exports.ProfileListener = ProfileListener = ProfileListener_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(1, (0, common_1.Inject)('NATS_SERVICE')),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof profile_gateway_1.ProfileGateway !== "undefined" && profile_gateway_1.ProfileGateway) === "function" ? _a : Object, typeof (_b = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _b : Object])
], ProfileListener);


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


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NatsClientModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const microservices_1 = __webpack_require__(23);
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
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(27), exports);
tslib_1.__exportStar(__webpack_require__(28), exports);


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GlobalEventEmitterModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const event_emitter_1 = __webpack_require__(8);
const event_emitter_service_1 = __webpack_require__(28);
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
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var EventEmitterService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventEmitterService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const event_emitter_1 = __webpack_require__(8);
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
/* 29 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-socket.io");

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
const platform_socket_io_1 = __webpack_require__(29);
async function bootstrap() {
    // Create hybrid application to support both NATS and WebSockets
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // Enable WebSocket adapter
    app.useWebSocketAdapter(new platform_socket_io_1.IoAdapter(app));
    // Configure NATS microservice
    app.connectMicroservice({
        transport: microservices_1.Transport.NATS,
        options: {
            servers: [process.env.NATS_URL || 'nats://localhost:4222'],
            queue: 'activity_queue',
        },
    });
    const wsPort = process.env.WS_PORT || 8888; // Different port for WebSocket server
    // Start both NATS and WebSocket server
    await app.startAllMicroservices();
    await app.listen(wsPort);
    common_1.Logger.log(`🚀 Activity Service is running:
    - WebSocket Server: ws://localhost:${wsPort}
    - NATS: ${process.env.NATS_URL || 'nats://localhost:4222'}
    - Queue: activity_queue`);
}
bootstrap();

})();

/******/ })()
;
//# sourceMappingURL=main.js.map