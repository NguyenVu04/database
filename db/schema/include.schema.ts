import { foreignKey, numeric, pgTable, primaryKey, smallint, uuid } from "drizzle-orm/pg-core";
import { places } from "./place.schema";
import { posts } from "./post.schema";
import { check } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

export const include = pgTable("include", {
    longtitude: numeric("longtitude", {precision: 4}).notNull(),
    latitude: numeric("latitude", {precision: 4}).notNull(),
    post: uuid("post").notNull(),
    visitor: uuid("visitor").notNull(),
    star: smallint("star").notNull(),
}, (t) => [
    foreignKey({
        name: "place_fkey",
        columns: [t.longtitude, t.latitude],
        foreignColumns: [places.longtitude, places.latitude],
    }),
    foreignKey({
        name: "post_fkey",
        columns: [t.post, t.visitor],
        foreignColumns: [posts.id, posts.visitor],
    }),
    primaryKey({
        name: "include_pkey",
        columns: [t.longtitude, t.latitude, t.post, t.visitor],
    }),
    check("star_check", sql`${t.star} between 1 and 5`)
]);

export const insertIncludeSchema = createInsertSchema(include);