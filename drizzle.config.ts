import { config } from 'dotenv';

config({ path: './.env' });

if (!process.env.DATABASE_URL_POSTGRES) {
  throw new Error('DATABASE_URL_POSTGRES is not defined in .env');
}

export default {
  schema: './drizzle/schema.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL_POSTGRES,
  },
};
