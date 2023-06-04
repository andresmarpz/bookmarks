import { revalidatePath } from "next/cache"
import { Group } from "@prisma/client"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/next-auth"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface GroupData {
  name: Group["name"]
  slug: Group["slug"]
}

export default async function NewGroup() {
  const session = await getServerSession(authOptions)
  async function createGroup(data: FormData) {
    "use server"

    const groupData: GroupData = {
      name: data.get("name") as string,
      slug: data.get("slug") as string,
    }

    const group = await prisma.group.create({
      data: {
        name: groupData.name,
        slug: groupData.slug,
        userId: session!.user.uid,
      },
    })
    console.log(group)

    revalidatePath("/app/dashboard")
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="min-w-[fit-content] text-ellipsis whitespace-nowrap">
          Create Group
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form action={createGroup} className="flex flex-col gap-2">
          <label>
            <p>Name</p>
            <Input name="name" />
          </label>
          <label>
            <p>Slug</p>
            <Input name="slug" />
          </label>
          <Button type="submit">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
