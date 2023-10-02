import { baseEntity } from "@/db/base.entity"
import { groups } from "@/db/schema/group.entity"
import { relations } from "drizzle-orm"
import { pgTable, text } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  ...baseEntity,
  sub: text("sub").notNull(),
  username: text("username"),
})

export const usersRelations = relations(users, ({ many }) => ({
  groups: many(groups),
}))
