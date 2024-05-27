import { CreateUserCommand, UsersService } from '#users';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly usersService: UsersService) {}

  async execute(command: CreateUserCommand): Promise<void> {
    console.log('CreateUserCommand', command);
    return this.usersService.create(command);
  }
}
