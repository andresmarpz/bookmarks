import { db } from "@/db/drizzle"
import { groups, type Group, type GroupInsert } from "@/db/schema/group.entity"
import { eq } from "drizzle-orm"

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

  public async findMany(userId: Group["userId"]): Promise<Group[]> {
    return await db.select().from(groups).where(eq(groups.userId, userId))
  }
}

export const groupRepository = new GroupRepository()
