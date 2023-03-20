import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '../trpc'

export const collectionRouter = createTRPCRouter({
  createCollection: protectedProcedure
    .input(
      z.object({
        name: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const collection = await ctx.prisma.collection.create({
        data: {
          name: input.name,
          user: {
            connect: {
              email: ctx.session.user.email ?? undefined
            }
          }
        }
      })
      return collection
    }),
  getCollections: protectedProcedure
    .input(
      z
        .object({
          cursor: z.string().nullish()
        })
        .optional()
    )
    .query(async ({ input, ctx }) => {
      const collections = await ctx.prisma.collection.findMany({
        where: {
          userId: ctx.session.user.id
        },
        take: 20,
        cursor: input?.cursor ? { id: input.cursor } : undefined,
        include: {
          _count: {
            select: {
              bookmarks: true
            }
          }
        }
      })
      return collections
    }),
  deleteCollection: protectedProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const collection = await ctx.prisma.collection.deleteMany({
        where: {
          id: input.id,
          userId: ctx.session.user.id
        }
      })
      return collection
    })
})
