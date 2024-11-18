import { foreignKey, pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { comments } from "./comment.schema";
import { createInsertSchema } from "drizzle-zod";

export const belong = pgTable("belongs", {
    parent_comment: uuid("parent_comment").notNull(),
    parent_visitor: uuid("parent_visitor").notNull(),
    parent_post: uuid("parent_post").notNull(),
    child_comment: uuid("child_comment").notNull(),
    child_visitor: uuid("child_visitor").notNull(),
    child_post: uuid("child_post").notNull(),
}, (t) => [
    foreignKey({
        name: "parent_comment_fkey",
        columns: [t.parent_comment, t.parent_visitor, t.parent_post],
        foreignColumns: [comments.id, comments.visitor, comments.post],
    })
    .onDelete("cascade"),
    foreignKey({
        name: "child_comment_fkey",
        columns: [t.child_comment, t.child_visitor, t.child_post],
        foreignColumns: [comments.id, comments.visitor, comments.post],
    })
    .onDelete("cascade"),
    primaryKey({
        name: "belongs_pkey",
        columns: [t.parent_comment, t.parent_visitor, t.parent_post]
    }),
])

export const insertBelongSchema = createInsertSchema(belong);