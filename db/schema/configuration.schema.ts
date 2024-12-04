import { sql } from "drizzle-orm";
import { date, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { admins } from "./admin.schema";

export const configs = pgTable("configuration", {
    key: varchar("key").primaryKey(),
    value: varchar("value").notNull(),
    admin_id: serial("admin_id").references(() => admins.id, {onDelete: "set null"}),
    change_date: date("change_date", {mode: "date"}).notNull().defaultNow().$onUpdateFn(() => sql`current_date()`),
});

export const insertConfigSchema = createInsertSchema(configs);