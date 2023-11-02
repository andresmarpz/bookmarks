import { configDotenv } from "dotenv"
import { z } from "zod"

configDotenv({
  path: ".env.local",
})

const clientSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().nonempty(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().nonempty(),
  NEXT_PUBLIC_URL: z.string().nonempty(),
})

const serverSchema = z.object({
  DATABASE_URL: z.string().nonempty(),
})

type Env = {
  client: z.infer<typeof clientSchema>
  server?: z.infer<typeof serverSchema>
}

function parseEnvironment() {
  const env = process.env

  // If running outside of Vercel (e.g. Github Actions), parsing or throwing at
  // the action "run time" is the same thing. We dont need to hard validate all envs
  // since we'll most likely only use a few from the server
  if (!process.env.VERCEL) {
    return {
      client: clientSchema.partial().parse(env),
      server: serverSchema.partial().parse(env),
    } as unknown as Env
  }

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
    .transform((value) => {
      return {
        ...value,
        // remove trailing slash for consistency when using it
        NEXT_PUBLIC_URL: value.NEXT_PUBLIC_URL.replace(/\/$/, ""),
      }
    })
    .parse(env)

  // If we're on the server, parse the server environment variables
  if (global.window === undefined) {
    const server = serverSchema.parse(env)

    return {
      client,
      server,
    }
  }

  return { client }
}

export const env = parseEnvironment()
