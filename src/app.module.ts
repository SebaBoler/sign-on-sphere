import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { NotificationsService } from './notifications/notifications.service';
import { UsersModule } from './users/users.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [AuthModule, UserModule, UsersModule],
  controllers: [AppController, AuthController, UserController],
  providers: [AppService, NotificationsService],
})
export class AppModule {}
