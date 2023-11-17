import { and, eq } from "drizzle-orm"

import { db } from "@/db/drizzle"
import { users, type User, type UserInsert } from "@/db/schema/user.entity"

class UserRepository {
  public async insertOne(user: UserInsert) {
    return await db.insert(users).values(user).returning()
  }

  public async updateOne(id: User["id"], user: Partial<UserInsert>) {
    return await db.update(users).set(user).where(eq(users.id, id)).returning()
  }

  public async findOneById(id: User["id"]) {
    return await db.select().from(users).where(eq(users.id, id)).limit(1).execute()
  }

  public async findByEmail({ email, provider }: Pick<User, "email" | "provider">) {
    return await db
      .select()
      .from(users)
      .where(and(eq(users.email, email), eq(users.provider, provider)))
      .execute()
  }

  public async findByUsername({ username }: Pick<User, "username">) {
    return await db.select().from(users).where(eq(users.username, username!)).execute()
  }
}

export const userRepository = new UserRepository()
