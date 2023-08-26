"use server"

import { revalidatePath } from "next/cache"
import { createServerAction } from "nza"

import { withAuth } from "@/lib/action/middleware/with-auth"
import { updateUserUsernameSchema } from "@/lib/action/user/user.schema"
import { prisma } from "@/lib/prisma"

export const updateUserUsername = createServerAction()
  .input(updateUserUsernameSchema)
  .use(withAuth)
  .handler(async ({ username }, locals) => {
    await prisma.user.update({
      where: {
        id: locals.session.user!.id,
      },
      data: {
        username,
      },
    })

    revalidatePath("/dashboard/settings")
  })
