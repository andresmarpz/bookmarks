import type { Config } from "drizzle-kit"

export default {
  schema: "src/db/schema/*",
  out: "drizzle",
  driver: "pg",
  strict: true,
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config
