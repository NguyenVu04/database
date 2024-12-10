import { foreignKey, pgTable, primaryKey, uuid, varchar } from "drizzle-orm/pg-core";
import { hashtags } from "./hashtag.schema";
import { posts } from "./post.schema";
import { createInsertSchema } from "drizzle-zod";

export const added_in = pgTable("added_in", {
    hash_tag: varchar("hash_tag", {length: 64}).notNull().references(() => hashtags.name, {onDelete: "cascade"}),
    post: uuid("post").notNull(),
    visitor: uuid("visitor").notNull(),
}, (t) => [
    foreignKey({
        name: "post_fkey",
        columns: [t.post, t.visitor],
        foreignColumns: [posts.id, posts.visitor],
    })
    .onDelete("cascade"),
    primaryKey({
        name: "added_in_pkey",
        columns: [t.hash_tag, t.post, t.visitor],
    })
])

export const insertAddedInSchema = createInsertSchema(added_in);