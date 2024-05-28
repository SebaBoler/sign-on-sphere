import { UserCreatedEvent, UsersService } from '#users';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(private readonly usersService: UsersService) {}

  async handle(event: UserCreatedEvent): Promise<void> {
    console.log('UserCreatedEvent', event);
    return this.usersService.create(event);
  }
}
