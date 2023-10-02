import { baseEntity } from "@/db/base.entity"
import { groups } from "@/db/schema/group.entity"
import { users } from "@/db/schema/user.entity"
import { relations } from "drizzle-orm"
import { pgTable, text, uuid } from "drizzle-orm/pg-core"

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
