import { z, ZodTypeAny } from "zod"

export const actionWithZod =
  <T extends ZodTypeAny, R>(schema: T, handler: (input: z.infer<T>) => R) =>
  (input: z.infer<T>): R => {
    const parsedInput = schema.parse(input)
    return handler(parsedInput)
  }
