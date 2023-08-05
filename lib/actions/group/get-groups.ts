import type { User } from "@prisma/client"

import { prisma } from "@/lib/prisma"

export async function getGroups(userId: User["uid"]) {
  return await prisma.group.findMany({
    where: {
      userId,
    },
  })
}
