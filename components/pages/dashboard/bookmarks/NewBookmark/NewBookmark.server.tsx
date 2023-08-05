import type { Group } from "@prisma/client"

import { getGroups } from "@/lib/actions/group/get-groups"
import { getSession } from "@/lib/auth/get-session"
import NewBookmark from "@/components/pages/dashboard/bookmarks/NewBookmark"

interface Props {
  currentGroup: Group["id"]
}

export default async function NewBookmarkServer({ currentGroup }: Props) {
  const session = await getSession()
  const groups = await getGroups(session.user.uid)

  return <NewBookmark groups={groups} currentGroup={currentGroup} />
}
