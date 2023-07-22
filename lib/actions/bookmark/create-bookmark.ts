"use server"

import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { z } from "zod"

import { authOptions } from "@/lib/next-auth"
import { prisma } from "@/lib/prisma"

export type CreateBookmarkInput = {
  title?: string
  url: string
  description?: string
  image?: string
  group: string
}
export async function createBookmark(input: CreateBookmarkInput) {
  const session = await getServerSession(authOptions)

  const { title, url, description, image, group } = z
    .object({
      title: z.string().optional(),
      url: z.string().url(),
      description: z.string().optional(),
      image: z.string().optional(),
      group: z.string(),
    })
    .parse(input)

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
