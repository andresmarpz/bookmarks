import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/next-auth"
import { prisma } from "@/lib/prisma"
import GroupSwitcher from "@/components/pages/dashboard/groups/group-switcher"

export default async function GroupSwitcherServer() {
  const session = await getServerSession(authOptions)

  const groups = await prisma.group.findMany({
    where: {
      userId: session!.user.uid,
    },
  })

  return <GroupSwitcher groups={groups} />
}
