/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  // Create hybrid application to support both NATS and WebSockets
  const app = await NestFactory.create(AppModule);

  // Enable WebSocket adapter
  app.useWebSocketAdapter(new IoAdapter(app));

  // Configure NATS microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: [process.env.NATS_URL || 'nats://localhost:4222'],
      queue: 'activity_queue',
    },
  });

  const wsPort = process.env.WS_PORT || 8888; // Different port for WebSocket server

  // Start both NATS and WebSocket server
  await app.startAllMicroservices();
  await app.listen(wsPort);

  Logger.log(
    `🚀 Activity Service is running:
    - WebSocket Server: ws://localhost:${wsPort}
    - NATS: ${process.env.NATS_URL || 'nats://localhost:4222'}
    - Queue: activity_queue`
  );
}

bootstrap();
