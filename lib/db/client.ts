import { drizzle } from 'drizzle-orm/postgres-js'; import { sql } from '@neondatabase/serverless'; export const db = drizzle(sql(process.env.DATABASE_URL!));
