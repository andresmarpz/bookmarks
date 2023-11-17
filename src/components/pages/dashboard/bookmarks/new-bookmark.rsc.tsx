import { getGroups } from "@/lib/query/group.queries"
import NewBookmark from "@/components/pages/dashboard/bookmarks/new-bookmark"
import type { Group } from "@/db/schema/group.entity"

interface Props {
  currentGroup: Pick<Group, "slug" | "id">
}

export default async function NewBookmarkServer({ currentGroup }: Props) {
  const groups = await getGroups()

  return <NewBookmark groups={groups} currentGroup={currentGroup} />
}
