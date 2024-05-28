import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CqrsModule } from '@nestjs/cqrs';
import { EventStoreModule } from './core/eventstore/eventstore.module';

@Module({
  imports: [EventStoreModule, UsersModule, CqrsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
