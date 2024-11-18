import { foreignKey, numeric, pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { auto_repair_shops } from "./autorepairshop.schema";
import { createInsertSchema } from "drizzle-zod";

export const vehicles = pgTable("vehicles", {
    longtitude: numeric("longtitude", {precision: 4}).notNull(),
    latitude: numeric("latitude", {precision: 4}).notNull(),
    type: varchar("type", {length: 16}).notNull(),
}, (t) => [
    foreignKey({
        name: "place_fkey",
        columns: [t.longtitude, t.latitude],
        foreignColumns: [auto_repair_shops.longtitude, auto_repair_shops.latitude],
    }),
    primaryKey({
        name: "vehicle_pkey",
        columns: [t.longtitude, t.latitude, t.type],
    })
]);

export const insertVehicleSchema = createInsertSchema(vehicles);