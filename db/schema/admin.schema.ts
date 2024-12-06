import { InferSelectModel } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const admins = pgTable("admins", {
    id: serial("id").primaryKey(),
    password: varchar("password").notNull(),
});

export type Admin = InferSelectModel<typeof admins>;

export const insertAdminSchema = createInsertSchema(admins);