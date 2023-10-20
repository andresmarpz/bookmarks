import type { Group } from "@/db/schema/group.entity"

import { getGroups } from "@/lib/query/group.queries"
import NewBookmark from "@/components/pages/dashboard/bookmarks/NewBookmark"

interface Props {
  currentGroup: Group["id"]
}

export default async function NewBookmarkServer({ currentGroup }: Props) {
  const groups = await getGroups()

  return <NewBookmark groups={groups} currentGroup={currentGroup} />
}
