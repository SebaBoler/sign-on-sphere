import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventStoreService } from './eventstore.service';

@Module({
  imports: [CqrsModule],
  providers: [EventStoreService],
  exports: [EventStoreService],
})
export class EventStoreModule {}
