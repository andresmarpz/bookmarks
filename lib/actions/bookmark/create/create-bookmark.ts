"use server"

import { revalidatePath } from "next/cache"

import { actionWithZod } from "@/lib/actions/action-with-zod"
import { createBookmarkInput } from "@/lib/actions/bookmark/create/create-bookmark.schema"
import { getSession } from "@/lib/auth/get-session"
import { prisma } from "@/lib/prisma"

export const createBookmark = actionWithZod(
  createBookmarkInput,
  async ({ title, url, description, image, group }) => {
    const session = await getSession()
    await prisma.bookmark.create({
      data: {
        title: title ?? "Unknown",
        url,
        description,
        image,
        group: {
          connect: {
            id: group,
          },
        },
        user: {
          connect: {
            uid: session!.user.uid,
          },
        },
      },
    })

    revalidatePath(`/dashboard/${group}`)
  }
)
