import { foreignKey, numeric, pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import fuel_station from "./fuelstation.schema";
import { createInsertSchema } from "drizzle-zod";

const fuel = pgTable("fuel", {
    longtitude: numeric("longtitude", {precision: 4}).notNull(),
    latitude: numeric("latitude", {precision: 4}).notNull(),
    fuel_price: numeric("fuel_price").notNull(),
    fuel_type: varchar("fuel_type").notNull(),
}, (t) => [
    primaryKey({
        name: "fuel_pkey",
        columns: [t.longtitude, t.latitude, t.fuel_price, t.fuel_type],
    }),
    foreignKey({
        name: "place_fkey",
        columns: [t.longtitude, t.latitude],
        foreignColumns: [fuel_station.longtitude, fuel_station.latitude],
    })
    .onDelete("cascade"),
]);

export const insertFuelSchema = createInsertSchema(fuel);

export default fuel;