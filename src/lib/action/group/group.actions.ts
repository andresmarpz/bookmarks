"use server"

import { revalidatePath } from "next/cache"
import { createServerAction } from "nza"

import { createGroupSchema, deleteGroupSchema } from "@/lib/action/group/group.schema"
import { withAuth } from "@/lib/action/middleware/with-auth"
import { groupRepository } from "@/lib/repository/group.repository"

export const createGroup = createServerAction()
  .input(createGroupSchema)
  .use(withAuth)
  .handler(async ({ name, slug }, { session }) => {
    await groupRepository.createOne({ name, slug, userId: session.user.id })

    console.log(name, slug)
    revalidatePath("/dashboard")
  })

export const deleteGroup = createServerAction()
  .input(deleteGroupSchema)
  .use(withAuth)
  .handler(async ({ id }) => {
    await groupRepository.deleteOne(id)

    revalidatePath("/dashboard")
  })
