import { z } from "zod"

const groupSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(48),
  slug: z.string().min(1).max(48),
})

export const createGroupSchema = groupSchema.pick({
  name: true,
  slug: true,
})

export const deleteGroupSchema = groupSchema.pick({
  id: true,
})
