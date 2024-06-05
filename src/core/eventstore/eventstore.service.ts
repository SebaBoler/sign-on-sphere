// event-store.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  EventStoreDBClient,
  jsonEvent,
  FORWARDS,
  START,
} from '@eventstore/db-client';

@Injectable()
export class EventStoreService implements OnModuleInit {
  private client: EventStoreDBClient;

  onModuleInit() {
    this.client = EventStoreDBClient.connectionString(
      'esdb://admin:changeit@localhost:2113?tls=false',
    );
  }

  async writeEvent(streamName: string, eventType: string, eventData: any) {
    const event = jsonEvent({
      type: eventType,
      data: eventData,
    });

    await this.client.appendToStream(streamName, event);
  }

  async readEvents(streamName: string) {
    const events = [];
    const readStream = this.client.readStream(streamName, {
      fromRevision: START,
      direction: FORWARDS,
    });

    for await (const { event } of readStream) {
      if (!event) continue;
      events.push(event);
    }

    return events;
  }
}
