import { check, foreignKey, numeric, pgTable, primaryKey, time } from "drizzle-orm/pg-core";
import { services } from "./service.schema";
import { createInsertSchema } from "drizzle-zod";
import { sql } from "drizzle-orm";

export const shifts = pgTable("shifts", {
    longtitude: numeric("longtitude", {precision: 4}).notNull(),
    latitude: numeric("latitude", {precision: 4}).notNull(),
    start_time: time("start_time").notNull(),
    end_time: time("end_time").notNull(),
}, (t) => [
    foreignKey({
        name: "service_fkey",
        columns: [t.longtitude, t.latitude],
        foreignColumns: [services.longtitude, services.latitude],
    })
    .onDelete("cascade"),
    primaryKey({
        name: "shift_pkey",
        columns: [t.longtitude, t.latitude, t.start_time, t.end_time],
    }),
    check("time_check", sql`${t.start_time} < ${t.end_time}`)
])

export const insertShiftSchema = createInsertSchema(shifts);