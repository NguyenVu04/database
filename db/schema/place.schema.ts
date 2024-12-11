import { InferSelectModel } from "drizzle-orm";
import { numeric, pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const places = pgTable("places", {
    longtitude: numeric("longtitude", { precision: 4 }).notNull(),
    latitude: numeric("latitude", { precision: 4 }).notNull(),
    address: varchar("address").notNull().notNull(),
    name: varchar("name").notNull(),
}, (t) => [
    primaryKey({
        name: "place_pkey",
        columns: [t.longtitude, t.latitude],
    }),
]);

export type Place = InferSelectModel<typeof places>;

export const insertPlaceSchema = createInsertSchema(places);