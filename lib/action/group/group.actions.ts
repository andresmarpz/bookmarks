"use server"

import { revalidatePath } from "next/cache"
import { createServerAction } from "nza"

import { createGroupSchema } from "@/lib/action/group/group.schema"
import { withAuth } from "@/lib/action/middleware/with-auth"
import { getSession } from "@/lib/auth/get-session"
import { groupRepository } from "@/lib/repository/group.repository"

export const createGroup = createServerAction()
  .input(createGroupSchema)
  .use(withAuth)
  .handler(async ({ name, slug }) => {
    const session = await getSession()

    await groupRepository.insertGroup({ name, slug, userId: session!.user.uid })

    revalidatePath("/dashboard")
  })
