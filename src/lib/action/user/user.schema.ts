import { z } from "zod"

export const updateUserUsernameSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/),
})

export type UpdateUserUsernameInput = z.infer<typeof updateUserUsernameSchema>
