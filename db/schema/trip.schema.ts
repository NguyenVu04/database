import { date, pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { visitors } from "./visitor.schema";
import { check } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

export const trips = pgTable("trips", {
    id: uuid("id").notNull().defaultRandom(),
    visitor: uuid("visitor").notNull().references(() => visitors.id, {onDelete: "cascade"}),
    start_date: date("start_date", {mode: "date"}).notNull(),
    end_date: date("end_date", {mode: "date"}).notNull(),
}, (t) => [
    primaryKey({
        name: "trip_pkey",
        columns: [t.id, t.visitor],
    }),
    check("date_check", sql`${t.start_date} <= ${t.end_date}`),
])

export const insertTripSchema = createInsertSchema(trips);