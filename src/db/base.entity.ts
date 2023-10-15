import { timestamp, uuid } from "drizzle-orm/pg-core"

export const baseEntity = {
  id: uuid("id").defaultRandom().unique().primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}
