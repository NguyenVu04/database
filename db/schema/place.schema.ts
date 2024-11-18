import { numeric, pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const place = pgTable("place", {
    longtitude: numeric("longtitude", { precision: 4 }).notNull(),
    latitude: numeric("latitude", { precision: 4 }).notNull(),
    address: varchar("address").notNull().notNull(),
    name: varchar("name").notNull(),
}, (t) => [
    primaryKey({
        name: "place_pkey",
        columns: [t.longtitude, t.latitude],
    }),
])

export const insertPlaceSchema = createInsertSchema(place);