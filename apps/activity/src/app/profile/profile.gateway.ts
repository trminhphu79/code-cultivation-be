import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CacheMessageAction } from '@shared/cache-manager';
import { Socket, Server } from 'socket.io';
import { ActivitySocket } from '@shared/message-pattern/activity';

@WebSocketGateway({ namespace: 'profile' })
export class ProfileGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  io: Server;

  private readonly logger = new Logger(ProfileGateway.name);
  private readonly CACHE_CONNECTED_CLIENTS = 'profile.connected.clients';
  private userSocketMap = new Map<
    string,
    { socket: Socket; profileId: string }
  >();

  constructor(private eventEmitter: EventEmitter2) {}

  afterInit(server: Server) {
    this.logger.log('Initialized');
    this.io = server;
    // console.log('Config: ', this.io.of('/profile_channel'));
  }

  @SubscribeMessage(ActivitySocket.UserPingOnline)
  handleUserPingOnline(
    client: Socket,
    payload: { accountId: string; profileId: string }
  ) {
    if (!payload || !payload.profileId) {
      this.logger.error('Invalid payload');
      this.io.emit(ActivitySocket.UserPingOnlineFailed, {
        message: 'Ping User Failed, Invalid payload',
      });
      return;
    }

    console.log('online with payload: ', payload);
    if (this.userSocketMap.has(payload.profileId)) {
      this.logger.log(`Client already online ${payload.profileId}`);
      return;
    }

    // Store the mapping of id to socket client
    this.userSocketMap.set(payload.profileId, {
      socket: client,
      profileId: payload.profileId,
    });
    this.eventEmitter.emit(CacheMessageAction.ArrayAdd, {
      key: this.CACHE_CONNECTED_CLIENTS,
      item: { ...payload, socketId: client.id },
      ttl: 60 * 60 * 24,
    });
    this.logger.log(`Client online ${payload.profileId}`);
    this.io.emit(ActivitySocket.ProfileAddExperience, {
      exp: 100,
      profileId: payload.profileId,
    });
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client id: ${client.id} connected`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected ${client.id}`);
    // Remove from userSocketMap
    for (const [id, socket] of this.userSocketMap.entries()) {
      if (socket.socket === client) {
        this.userSocketMap.delete(id);
        this.eventEmitter.emit(CacheMessageAction.ArrayRemove, {
          key: this.CACHE_CONNECTED_CLIENTS,
          predicate: `item.socketId === '${client.id}'`,
        });
        break;
      }
    }
    this.logger.log(`Client disconnected ${client.id}`);
  }

  // Method to emit to specific user
  emitToProfile(profileId: string, event: string, data: any) {
    const userSocket = this.userSocketMap.get(profileId);
    if (userSocket) {
      userSocket.socket.emit(event, data);
      this.logger.log(`Emit to profile ${profileId} event ${event}`);
      return;
    }
    this.logger.log(`No user socket found for profile ${profileId}`);
  }

  private getCacheKey(profileId: string) {
    return `${this.CACHE_CONNECTED_CLIENTS}#${profileId}`;
  }
}
