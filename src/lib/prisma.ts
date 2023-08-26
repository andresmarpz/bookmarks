import { PrismaClient } from "@prisma/client"

declare global {
  var prismaClient: PrismaClient | undefined
}

export const prisma =
  global.prismaClient ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })

global.prismaClient = prisma
