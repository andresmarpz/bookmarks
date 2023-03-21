import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { prisma } from '~/server/prisma'

export const bookmarkRouter = createTRPCRouter({
  createBookmark: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        url: z.string().url(),
        title: z.string().optional(),
        description: z.string().optional(),
        favicon: z.string().url().optional(),
        collectionId: z.string().optional()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const bookmark = await ctx.prisma.bookmark.create({
        data: {
          id: input.id,
          url: input.url,
          title: input.title,
          description: input.description,
          favicon: input.favicon,
          user: {
            connect: {
              id: ctx.session.user.id
            }
          },
          collection: input.collectionId
            ? {
                connect: {
                  id: input.collectionId
                }
              }
            : undefined
        }
      })
      return bookmark
    }),
  deleteBookmark: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const bookmark = await ctx.prisma.bookmark.deleteMany({
        where: {
          id: input.id,
          userId: ctx.session.user.id
        }
      })
      return bookmark
    }),
  getBookmarks: protectedProcedure
    .input(
      z.object({
        collectionId: z.string().nullish(),
        limit: z.number().min(1).max(50).nullish(),
        cursor: z.string().nullish()
      })
    )
    .query(async ({ input, ctx }) => {
      const limit = input.limit ?? 20
      const { cursor } = input
      const items = await prisma.bookmark.findMany({
        take: limit + 1,
        where: {
          collectionId: input.collectionId,
          userId: ctx.session.user.id
        },
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: {
          createdAt: 'desc'
        }
      })
      let nextCursor: typeof cursor | undefined = undefined
      if (items.length > limit) {
        const next = items.pop()
        nextCursor = next!.id
      }
      return {
        items: items,
        nextCursor
      }
    })
})
