import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CacheMessageAction } from '@shared/cache-manager';
import { Socket, Server } from 'socket.io';
import { ActivitySocket } from '@shared/message-pattern/activity';

@WebSocketGateway({
  path: '/profile_channel',
  namespace: 'profile',
})
export class ProfileGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ProfileGateway.name);
  private readonly CACHE_CONNECTED_CLIENTS = 'profile.connected.clients';
  private userSocketMap = new Map<string, Socket>();

  constructor(private eventEmitter: EventEmitter2) {}

  @SubscribeMessage(ActivitySocket.UserPingOnline)
  @SubscribeMessage(ActivitySocket.UserPingOnline)
  handleUserPingOnline(
    client: Socket,
    payload: { accountId: string; profileId: string }
  ) {
    if (this.userSocketMap.has(payload.profileId)) {
      this.logger.log(`Client already online ${payload.profileId}`);
      return;
    }

    // Store the mapping of id to socket client
    this.userSocketMap.set(payload.profileId, client);
    this.eventEmitter.emit(CacheMessageAction.ArrayAdd, {
      key: this.CACHE_CONNECTED_CLIENTS,
      value: { ...payload, socketId: client.id },
    });
    this.logger.log(`Client online ${payload.profileId}`);
  }

  handleConnection(client: Socket) {
    this.logger.log('Client connected');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected ${client.id}`);
    // Remove from userSocketMap
    for (const [id, socket] of this.userSocketMap.entries()) {
      if (socket === client) {
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
      userSocket.emit(event, data);
      this.logger.log(`Emit to profile ${profileId} event ${event}`);
      return;
    }
    this.logger.log(`No user socket found for profile ${profileId}`);
  }
}
