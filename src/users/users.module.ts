import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  CreateUserHandler,
  UserController,
  UserCreatedHandler,
  UserService,
  userConfiguration,
} from '#users';
import { CqrsModule } from '@nestjs/cqrs';
import { EventStoreService } from '#core';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, load: [userConfiguration] }),
    CqrsModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    CreateUserHandler,
    UserCreatedHandler,
    EventStoreService,
  ],
})
export class UsersModule {}
