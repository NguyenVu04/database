import { foreignKey, pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { posts } from "./post.schema";
import { visitors } from "./visitor.schema";
import { createInsertSchema } from "drizzle-zod";
import { InferSelectModel } from "drizzle-orm";

export const reports = pgTable("reports", {
    post: uuid("post").notNull(),
    visitor: uuid("visitor").notNull(),
    reporter: uuid("reporter").notNull().references(() => visitors.id, {onDelete: "cascade"}), 
}, (t) => [
    primaryKey({
        name: "report_pkey",
        columns: [t.post, t.visitor, t.reporter],
    }),
    foreignKey({
        name: "post_fkey",
        foreignColumns: [posts.id, posts.visitor],
        columns: [t.post, t.visitor],
    })
    .onDelete("cascade"),
]);

export type Report = InferSelectModel<typeof reports>;
export const insertReportSchema = createInsertSchema(reports);