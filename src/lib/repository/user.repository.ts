import type { User } from "@prisma/client"

import { prisma } from "@/lib/prisma"

class UserRepository {
  public async findOne({ id }: Pick<User, "id">): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    })
  }
}

export const userRepository = new UserRepository()
