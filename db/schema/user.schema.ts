import { sql } from "drizzle-orm";
import { check, date, pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { InferSelectModel } from "drizzle-orm";

export const genderEnum = pgEnum('gender', ["male", "female"]);

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: varchar("email").notNull().unique(),
    name: varchar("name").notNull(),
    date_of_birth: date("date_of_birth", {mode: "date"}).notNull(),
    password: varchar("password").notNull(),
    gender: genderEnum().notNull(),
}, (t) => [
    check("age_check", sql`${t.date_of_birth} + interval '18 years' <= now()`),
]);

export const insertUserSchema = createInsertSchema(users, {
    email: z.string().email(),
});

export type User = InferSelectModel<typeof users> & { phone_numbers: string[] };