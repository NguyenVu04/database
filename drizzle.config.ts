import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './drizzle',
    schema: './db/schema/*.schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        host: process.env.DATABASE_HOST as string,
        port: Number(process.env.DATABASE_PORT) ?? 5432,
        user: process.env.DATABASE_USER as string,
        password: process.env.DATABASE_PASS as string,
        database: process.env.DATABASE_NAME as string,
        ssl: true
    }
});