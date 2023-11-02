import { z } from "zod"

export const createUserWithPasswordSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/),
  email: z.string().email(),
  password: z.string().min(8),
})
export type CreateUserWithPasswordSchema = z.infer<typeof createUserWithPasswordSchema>

export const createUserWithGithubSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
})

export const updateUserUsernameSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/),
})
export type UpdateUserUsernameInput = z.infer<typeof updateUserUsernameSchema>

export const updateUserNameSchema = z.object({
  name: z.string().min(3).max(20),
})
export type UpdateUserNameInput = z.infer<typeof updateUserNameSchema>
