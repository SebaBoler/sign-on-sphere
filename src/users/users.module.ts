import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';
import { UsersService, userConfiguration } from '#users';

@Module({
  imports: [ConfigModule.forRoot({ cache: true, load: [userConfiguration] })],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
