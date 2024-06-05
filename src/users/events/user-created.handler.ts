import { EventStoreService } from '#core';
import { UserCreatedEvent } from '#users';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(private readonly eventStoreService: EventStoreService) {}

  async handle(event: UserCreatedEvent): Promise<void> {
    console.log('UserCreatedEvent', event);
    return this.eventStoreService.writeEvent(
      'user-stream',
      'UserCreatedEvent',
      event,
    );
  }
}
