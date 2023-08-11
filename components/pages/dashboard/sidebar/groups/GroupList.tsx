import { getGroups } from "@/lib/query/group.queries"
import GroupItem from "@/components/pages/dashboard/sidebar/groups/GroupItem"

export default async function GroupList() {
  const groups = await getGroups()

  return groups.length ? (
    <ul className="flex flex-col gap-1">
      {groups.map((group) => (
        <GroupItem key={"sb" + group.id} group={group} />
      ))}
    </ul>
  ) : (
    <p>No groups yet</p>
  )
}
