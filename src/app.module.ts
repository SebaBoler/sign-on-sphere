import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { NotificationsModule } from './notifications/notifications.module';
import { NotificationsController } from './notifications/notifications.controller';
import { NotificationsService } from './notifications/notifications.service';
import { UsersModule } from './users/users.module';
import { CqrsModule } from '@nestjs/cqrs';
import { EventStoreModule } from './core/eventstore/eventstore.module';

@Module({
  imports: [EventStoreModule, UsersModule, NotificationsModule, CqrsModule],
  controllers: [AppController, AuthController, NotificationsController],
  providers: [AppService, NotificationsService],
})
export class AppModule {}
