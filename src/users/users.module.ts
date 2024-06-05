import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserController, UserService, userConfiguration } from '#users';

@Module({
  imports: [ConfigModule.forRoot({ cache: true, load: [userConfiguration] })],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}
