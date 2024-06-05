import { InputCreateUserDto } from '../dtos/input.create-user.dto';

export class CreateUserCommand {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {}
}
