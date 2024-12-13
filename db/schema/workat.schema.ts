import { check, date, doublePrecision, foreignKey, pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { tour_guide } from "./tourguide.schema";
import { places } from "./place.schema";
import { createInsertSchema } from "drizzle-zod";
import { sql } from "drizzle-orm";

export const work_at = pgTable("work_at", {
    longitude: doublePrecision("longitude").notNull(),
    latitude: doublePrecision("latitude").notNull(),
    tour_guide: uuid("tour_guide").references(() => tour_guide.id, {onDelete: "cascade"}).notNull(),
    start_date: date("start_date", {mode: "date"}).notNull(),
}, (t) => [
    foreignKey({
        name: "place_fkey",
        columns: [t.longitude, t.latitude],
        foreignColumns: [places.longitude, places.latitude],
    })
    .onDelete("cascade")
    .onUpdate("cascade"),
    primaryKey({
        name: "work_at_pkey",
        columns: [t.longitude, t.latitude, t.tour_guide],
    }),
    check("start_date_check", sql`${t.start_date} <= now()`),
])

export const insertWorkAtSchema = createInsertSchema(work_at);