import { getSession } from "@/lib/auth/get-session"
import { prisma } from "@/lib/prisma"
import GroupSwitcher from "@/components/pages/dashboard/groups/group-switcher"

export default async function GroupSwitcherServer() {
  const session = await getSession()

  const groups = await prisma.group.findMany({
    where: {
      userId: session!.user.uid,
    },
  })

  return <GroupSwitcher groups={groups} />
}
