import { relations } from "drizzle-orm"
import { pgTable, text, unique } from "drizzle-orm/pg-core"

import { baseEntity } from "../base.entity"
import { bookmarks } from "./bookmark.entity"
import { users } from "./user.entity"

export const groups = pgTable(
  "groups",
  {
    ...baseEntity,
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    userId: text("userId").notNull(),
  },
  (group) => ({
    uniqueSlugPerUser: unique().on(group.slug, group.userId),
  })
)

export const groupsRelations = relations(groups, ({ one, many }) => ({
  user: one(users, {
    fields: [groups.userId],
    references: [users.id],
  }),
  bookmarks: many(bookmarks),
}))
