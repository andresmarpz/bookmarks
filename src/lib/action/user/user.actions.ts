"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { createServerAction } from "nza"

import { withAuth } from "@/lib/action/middleware/with-auth"
import {
  createUserWithGithubSchema,
  createUserWithPasswordSchema,
  updateUserNameSchema,
  updateUserUsernameSchema,
} from "@/lib/action/user/user.schema"
import { userRepository } from "@/lib/repository/user.repository"

export const createUserWithPassword = createServerAction()
  .input(createUserWithPasswordSchema)
  .handler(async ({ username, email, password }) => {
    const [[byEmail], [byUsername]] = await Promise.all([
      userRepository.findByEmail({ email, provider: "password" }),
      userRepository.findByUsername({ username }),
    ])
    if (byEmail) {
      return {
        error: {
          field: "email",
          message: "Email already exists.",
        },
      }
    }

    if (byUsername) {
      return {
        error: {
          field: "username",
          message: "Username already exists.",
        },
      }
    }

    const { data, error } = await createServerActionClient({ cookies }).auth.signUp({
      email: email,
      password: password,
    })
    if (error)
      return {
        error,
      }

    try {
      await userRepository.insertOne({
        id: data.user?.id!,
        email: email,
        provider: "password",
        username: username,
        avatar: "/assets/default-avatar.jpg",
      })
    } catch (error) {
      console.log(error)
    }

    return {
      data,
    }
  })

export const createUserWithGithub = createServerAction()
  .input(createUserWithGithubSchema)
  .handler(async (params) => {
    const insert = await userRepository.insertOne({
      id: params.id,
      email: params.email,
      provider: "github",
      avatar: "/assets/default-avatar.jpg",
    })

    if (!insert || !insert.length) {
      throw new Error("Failed to create user.")
    }

    const supabase = createServerActionClient({ cookies })
    await supabase.auth.updateUser({
      data: {
        on_database: true,
      },
    })
  })

export const updateUserUsername = createServerAction()
  .input(updateUserUsernameSchema)
  .use(withAuth)
  .handler(async ({ username }, { session }) => {
    await userRepository.updateOne(session.user.id, { username })
    const supabase = createServerActionClient({ cookies })
    await supabase.auth.updateUser({
      data: {
        username,
      },
    })

    // revalidatePath("/dashboard/settings")
    revalidateTag("getUser")
  })

export const updateUserName = createServerAction()
  .input(updateUserNameSchema)
  .use(withAuth)
  .handler(async ({ name }, { session }) => {
    await userRepository.updateOne(session.user.id, { name })

    revalidatePath("/dashboard/settings")
  })
