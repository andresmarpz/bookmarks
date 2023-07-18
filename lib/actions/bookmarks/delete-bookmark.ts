"use server"

import { revalidatePath } from "next/cache"
import { Bookmark } from "@prisma/client"

import { prisma } from "@/lib/prisma"

export async function deleteBookmark(
  id: Bookmark["id"],
  group: Bookmark["groupSlug"]
) {
  await prisma.bookmark.delete({
    where: { id },
  })

  revalidatePath("/app/" + group)
}
