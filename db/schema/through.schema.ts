import { check, date, foreignKey, numeric, pgTable, smallint, uuid } from "drizzle-orm/pg-core";
import { trips } from "./trip.schema";
import { places } from "./place.schema";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const through = pgTable("through", {
    trip: uuid("trip").notNull(),
    visitor: uuid("visitor").notNull(),
    longtitude: numeric("longtitude", {precision: 4}).notNull(),
    latitude: numeric("latitude", {precision: 4}).notNull(),
    arrived_date: date("arrived_date", {mode: "date"}).notNull(),
    arrived_hour: smallint("arrived_hour").notNull(),
    departured_date: date("departured_date", {mode: "date"}).notNull(),
    departured_hour: smallint("departured_hour").notNull(),
}, (t) => [
    foreignKey({
        name: "trip_fkey",
        columns: [t.trip, t.visitor],
        foreignColumns: [trips.id, trips.visitor],
    })
    .onDelete("cascade"),
    foreignKey({
        name: "place_fkey",
        columns: [t.longtitude, t.latitude],
        foreignColumns: [places.longtitude, places.latitude],
    }),
    check("date_check", sql`${t.arrived_date} <= ${t.departured_date}`),
    check("hour_check", sql`${t.arrived_hour} <= ${t.departured_hour}`),
    check("valid_arrived_hour_check", sql`${t.arrived_hour} between 0 and 23`),
    check("valid_departured_hour_check", sql`${t.departured_hour} between 0 and 23`),
    check("arrived_before_departured_check", sql`(${t.arrived_date} < ${t.departured_date}) OR (${t.arrived_date} = ${t.departured_date} AND ${t.arrived_hour} < ${t.departured_hour})`),
])

export const insertThroughSchema = createInsertSchema(through, {
    arrived_hour: z.number().min(0).max(23),
    departured_hour: z.number().min(0).max(23),
});