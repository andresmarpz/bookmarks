import type { User } from "@/db/schema/user.entity"

import { userRepository } from "@/lib/repository/user.repository"

export const getUser = async (id: User["id"]) => await userRepository.findOneById({ id })
