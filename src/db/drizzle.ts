import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import { env } from "@/src/config/env"

// using prepare: false because we use the Transaction mode on
// Supabase Postgres connection pooling
const client = postgres(env.DATABASE_URL, {
  prepare: false,
})
export const db = drizzle(client)
