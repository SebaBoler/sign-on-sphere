import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { notificationConfiguration } from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, load: [notificationConfiguration] }),
  ],
  controllers: [],
  providers: [],
})
export class NotificationsModule {}
