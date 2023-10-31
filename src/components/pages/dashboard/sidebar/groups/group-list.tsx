import { Plus } from "lucide-react"

import { getGroups } from "@/lib/query/group.queries"
import { Button } from "@/components/ui/button"
import NewGroup from "@/components/pages/dashboard/groups/new-group"
import GroupItem from "@/components/pages/dashboard/sidebar/groups/group-item"

export default async function GroupList() {
  const groups = await getGroups().then((groups) =>
    groups.filter((group) => group.slug !== "all")
  )

  return groups.length ? (
    <ul className="flex flex-col gap-1">
      {groups.map((group) => (
        <GroupItem key={"sb" + group.id} group={group} />
      ))}
    </ul>
  ) : (
    <div className="border-neutral-80 relative overflow-hidden rounded-xl border-2 bg-zinc-900">
      <div className="relative z-10 p-6 pb-10 pt-16 antialiased">
        <h5 className="mb-1 text-lg font-medium text-gray-200">Create a Group</h5>

        <p className="mb-6 text-sm leading-5 text-gray-400">
          Create your first Group to start collecting your internet discoveries.
        </p>

        <NewGroup>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Create
          </Button>
        </NewGroup>
      </div>
      <div className="dashed-grid-paper absolute right-0 top-1 h-full w-7/12 bg-zinc-900" />
      <div className="absolute right-0 top-1 h-full w-7/12 bg-gradient-to-br from-zinc-900 via-zinc-900/[85%] to-transparent" />
    </div>
  )
}
