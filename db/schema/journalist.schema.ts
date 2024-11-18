import { date, pgTable, uuid } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { createInsertSchema } from "drizzle-zod";

export const journalists = pgTable("journalists", {
    id: uuid("id").references(() => users.id, {onDelete: "cascade"}).primaryKey(),
    date_of_employment: date("date_of_employment", {mode: "date"}).notNull()
})

export const insertJournalistSchema = createInsertSchema(journalists);