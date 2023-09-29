import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { type DefaultSession, type NextAuthOptions, type User } from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { prisma } from "@/lib/prisma"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: number
      uid: string
    } & DefaultSession["user"] &
      User
  }

  interface User {
    username?: string
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (!session?.user) return session

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          uid: token.uid,
        } as User & { id: number; uid: string },
      }
    },
    jwt: async ({ user, token, trigger }) => {
      if (user) {
        const u = user as User & { uid: string }
        token.id = Number(u.id)
        token.uid = u.uid

        if (trigger === "signUp") {
          await prisma.group.create({
            data: {
              name: "All",
              slug: "all",
              userId: u.uid,
            },
          })
        }
      }
      return token
    },
  },
}
