import type { Config } from "drizzle-kit"

import { env } from "./src/config/env"

export default {
  schema: "src/db/schema/*",
  out: "drizzle",
  driver: "pg",
  verbose: true,
  strict: true,
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config
