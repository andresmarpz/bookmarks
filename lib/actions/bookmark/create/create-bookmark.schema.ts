import { z } from "zod"

export const createBookmarkInput = z.object({
  title: z.string().optional(),
  url: z.string().url({
    message: "Please enter a valid URL",
  }),
  description: z.string().optional(),
  image: z.optional(z.string().url()),
  group: z.string(),
})
