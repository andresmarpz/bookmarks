import { GetServerSidePropsContext } from 'next'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { DefaultSession, NextAuthOptions, getServerSession } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

import { prisma } from './prisma'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      // ...other properties
      // role: UserRole;
      username?: string
    } & DefaultSession['user']
  }

  interface User {
    username?: string
    // ...other properties
    // role: UserRole;
  }
}

export const authOptions: NextAuthOptions = {
  // we want these to break if string is undefined
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        session.user.username = user.username
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session
    }
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    })
  ],
  adapter: PrismaAdapter(prisma)
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req']
  res: GetServerSidePropsContext['res']
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions)
}
