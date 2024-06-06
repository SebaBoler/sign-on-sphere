import { UserService } from '#users';
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { InputCreateUserDto } from './dtos/input.create-user.dto';

@Controller('v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: InputCreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async createUser(@Body() createUserDto: InputCreateUserDto) {
    const { name, email, password } = createUserDto;
    await this.userService.createUser(createUserDto);
  }
}
