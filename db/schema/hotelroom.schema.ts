import { foreignKey, integer, numeric, pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { hotels } from "./hotel.schema";
import { createInsertSchema } from "drizzle-zod";

export const hotel_rooms = pgTable("hotel_rooms", {
    longtitude: numeric("longtitude", {precision: 4}).notNull(),
    latitude: numeric("latitude", {precision: 4}).notNull(),
    room_type: varchar("room_type", {length: 16}).notNull(),
    room_price: integer("room_price").notNull(),
}, (t) => [
    foreignKey({
        name: "place_fkey",
        columns: [t.longtitude, t.latitude],
        foreignColumns: [hotels.longtitude, hotels.latitude],
    }), 
    primaryKey({
        name: "hotel_room_pkey",
        columns: [t.longtitude, t.latitude, t.room_type, t.room_price],
    })
])

export const insertHotelRoomSchema = createInsertSchema(hotel_rooms);