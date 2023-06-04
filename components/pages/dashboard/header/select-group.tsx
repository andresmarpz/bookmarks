import { getServerSession } from "next-auth"

import { prisma } from "@/lib/prisma"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import NewGroup from "@/components/pages/dashboard/header/new-group"

export default async function SelectGroup() {
  const session = await getServerSession()

  const groups = await prisma.group.findMany({
    where: {
      userId: session!.user.uid,
    },
  })
  return groups.length > 0 ? (
    <Select>
      <SelectTrigger className="w-36 ">
        <span className="flex w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
          <SelectValue placeholder="Select a group.." />
        </span>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="undefined">All</SelectItem>
        <SelectSeparator />
        {groups.map((group) => (
          <SelectItem key={"s-i-" + group.slug} value={group.slug}>
            {group.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ) : (
    <NewGroup />
  )
}
