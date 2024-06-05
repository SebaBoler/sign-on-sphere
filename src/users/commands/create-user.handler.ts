import { CreateUserCommand, UserCreatedEvent, UserService } from '#users';
import { ConflictException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly userService: UserService,
  ) {}

  async execute(command: CreateUserCommand) {
    const { name, email, password } = command;

    const userExists = await this.userService.userExists(name, email);
    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const userCreatedEvent = new UserCreatedEvent(name, email, password);
    this.eventBus.publish(userCreatedEvent);
  }
}
