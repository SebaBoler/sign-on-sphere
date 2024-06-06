import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  CreateUserHandler,
  UserController,
  UserService,
  userConfiguration,
} from '#users';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, load: [userConfiguration] }),
    CqrsModule,
  ],
  controllers: [UserController],
  providers: [UserService, CreateUserHandler],
})
export class UsersModule {}
