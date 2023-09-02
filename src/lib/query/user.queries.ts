import type { User } from "@prisma/client"

import { userRepository } from "@/lib/repository/user.repository"

export const getUser = async (id: User["id"]): Promise<User | null> =>
  await userRepository.findOne({ id })
