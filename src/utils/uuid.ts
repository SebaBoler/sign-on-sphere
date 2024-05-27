import { randomUUID } from 'crypto';

export const UUID = {
  randomUUID: (): UUID => randomUUID() as UUID,
  from: (uuid: string) => uuid as UUID,
};
