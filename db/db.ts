import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle({
    connection: {
        host: process.env.DATABASE_HOST as string,
        port: Number(process.env.DATABASE_PORT) ?? 5432,
        user: process.env.DATABASE_USER as string,
        password: process.env.DATABASE_PASS as string,
        database: process.env.DATABASE_NAME as string,
        ssl: true
    }
})

export default db;