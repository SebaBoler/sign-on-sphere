import { sql } from 'drizzle-orm';
import {
  pgSchema,
  timestamp,
  unique,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const user = pgSchema('users');

export const users = user.table(
  'users',
  {
    id: uuid('user_id')
      .primaryKey()
      .default(sql`uuid_generate_v4()`),
    username: varchar('username').notNull(),
    name: varchar('name').notNull(),
    email: varchar('email'),
    password: varchar('password'),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at'),
  },
  (t) => ({
    unq_email: unique('email').on(t.email),
    emailIdx: uniqueIndex('email').on(t.email),
  }),
);
