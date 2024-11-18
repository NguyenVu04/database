import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const hashtags = pgTable("hashtags", {
    name: varchar("name", {length: 64}).primaryKey(),
});

export const insertHashtagSchema = createInsertSchema(hashtags);