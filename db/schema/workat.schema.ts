import { check, date, foreignKey, numeric, pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { tour_guide } from "./tourguide.schema";
import { places } from "./place.schema";
import { createInsertSchema } from "drizzle-zod";
import { sql } from "drizzle-orm";

export const work_at = pgTable("work_at", {
    longtitude: numeric("longtitude", {precision: 4}).notNull(),
    latitude: numeric("latitude", {precision: 4}).notNull(),
    tour_guide: uuid("tour_guide").references(() => tour_guide.id, {onDelete: "cascade"}).notNull(),
    start_date: date("start_date", {mode: "date"}).notNull(),
}, (t) => [
    foreignKey({
        name: "place_fkey",
        columns: [t.longtitude, t.latitude],
        foreignColumns: [places.longtitude, places.latitude],
    }),
    primaryKey({
        name: "work_at_pkey",
        columns: [t.longtitude, t.latitude, t.tour_guide],
    }),
    check("start_date_check", sql`${t.start_date} <= now()`),
])

export const insertWorkAtSchema = createInsertSchema(work_at);