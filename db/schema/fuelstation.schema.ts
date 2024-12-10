import { foreignKey, numeric, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { services } from "./service.schema";

const fuel_station = pgTable("fuel_station", {
    longtitude: numeric("longtitude", {precision: 4}).notNull(),
    latitude: numeric("latitude", {precision: 4}).notNull(),
}, (t) => [
    primaryKey({
        name: "fuel_station_pkey",
        columns: [t.longtitude, t.latitude],
    }),
    foreignKey({
        name: "place_fkey",
        columns: [t.longtitude, t.latitude],
        foreignColumns: [services.longtitude, services.latitude],
    })
    .onDelete("cascade"),
]);

export const insertFuelStationSchema = createInsertSchema(fuel_station);

export default fuel_station;