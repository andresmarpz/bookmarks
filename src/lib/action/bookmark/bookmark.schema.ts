import { z } from "zod"

export const createBookmarkSchema = z.object({
  title: z.string().optional(),
  url: z.string().url({
    message: "Please enter a valid URL",
  }),
  description: z.string().optional(),
  image: z.optional(z.string().url()),
  groupId: z.string(),
  groupSlug: z.string(),
})

export const deleteBookmarkSchema = z.object({
  id: z.string(),
  groupSlug: z.string(),
})
