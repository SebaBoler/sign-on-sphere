import 'reflect-metadata';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventStoreService } from 'src/core/eventstore';
import { UserCreatedEvent } from './user-created.event';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(private readonly eventStoreService: EventStoreService) {}

  async handle(event: UserCreatedEvent) {
    console.log('User created event handled:', event);

    const streamName = 'user-stream';
    const streamExists = await this.eventStoreService.streamExists(streamName);

    if (!streamExists) {
      console.log(`Stream ${streamName} does not exist. Creating stream.`);
    } else {
      console.log(`Stream ${streamName} exists.`);
    }

    await this.eventStoreService.writeEvent(
      'user-stream',
      'UserCreatedEvent',
      event.data,
    );
  }
}
