import { getGroups } from "@/lib/query/group.queries"
import { Skeleton } from "@/components/ui/skeleton"
import GroupSwitcher from "@/components/pages/dashboard/groups/group-switcher"

export function LoadingGroupSwitcher() {
  return <Skeleton className="h-10 w-[200px]" />
}

export default async function GroupSwitcherServer() {
  const groups = await getGroups()

  return <GroupSwitcher groups={groups} />
}
