import { pgTable, primaryKey, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { createInsertSchema } from "drizzle-zod";

export const phone_numbers = pgTable("phone_numbers", {
    user: uuid("user").notNull().references(() => users.id, {onDelete: "cascade"}),
    phone_number: varchar("phone_number", {length: 10}).notNull()
}, (t) => [
    primaryKey({
        name: "phone_number_pkey",
        columns: [t.user, t.phone_number],
    })
])

export const insertPhoneNumberSchema = createInsertSchema(phone_numbers);