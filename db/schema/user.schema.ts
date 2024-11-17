import { date, pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

const gender = ["male", "female"] as const;

export const genderEnum = pgEnum('gender', gender);

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: varchar("email").notNull().unique(),
    name: varchar("name").notNull(),
    dob: date("date_of_birth", {mode: "date"}).notNull(),
    password: varchar("password").notNull(),
    gender: genderEnum().notNull(),
});

export const insertUserSchema = createInsertSchema(users, {
    email: z.string().email(),
    name: z.string().regex(/^[a-zA-Z0-9\s]+$/),
    dob: z.date(),
    password: z.string(),
    gender: z.enum(gender),
});

