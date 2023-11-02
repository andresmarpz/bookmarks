import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import { env } from "@/config/env"

const client = postgres(env.server?.DATABASE_URL!)
export const db = drizzle(client)
