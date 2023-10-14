import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm"
import { index, pgTable, text, unique } from "drizzle-orm/pg-core"

import { baseEntity } from "../base.entity"
import { groups } from "./group.entity"

export const users = pgTable(
  "users",
  {
    ...baseEntity,
    name: text("name"),
    username: text("username").unique(),
    email: text("email").notNull(),
    provider: text("provider", { enum: ["password", "github"] }).notNull(),
  },
  (user) => ({
    uniqueProviderEmail: unique().on(user.provider, user.email),
    uniqueIdEmail: unique().on(user.id, user.email),

    usernameIndex: index().on(user.username),
  })
)

export const usersRelations = relations(users, ({ many }) => ({
  groups: many(groups),
}))

export type User = InferSelectModel<typeof users>
export type UserInsert = InferInsertModel<typeof users>
