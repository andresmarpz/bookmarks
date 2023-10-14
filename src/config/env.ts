import { configDotenv } from "dotenv"
import { z } from "zod"

configDotenv({
  path: ".env.local",
})

const clientSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().nonempty(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().nonempty(),
})

const serverSchema = z.object({
  DATABASE_URL: z.string().nonempty(),
})

function parseEnvironment() {
  const env = process.env
  const server = serverSchema.parse(env)
  const client = clientSchema
    .refine((data) => {
      for (const key in data) {
        if (!key.startsWith("NEXT_PUBLIC_")) {
          throw new Error(
            `Invalid client environment variable, needs 'NEXT_PUBLIC_' prefix: ${key}`
          )
        }
      }
      return true
    })
    .parse(env)

  return {
    server,
    client,
  }
}

export const env = parseEnvironment()
