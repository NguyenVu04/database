import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
export const admins = pgTable("admins", {
    email: varchar("email").primaryKey(),
    password: varchar("password").notNull(),
});

export const insertAdminSchema = createInsertSchema(admins, {
    email: z.string().email(),
});