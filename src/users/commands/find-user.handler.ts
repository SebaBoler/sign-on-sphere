import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { FindUserCommand, UsersService } from '#users';

@CommandHandler(FindUserCommand)
export class FindUserHandler {
  constructor(
    private readonly usersService: UsersService,
    private readonly eventBus: EventBus,
  ) {}

  //   async execute(command: FindUserCommand): Promise<any> {
  //     return this.usersService.findOne(command.email);
  //   }
}
