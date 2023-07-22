"use server"

import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { z } from "zod"

import { authOptions } from "@/lib/next-auth"
import { prisma } from "@/lib/prisma"

import { actionWithZod } from "../action-with-zod"

export const createBookmark = actionWithZod(
  z.object({
    title: z.string().optional(),
    url: z.string().url(),
    description: z.string().optional(),
    image: z.string().optional(),
    group: z.string(),
  }),
  async ({ title, url, description, image, group }) => {
    const session = await getServerSession(authOptions)
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
)
