import { relations } from "drizzle-orm"
import { pgTable, text } from "drizzle-orm/pg-core"

import { baseEntity } from "../base.entity"
import { groups } from "./group.entity"

export const users = pgTable("users", {
  ...baseEntity,
  sub: text("sub").notNull(),
  username: text("username"),
})

export const usersRelations = relations(users, ({ many }) => ({
  groups: many(groups),
}))
