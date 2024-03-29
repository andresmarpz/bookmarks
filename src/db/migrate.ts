import fs from "fs"
import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"

import { env } from "@/config/env.mjs"

const migrationClient = postgres(env.DATABASE_URL!, { max: 1 })
const db = drizzle(migrationClient)

async function runMigrations() {
  if (fs.existsSync("drizzle") && fs.readdirSync("drizzle").length > 0) {
    try {
      await migrate(db, { migrationsFolder: "drizzle" })
      process.exit(0)
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  } else console.log("No migrations found.")
}

if (require.main === module) runMigrations()
