"use server"

import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { z } from "zod"

import { authOptions } from "@/lib/next-auth"
import { prisma } from "@/lib/prisma"

type CreateGroupInput = {
  name: string
  slug: string
}
export async function createGroup(input: CreateGroupInput) {
  const session = await getServerSession(authOptions)

  const { name, slug } = z
    .object({
      name: z.string().min(1).max(30),
      slug: z.string().min(1).max(30),
    })
    .parse(input)

  await prisma.group.create({
    data: {
      name,
      slug,
      userId: session!.user.uid,
    },
  })

  revalidatePath("/app")
}
