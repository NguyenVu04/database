import { date, pgTable, primaryKey, smallint, uuid, varchar } from "drizzle-orm/pg-core";
import { tour_guide } from "./tourguide.schema";
import { check } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

export const booked = pgTable("booked", {
    tourguide: uuid("tour_guide").notNull().references(() => tour_guide.id, {onDelete: "cascade"}),
    visitor: uuid("visitor").notNull().references(() => tour_guide.id, {onDelete: "cascade"}),
    comment: varchar("comment", {length: 100}),
    start_date: date("start_date", {mode: "date"}).notNull(),
    end_date: date("end_date", {mode: "date"}).notNull(),
    rating: smallint("rating").notNull(),
}, (t) => [
    primaryKey({
        name: "booked_pkey",
        columns: [t.tourguide, t.visitor],
    }),
    check("start_date_check", sql`${t.start_date} <= ${t.end_date}`),
    check("date_check", sql`${t.start_date} <= ${t.end_date}`),
])

export const insertBookedSchema = createInsertSchema(booked);