import { unstable_cache } from "next/cache"
import type { User } from "@/db/schema/user.entity"

import { userRepository } from "@/lib/repository/user.repository"

export const getUser = unstable_cache(
  async (id: User["id"]) => await userRepository.findOneById(id),
  ["user-cache"],
  {
    tags: ["getUser"],
  }
)
