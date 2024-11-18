import { foreignKey, numeric, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { services } from "./service.schema";
import { createInsertSchema } from "drizzle-zod";

export const convinience_stores = pgTable("convinience_stores", {
    longtitude: numeric("longtitude", {precision: 4}).notNull(),
    latitude: numeric("latitude", {precision: 4}).notNull(),
}, (t) => [
    foreignKey({
        name: "convinience_store_fkey",
        columns: [t.longtitude, t.latitude],
        foreignColumns: [services.longtitude, services.latitude],
    }),
    primaryKey({
        name: "convinience_store_pkey",
        columns: [t.longtitude, t.latitude],
    })
])

export const insertConvinienceStoreSchema = createInsertSchema(convinience_stores);