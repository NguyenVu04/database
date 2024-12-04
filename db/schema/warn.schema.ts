import { pgTable, primaryKey, serial, uuid, varchar } from "drizzle-orm/pg-core";
import { admins } from "./admin.schema";
import { users } from "./user.schema";
import { createInsertSchema } from "drizzle-zod";

export const warn = pgTable("warn", {
    admin_id: serial("admin_id").notNull().references(() => admins.id, {onDelete: "cascade"}),
    user: uuid("user").notNull().references(() => users.id, {onDelete: "cascade"}),
    content: varchar("content", {length: 64}).notNull()
}, (t) => [
    primaryKey({
        name: "warn_pkey",
        columns: [t.admin_id, t.user],
    })
])

export const insertWarnSchema = createInsertSchema(warn);