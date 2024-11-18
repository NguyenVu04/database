import { foreignKey, numeric, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { services } from "./service.schema";
import { createInsertSchema } from "drizzle-zod";

export const restaurants = pgTable("restaurants", {
    longtitude: numeric("longtitude", {precision: 4}).notNull(),
    latitude: numeric("latitude", {precision: 4}).notNull(),
}, (t) => [
    foreignKey({
        name: "place_fkey",
        columns: [t.longtitude, t.latitude],
        foreignColumns: [services.longtitude, services.latitude],
    }),
    primaryKey({
        name: "restaurant_pkey",
        columns: [t.longtitude, t.latitude],
    })
])

export const insertRestaurantSchema = createInsertSchema(restaurants);