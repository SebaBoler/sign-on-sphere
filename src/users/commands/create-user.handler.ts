// import { CreateUserCommand, UserCreatedEvent, UserService } from '#users';
import { ConflictException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { UserService } from '../users.service';
import { UserCreatedEvent } from '../events';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly userService: UserService,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const { name, email, password } = command;

    const userExists = await this.userService.userExists(name, email);
    if (userExists) {
      throw new ConflictException('User already exists');
    }
    console.log(
      `Creating user: ${name}, email: ${email}, password: ${password}`,
    );

    const userCreatedEvent = new UserCreatedEvent(name, email, password);
    this.eventBus.publish(userCreatedEvent);
  }
}

// import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
// import { CreateUserCommand } from '../impl/create-user.command';

// @CommandHandler(CreateUserCommand)
// export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
//   constructor(/* dependencies */) {}

//   async execute(command: CreateUserCommand): Promise<any> {
//     // handler logic
//   }
// }
