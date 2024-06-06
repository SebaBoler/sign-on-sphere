import { InputCreateUserDto } from '../dtos/input.create-user.dto';

export class CreateUserCommand {
  constructor(public readonly data: InputCreateUserDto) {}
}
