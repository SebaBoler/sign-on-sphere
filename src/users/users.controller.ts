import { UserService } from '#users';
import { Controller, Post, Body } from '@nestjs/common';
import { InputCreateUserDto } from './dtos/input.create-user.dto';
@Controller('v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: InputCreateUserDto) {
    const { name, email, password } = createUserDto;
    await this.userService.createUser(name, email, password);
  }
}
