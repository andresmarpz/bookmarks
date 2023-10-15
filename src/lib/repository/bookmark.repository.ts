import { db } from "@/db/drizzle"
import {
  bookmarks,
  type Bookmark,
  type BookmarkInsert,
} from "@/db/schema/bookmark.entity"
import { eq, inArray } from "drizzle-orm"

class BookmarkRepository {
  public async insertOne(input: BookmarkInsert) {
    return db.insert(bookmarks).values(input).returning()
  }

  public async deleteOne(id: Bookmark["id"]) {
    return await db.delete(bookmarks).where(eq(bookmarks.id, id)).returning()
  }

  public async updateOne(id: Bookmark["id"], input: Partial<Bookmark>) {
    return await db.update(bookmarks).set(input).where(eq(bookmarks.id, id)).returning()
  }

  public async updateMany(where: Bookmark["id"][], input: Partial<Bookmark>) {
    return await db
      .update(bookmarks)
      .set(input)
      .where(inArray(bookmarks.id, where))
      .returning()
  }

  public async findMany(input: Pick<Bookmark, "groupId">): Promise<Bookmark[]> {
    return await db
      .select()
      .from(bookmarks)
      .where(eq(bookmarks.groupId, input.groupId))
      .orderBy(bookmarks.createdAt)
  }
}

export const bookmarkRepository = new BookmarkRepository()
