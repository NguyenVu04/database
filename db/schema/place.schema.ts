import { InferSelectModel } from "drizzle-orm";
import { doublePrecision, pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const places = pgTable("places", {
    longitude: doublePrecision("longitude").notNull(),
    latitude: doublePrecision("latitude").notNull(),
    address: varchar("address").notNull().notNull(),
    name: varchar("name").notNull(),
}, (t) => [
    primaryKey({
        name: "place_pkey",
        columns: [t.longitude, t.latitude],
    }),
]);

export type Place = InferSelectModel<typeof places>;

export const insertPlaceSchema = createInsertSchema(places);