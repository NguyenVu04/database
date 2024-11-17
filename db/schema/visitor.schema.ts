import { pgTable, uuid } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { createInsertSchema } from "drizzle-zod";

export const visitors = pgTable("visitors", {
    id: uuid("id").primaryKey().references(() => users.id),
})

export const insertVisitorSchema = createInsertSchema(visitors);