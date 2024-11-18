import { date, json, pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { visitors } from "./visitor.schema";
export type contentType = {
    content: string,
    mediaUrl?: string[]
}

export const posts = pgTable("posts", {
    id: uuid("id").defaultRandom(),
    visitor: uuid("visitor").notNull().references(() => visitors.id, {onDelete: "cascade"}),
    post_date: date("post_date", {mode: "date"}).notNull().defaultNow(),
    content: json("content").notNull(),
}, (t) => [
    primaryKey({
        name: "posts_pkey",
        columns: [t.id, t.visitor],
    }),
]);

export const inserPostSchema = createInsertSchema(posts, {
    visitor: z.string().uuid(),
    post_date: z.date(),
    content: z.object({
        content: z.string().max(200),
        mediaUrl: z.array(z.string()) || undefined || null
    })
})