import { relations } from "drizzle-orm"
import { pgTable, text, unique } from "drizzle-orm/pg-core"

import { baseEntity } from "../base.entity"
import { groups } from "./group.entity"

export const users = pgTable(
  "users",
  {
    ...baseEntity,
    username: text("username").unique(),
    email: text("email"),
    provider: text("provider", { enum: ["password", "github"] }),
  },
  (user) => ({
    uniqueProviderEmail: unique().on(user.provider, user.email),
    uniqueIdEmail: unique().on(user.id, user.email),
  })
)

export const usersRelations = relations(users, ({ many }) => ({
  groups: many(groups),
}))
