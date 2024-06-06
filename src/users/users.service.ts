import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/create-user.command';

@Injectable()
export class UserService {
  private users = [];

  constructor(private readonly commandBus: CommandBus) {}

  async createUser(name: string, email: string, password: string) {
    await this.commandBus.execute(new CreateUserCommand(name, email, password));
  }

  async userExists(username: string, email: string): Promise<boolean> {
    // Tu powinna być logika sprawdzania w rzeczywistej bazie danych
    console.log('Checking if user exists:', username, email);
    const user = this.users.some(
      (user) => user.username === username || user.email === email,
    );
    console.log('User exists:', user);
    return user;
  }
}
