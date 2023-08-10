import { revalidatePath } from "next/cache"
import { createServerAction } from "nza"

import {
  createBookmarkSchema,
  deleteBookmarkSchema,
} from "@/lib/action/bookmark/bookmark.schema"
import { withAuth } from "@/lib/action/middleware/with-auth"
import { bookmarkRepository } from "@/lib/repository/bookmark.repository"

const createBookmark = createServerAction()
  .input(createBookmarkSchema)
  .use(withAuth)
  .handler(async ({ title, url, description, image, group }, { session }) => {
    await bookmarkRepository.createBookmark({
      title: title ?? "Unknown",
      url,
      description: description ?? null,
      image: image ?? null,
      groupId: group,
      uid: session!.user.uid,
    })

    revalidatePath(`/dashboard/${group}`)
  })

const deleteBookmark = createServerAction()
  .input(deleteBookmarkSchema)
  .use(withAuth)
  .handler(async ({ id, group }) => {
    await bookmarkRepository.deleteBookmark({ id })

    revalidatePath(`/dashboard/${group}`)
  })

const updateBookmark = createServerAction()

export { createBookmark, deleteBookmark, updateBookmark }
