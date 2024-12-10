import { foreignKey, integer, numeric, pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { hotel_rooms } from "./hotelroom.schema";
import { createInsertSchema } from "drizzle-zod";

export const room_devices = pgTable("room_devices", {
    longtitude: numeric("longtitude", {precision: 4}).notNull(),
    latitude: numeric("latitude", {precision: 4}).notNull(),
    room_type: varchar("room_type", {length: 16}).notNull(),
    room_price: integer("room_price").notNull(),
    device_name: varchar("device_name", {length: 16}).notNull(),
    device_quantity: integer("device_quantity").notNull(),
}, (t) => [
    foreignKey({
        name: "hotel_room_fkey",
        columns: [t.longtitude, t.latitude, t.room_type, t.room_price],
        foreignColumns: [hotel_rooms.longtitude, hotel_rooms.latitude, hotel_rooms.room_type, hotel_rooms.room_price],
    })
    .onDelete("cascade"),
    primaryKey({
        name: "room_service_pkey",
        columns: [t.longtitude, t.latitude, t.room_type, t.room_price, t.device_name, t.device_quantity],
    })
]);

export const insertRoomServiceSchema = createInsertSchema(room_devices);