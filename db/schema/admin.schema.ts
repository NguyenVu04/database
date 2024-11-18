import { sql } from "drizzle-orm";
import { check, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
export const admins = pgTable("admins", {
    email: varchar("email").primaryKey(),
    password: varchar("password").notNull(),
}, (t) => [
    check("email_check", sql`${t.email} ~ /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm`),
]);

export const insertAdminSchema = createInsertSchema(admins, {
    email: z.string().email(),
});