import { doublePrecision, foreignKey, pgTable, primaryKey, smallint, uuid } from "drizzle-orm/pg-core";
import { places } from "./place.schema";
import { posts } from "./post.schema";
import { check } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

export const include = pgTable("include", {
    longitude: doublePrecision("longitude").notNull(),
    latitude: doublePrecision("latitude").notNull(),
    post: uuid("post").notNull(),
    visitor: uuid("visitor").notNull(),
    star: smallint("star").notNull(),
}, (t) => [
    foreignKey({
        name: "place_fkey",
        columns: [t.longitude, t.latitude],
        foreignColumns: [places.longitude, places.latitude],
    })
    .onDelete("cascade")
    .onUpdate("cascade"),
    foreignKey({
        name: "post_fkey",
        columns: [t.post, t.visitor],
        foreignColumns: [posts.id, posts.visitor],
    })
    .onDelete("cascade"),
    primaryKey({
        name: "include_pkey",
        columns: [t.longitude, t.latitude, t.post, t.visitor],
    }),
    check("star_check", sql`${t.star} between 1 and 5`)
]);

export const insertIncludeSchema = createInsertSchema(include);