import { getServerSession } from "next-auth"

import { prisma } from "@/lib/prisma"
import NewGroup from "@/components/pages/dashboard/header/new-group"
import SelectGroup from "@/components/pages/dashboard/header/client-select"

export default async function GroupHandler() {
  const session = await getServerSession()

  const groups = await prisma.group.findMany({
    where: {
      userId: session!.user.uid,
    },
  })

  return groups.length > 0 ? (
    <SelectGroup groups={groups} />
  ) : (
    <NewGroup />
  )
}
