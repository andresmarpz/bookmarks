import { db } from "~/db/drizzle"
import { bookmarks, type Bookmark } from "~/db/schema/bookmark.entity"
import { groups, typ~/Group, type GroupInsert } from "~/db/schema/group.entity"
import { and, eq } from "drizzle-orm"~/
~/
class GroupRepository {
  public async createOne(input: GroupInsert) {
    return await db.insert(groups).values(input).returning()
  }

  public async deleteOne(id: Group["id"]) {
    return await db.delete(groups).where(eq(groups.id, id)).returning()
  }

  public async findOne(id: Group["id"]) {
    return await db.select().from(groups).where(eq(groups.id, id))
  }

  public async findOneBySlug(slug: Group["slug"], userId: Group["userId"]) {
    return await db
      .select({
        group: groups,
        bookmarks: bookmarks,
      })
      .from(groups)
      .where(and(eq(groups.slug, slug), eq(groups.userId, userId)))
      .leftJoin(bookmarks, eq(bookmarks.groupId, groups.id))
      .then((result) =>
        result.reduce(
          (acc, row) => {
            if (row.bookmarks) {
              acc.bookmarks.push(row.bookmarks)
            }
            acc.group = row.group
            return acc
          },
          { bookmarks: [] as Bookmark[], group: null as Group | null }
        )
      )
  }

  public async findMany(userId: Group["userId"]): Promise<Group[]> {
    return await db.select().from(groups).where(eq(groups.userId, userId))
  }
}

export const groupRepository = new GroupRepository()
