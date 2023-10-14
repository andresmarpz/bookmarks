import { db } from "@/db/drizzle"
import { users, type User, type UserInsert } from "@/db/schema/user.entity"
import { and, eq } from "drizzle-orm"

class UserRepository {
  public async insertOne(user: UserInsert) {
    return await db.insert(users).values(user).returning()
  }

  public async findOneById({ id }: Pick<User, "id">) {
    return await db.select().from(users).where(eq(users.id, id)).limit(1).execute()
  }

  public async verifyIfExists({ email }: Pick<User, "email">) {
    return await db
      .select()
      .from(users)
      .where(and(eq(users.email, email), eq(users.provider, "password")))
      .execute()
  }
}

export const userRepository = new UserRepository()
