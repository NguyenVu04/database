import { InferSelectModel } from "drizzle-orm";
import { char, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const admins = pgTable("admins", {
    id: char("id", {length: 10}).primaryKey(),
    password: varchar("password").notNull(),
});

export type Admin = InferSelectModel<typeof admins>;

export const insertAdminSchema = createInsertSchema(admins);