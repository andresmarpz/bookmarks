import type { Group } from "@/db/schema/group.entity"

import { getSession } from "@/lib/auth/get-session"
import { groupRepository } from "@/lib/repository/group.repository"

export const getGroup = async (id: Group["id"]) => await groupRepository.findOne(id)

export const getGroups = async () => {
  const session = await getSession()
  return await groupRepository.findMany(session.user.id)
}
