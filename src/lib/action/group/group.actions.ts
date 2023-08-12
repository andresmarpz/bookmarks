"use server"

import { revalidatePath } from "next/cache"
import { createServerAction } from "nza"

import {
  createGroupSchema,
  deleteGroupSchema,
} from "@/lib/action/group/group.schema"
import { withAuth } from "@/lib/action/middleware/with-auth"
import { bookmarkRepository } from "@/lib/repository/bookmark.repository"
import { groupRepository } from "@/lib/repository/group.repository"

export const createGroup = createServerAction()
  .input(createGroupSchema)
  .use(withAuth)
  .handler(async ({ name, slug }, { session }) => {
    await groupRepository.createOne({ name, slug, userId: session!.user.uid })

    console.log(name, slug)
    revalidatePath("/dashboard")
  })

export const deleteGroup = createServerAction()
  .input(deleteGroupSchema)
  .use(withAuth)
  .handler(async ({ id }) => {
    const bookmarks = await bookmarkRepository.findMany({ groupId: id })
    await Promise.all(
      bookmarks.map(
        async (bm) =>
          await bookmarkRepository.updateOne({ id: bm.id, groupSlug: "all" })
      )
    )
    await groupRepository.deleteOne({ id })

    revalidatePath("/dashboard")
  })
