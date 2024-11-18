import { check, date, foreignKey, json, numeric, pgTable, primaryKey, smallint, uuid } from "drizzle-orm/pg-core";
import { places } from "./place.schema";
import { journalists } from "./journalist.schema";
import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { sql } from "drizzle-orm";
export type Review = {
    content: string,
    mediaUrl?: string[],
}

export const reviews = pgTable("reviews", {
    longtitude: numeric("longtitude", { precision: 4 }).notNull(),
    latitude: numeric("latitude", { precision: 4 }).notNull(),
    post_date: date("post_date", {mode: "date"}).notNull().defaultNow(),
    star: smallint().notNull(),    
    content: json("content").notNull(),
    journalist: uuid("journalist").notNull().references(() => journalists.id),
}, (t) => [
    primaryKey({
        name: "reviews_pkey",
        columns: [t.longtitude, t.latitude, t.post_date],
    }),
    foreignKey({
        name: "place_fkey",
        columns: [t.longtitude, t.latitude],
        foreignColumns: [places.longtitude, places.latitude],
    })
    .onDelete("cascade")
    .onUpdate("cascade"),
    check("star_check", sql`${t.star} between 1 and 5`),
]);

export const insertReviewSchema = createInsertSchema(reviews, {
    content: z.object({
        content: z.string().max(200),
        mediaUrl: z.array(z.string()) || undefined || null
    }),
    star: z.number().min(1).max(5),
})