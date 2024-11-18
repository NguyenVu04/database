import { numeric, pgTable, primaryKey, uuid, varchar } from "drizzle-orm/pg-core";
import { service_providers } from "./serviceprovider.schema";
import { createInsertSchema } from "drizzle-zod";

export const services = pgTable("services", {
    longtitude: numeric("longtitude", { precision: 4 }),
    latitude: numeric("latitude", { precision: 4 }),
    name: varchar("name").notNull(),
    provider: uuid("provider").notNull().references(() => service_providers.id, {onDelete: "cascade"}),
}, (t) => [
    primaryKey({
        name: "service_pkey",
        columns: [t.longtitude, t.latitude],
    })
]);

export const insertServiceSchema = createInsertSchema(services);