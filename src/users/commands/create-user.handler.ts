// import { CreateUserCommand, UserCreatedEvent, UserService } from '#users';
import { ConflictException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { UserService } from '../users.service';
import { UserCreatedEvent } from '../events';
import { EventStoreService } from '#core';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly userService: UserService,
    private readonly eventStoreService: EventStoreService,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const { name, email, password } = command.data;

    const userExists = await this.eventStoreService.userExists(email);
    if (userExists) {
      throw new ConflictException('User already exists');
    }
    console.log(
      `Creating user: ${name}, email: ${email}, password: ${password}`,
    );

    const userCreatedEvent = new UserCreatedEvent({ name, email, password });
    this.eventBus.publish(userCreatedEvent);
  }
}
