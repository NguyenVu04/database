import { sql } from "drizzle-orm";
import { check, date, pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

const gender = ["male", "female"] as const;

export const genderEnum = pgEnum('gender', gender);

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: varchar("email").notNull().unique(),
    name: varchar("name").notNull(),
    date_of_birth: date("date_of_birth", {mode: "date"}).notNull(),
    password: varchar("password").notNull(),
    gender: genderEnum().notNull(),
}, (t) => [
    check("age_check", sql`${t.date_of_birth} + interval '18 years' <= now()`),
    check("email_check", sql`${t.email} ~ /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm`),
]);

export const insertUserSchema = createInsertSchema(users, {
    email: z.string().email(),
    name: z.string().regex(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm),
    date_of_birth: z.date(),
    password: z.string(),
    gender: z.enum(gender),
});

