"use server"

import { revalidatePath } from "next/cache"
import { createServerAction } from "nza"

import {
  createBookmarkSchema,
  deleteBookmarkSchema,
} from "@/lib/action/bookmark/bookmark.schema"
import { withAuth } from "@/lib/action/middleware/with-auth"
import { bookmarkRepository } from "@/lib/repository/bookmark.repository"

export const createBookmark = createServerAction()
  .input(createBookmarkSchema)
  .use(withAuth)
  .handler(
    async ({ title, url, description, image, groupId, groupSlug }, { session }) => {
      await bookmarkRepository.createOne({
        title: title ?? "Unknown",
        url,
        description: description ?? null,
        image: image ?? null,
        groupId,
        groupSlug,
        uid: session!.user.uid,
      })

      revalidatePath(`/dashboard/${groupSlug}`)
    }
  )

export const deleteBookmark = createServerAction()
  .input(deleteBookmarkSchema)
  .use(withAuth)
  .handler(async ({ id, groupSlug }) => {
    await bookmarkRepository.delete({ id })

    revalidatePath(`/dashboard/${groupSlug}`)
  })
