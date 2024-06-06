// event-store.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  EventStoreDBClient,
  jsonEvent,
  FORWARDS,
  START,
  StreamNotFoundError,
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
    console.log(`Writing event: ${eventType}`, eventData);
    const event = jsonEvent({
      type: eventType,
      data: eventData,
    });

    // await this.client.appendToStream(streamName, event);
    await this.client.appendToStream(streamName, [event]);
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

  async streamExists(streamName: string): Promise<boolean> {
    try {
      await this.client.readStream(streamName, {
        fromRevision: START,
        maxCount: 1,
      });
      return true;
    } catch (error) {
      if (error instanceof StreamNotFoundError) {
        return false;
      }
      throw error;
    }
  }

  async userExists(email: string): Promise<boolean> {
    try {
      const readStream = this.client.readStream('user-stream', {
        fromRevision: START,
        direction: FORWARDS,
      });

      for await (const { event } of readStream) {
        if (event && event.type === 'UserCreatedEvent') {
          const userData = event.data as { email: string };
          if (userData.email === email) {
            return true;
          }
        }
      }

      return false;
    } catch (error) {
      if (error instanceof StreamNotFoundError) {
        return false;
      }
      throw error;
    }
  }
}
