import { z } from "zod"

export const createGroupSchema = z.object({
  name: z.string().min(1).max(30),
  slug: z.string().min(1).max(30),
})
