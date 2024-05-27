import { Body, Controller } from '@nestjs/common';
import { ApiPost } from 'src/core/decorators/api-post.decorator';
import { InputCreateUserDto } from './dtos/input.create-user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands';

@Controller('v1/users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @ApiPost('create', {
    description: 'Create a new user',
    type: InputCreateUserDto,
    useAuthGuard: false,
  })
  async create(@Body() body: InputCreateUserDto): Promise<void> {
    await this.commandBus.execute<CreateUserCommand, void>(
      new CreateUserCommand(body),
    );
  }
}
