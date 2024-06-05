import { CreateUserCommand } from '#users';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class UsersService {
  constructor(
    // @Inject() private drizzle: NodePgDatabase<typeof schema>,
    private readonly commandBus: CommandBus,
  ) {}

  async create(data: any) {
    return this.commandBus.execute(new CreateUserCommand(data));
  }

  //   async findOne(email: string) {
  //     return this.commandBus.execute(new FindUserCommand(email));
  //   }
}

