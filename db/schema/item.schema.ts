import { foreignKey, integer, numeric, pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { convinience_stores } from "./conviniencestore.schema";
import { createInsertSchema } from "drizzle-zod";

export const items = pgTable("items", {
    longtitude: numeric("longtitude", {precision: 4}).notNull(),
    latitude: numeric("latitude", {precision: 4}).notNull(),
    price: integer("price").notNull(),
    name: varchar("name", {length: 16}).notNull(),
}, (t) => [
    foreignKey({
        name: "convinience_store_fkey",
        columns: [t.longtitude, t.latitude],
        foreignColumns: [convinience_stores.longtitude, convinience_stores.latitude],
    }),
    primaryKey({
        name: "item_pkey",
        columns: [t.longtitude, t.latitude, t.price, t.name],
    })
]);

export const insertItemSchema = createInsertSchema(items);