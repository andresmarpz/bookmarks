import type { Group } from "@prisma/client"

import { prisma } from "@/lib/prisma"

class GroupRepository {
  public async createOne(
    input: Pick<Group, "name" | "slug" | "userId">
  ): Promise<Group> {
    const group = await prisma.group.create({
      data: input,
    })
    return group
  }

  public async deleteOne(input: Pick<Group, "id">): Promise<Group> {
    const group = await prisma.group.delete({
      where: input,
    })
    return group
  }

  public async findOne(input: Pick<Group, "id">): Promise<Group | null> {
    const group = await prisma.group.findUnique({
      where: input,
    })
    return group
  }

  public async findMany(input: Pick<Group, "userId">): Promise<Group[]> {
    const groups = await prisma.group.findMany({
      where: {
        userId: input.userId,
      },
    })
    return groups
  }
}

export const groupRepository = new GroupRepository()
