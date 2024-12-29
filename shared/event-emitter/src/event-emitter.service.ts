import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EventEmitterService {
  private readonly logger = new Logger(EventEmitterService.name);

  constructor(private readonly eventEmitter: EventEmitter2) {}

  emit<T>(event: string, payload: T) {
    this.eventEmitter.emit(event, payload);
    this.logger.log(`Event emitted: ${event}`);
  }

  on<T>(event: string, listener: (payload: T) => void) {
    this.eventEmitter.on(event, listener);
    this.logger.log(`Listener registered for event: ${event}`);
  }
}
