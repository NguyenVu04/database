import { foreignKey, pgTable, primaryKey, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { trips } from "./trip.schema";
import { createInsertSchema } from "drizzle-zod";

export const notes = pgTable("notes", {
    trip: uuid("trip").notNull(),
    visitor: uuid("visitor").notNull(),
    time: timestamp("time", {mode: "date"}).notNull(),
    content: varchar("content", {length: 100}).notNull(),
}, (t) => [
    foreignKey({
        name: "trip_fkey",
        columns: [t.trip, t.visitor],
        foreignColumns: [trips.id, trips.visitor],
    })
    .onDelete("cascade"),
    primaryKey({
        name: "note_pkey",
        columns: [t.trip, t.visitor, t.time, t.content],
    })
])

export const insertNoteSchema = createInsertSchema(notes);