"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

import { prisma } from "@/lib/prisma"

import { actionWithZod } from "../action-with-zod"

export const deleteBookmark = actionWithZod(
  z.object({
    id: z.string(),
    group: z.string(),
  }),
  async ({ id, group }) => {
    await prisma.bookmark.delete({
      where: { id },
    })

    revalidatePath("/app/" + group)
  }
)
