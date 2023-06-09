"use server"

import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/next-auth"
import { prisma } from "@/lib/prisma"
import { GroupData } from "@/components/pages/dashboard/header/new-group"

export async function createGroup(data: FormData) {
  const session = await getServerSession(authOptions)

  const groupData: GroupData = {
    name: data.get("name") as string,
    slug: data.get("slug") as string,
  }

  await prisma.group.create({
    data: {
      name: groupData.name,
      slug: groupData.slug,
      userId: session!.user.uid,
    },
  })

  revalidatePath("/app")
}
