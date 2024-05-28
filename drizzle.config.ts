import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  schema: './src/users/drizzle/schema/index.ts',
  out: './src/users/drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'postgres',
  },
  verbose: true,
  strict: true,
});
