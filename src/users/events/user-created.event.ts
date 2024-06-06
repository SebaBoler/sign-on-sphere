import { InputCreateUserDto } from '../dtos/input.create-user.dto';

export class UserCreatedEvent {
  constructor(public readonly data: InputCreateUserDto) {}
}
