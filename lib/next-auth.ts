import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { DefaultSession, NextAuthOptions, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { prisma } from "@/lib/prisma";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: number;
      uid: string;
      username?: string;
    } & DefaultSession["user"];
  }

  interface User {
    username?: string;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    session: async ({ session, token, user }) => {
      if (!session?.user) return session;

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          uid: token.uid,
          username: user?.username,
        } as User & { id: number; uid: string },
      };
    },
    jwt: async ({ user, token }) => {
      if (user) {
        const u = user as User & { uid: string };
        token.id = Number(u.id);
        token.uid = u.uid;
      }
      return token;
    },
  },
};
