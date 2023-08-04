"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

import { getSession } from "@/lib/auth/get-session"
import { prisma } from "@/lib/prisma"

import { actionWithZod } from "../action-with-zod"

export const createGroup = actionWithZod(
  z.object({
    name: z.string().min(1).max(30),
    slug: z.string().min(1).max(30),
  }),
  async ({ name, slug }) => {
    const session = await getSession()
    await prisma.group.create({
      data: {
        name,
        slug,
        userId: session!.user.uid,
      },
    })

    revalidatePath("/dashboard")
  }
)
