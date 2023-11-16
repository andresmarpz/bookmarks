import { unstable_cache } from "next/cache"

import { userRepository } from "@/lib/repository/user.repository"
import type { User } from "@/db/schema/user.entity"

export const getUser = unstable_cache(
  async (id: User["id"]) => await userRepository.findOneById(id),
  ["user-cache"],
  {
    tags: ["getUser"],
  }
)
