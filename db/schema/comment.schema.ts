import { date, foreignKey, pgTable, primaryKey, uuid, varchar } from "drizzle-orm/pg-core";
import { visitors } from "./visitor.schema";
import { posts } from "./post.schema";
import { createInsertSchema } from "drizzle-zod";

export const comments = pgTable("comments", {
    id: uuid("id").notNull().defaultRandom(),
    visitor: uuid("visitor").notNull(),
    post: uuid("post").notNull(),
    content: varchar("content", {length: 100}).notNull(),
    sender: uuid("sender").notNull().references(() => visitors.id, {onDelete: "cascade"}),
    comment_date: date("comment_date", {mode: "date"}).notNull().defaultNow(),
}, (t) => [
    foreignKey({
        name: "post_fkey",
        columns: [t.visitor, t.post],
        foreignColumns: [posts.visitor, posts.id],
    })
    .onDelete("cascade"),
    primaryKey({
        name: "comment_pkey",
        columns: [t.id, t.visitor, t.post],
    })
])

export const insertCommentSchema = createInsertSchema(comments);