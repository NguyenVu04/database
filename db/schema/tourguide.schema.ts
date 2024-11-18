import { pgTable, uuid } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { createInsertSchema } from "drizzle-zod";

export const tour_guide = pgTable("tour_guide", {
    id: uuid("id").references(() => users.id, {onDelete: "cascade"}).primaryKey(),
})

export const insertTourGuideSchema = createInsertSchema(tour_guide);