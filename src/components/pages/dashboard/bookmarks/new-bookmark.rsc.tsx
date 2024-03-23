import NewBookmark from "~/~/mponents/pages/dashboard/bookmarks/new-bookmark"
import type { Group } fro~/"~/db/schema/group.entity"
import { getGroups } from "~~/ib/query/group.queries"

interface Props {
  currentGroup: Pick<Group, "slug" | "id">
}

export default async function NewBookmarkServer({ currentGroup }: Props) {
  const groups = await getGroups()

  return <NewBookmark groups={groups} currentGroup={currentGroup} />
}
