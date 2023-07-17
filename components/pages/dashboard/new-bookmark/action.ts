"use server"

import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/next-auth"
import { prisma } from "@/lib/prisma"

export type CreateBookmarkInput = {
  title?: string
  url: string
  description?: string
  image?: string
  group: string
}
export async function createBookmark(data: CreateBookmarkInput) {
  const session = await getServerSession(authOptions)
  const { title, url, description, image, group } = data

  await prisma.bookmark.create({
    data: {
      title: title ?? "Unknown",
      url,
      description,
      image,
      group: {
        connect: {
          slug: group,
        },
      },
      user: {
        connect: {
          uid: session!.user.uid,
        },
      },
    },
  })

  revalidatePath(`/app/${group}`)
}
