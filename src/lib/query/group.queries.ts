import { getSession } from "~/lib/auth/get-session"
import { groupRepository } from "~/lib/repository/group.repository"
import type { Group } from "~/db/schema/group.entity"

export const getGroupById = async (id: Group["id"]) => await groupRepository.findOne(id)

export const getGroupBySlug = async (slug: Group["slug"]) => {
  const session = await getSession()
  return await groupRepository.findOneBySlug(slug, session.user.id)
}

export const getGroups = async () => {
  const session = await getSession()
  return await groupRepository.findMany(session.user.id)
}
