import { foreignKey, integer, numeric, pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { restaurants } from "./restaurant.schema";
import { createInsertSchema } from "drizzle-zod";

export const menu = pgTable("menu", {
    longtitude: numeric("longtitude", {precision: 4}).notNull(),
    latitude: numeric("latitude", {precision: 4}).notNull(),
    dish_price: integer("dish_price").notNull(),
    dish_name: varchar("dish_name", {length: 16}).notNull(),
    dish_description: varchar("dish_description", {length: 64}).notNull(),
}, (t) => [
    foreignKey({
        name: "restaurant_fkey",
        columns: [t.longtitude, t.latitude],
        foreignColumns: [restaurants.longtitude, restaurants.latitude],
    }),
    primaryKey({
        name: "menu_pkey",
        columns: [t.longtitude, t.latitude, t.dish_price, t.dish_name, t.dish_description],
    })
]);

export const insertMenuSchema = createInsertSchema(menu);