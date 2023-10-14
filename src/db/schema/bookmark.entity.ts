import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm"
import { pgTable, text, uuid } from "drizzle-orm/pg-core"

import { baseEntity } from "../base.entity"
import { groups } from "./group.entity"
import { users } from "./user.entity"

export const bookmarks = pgTable("bookmarks", {
  ...baseEntity,
  title: text("title").notNull(),
  description: text("description"),
  url: text("url").notNull(),
  image: text("image"),

  userId: uuid("userId").notNull(),
  groupId: uuid("groupId").notNull(),
})

export const bookmarksRelations = relations(bookmarks, ({ one }) => ({
  user: one(users, {
    fields: [bookmarks.userId],
    references: [users.id],
  }),
  group: one(groups, {
    fields: [bookmarks.groupId],
    references: [groups.id],
  }),
}))

export type Bookmark = InferSelectModel<typeof bookmarks>
export type BookmarkInsert = InferInsertModel<typeof bookmarks>
