import type { Group } from "@prisma/client"

import { getSession } from "@/lib/auth/get-session"
import { groupRepository } from "@/lib/repository/group.repository"

export const getGroup = async (id: Group["id"]): Promise<Group | null> =>
  await groupRepository.findOne({ id })

export const getGroups = async () => {
  const session = await getSession()
  return await groupRepository.findMany({ userId: session!.user.uid })
}
