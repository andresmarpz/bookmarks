import type { Group } from "@/db/schema/group.entity"

import { getSession } from "@/lib/auth/get-session"
import { groupRepository } from "@/lib/repository/group.repository"

export const getGroup = async (id: Group["id"]): Promise<Group | null> =>
  await groupRepository.findOne({ id })

export const getGroups = async () => {
  const sessionQuery = await getSession()
  return await groupRepository.findMany({ userId: sessionQuery!.session?.user.id })
}
