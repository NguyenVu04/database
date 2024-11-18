import { pgTable, uuid } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { createInsertSchema } from "drizzle-zod";

export const service_providers = pgTable("service_providers", {
    id: uuid("id").references(() => users.id, {onDelete: "cascade"}).primaryKey(),
})

export const insertServiceProviderSchema = createInsertSchema(service_providers);