import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { prisma } from '~/server/prisma'

export const bookmarkRouter = createTRPCRouter({
  createBookmark: protectedProcedure
    .input(
      z.object({
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
        cursor: z.string().nullish()
      })
    )
    .query(async ({ input, ctx }) => {
      const bookmarks = await prisma.bookmark.findMany({
        where: {
          collectionId: input.collectionId,
          userId: ctx.session.user.id
        },
        take: 101,
        skip: input.cursor ? 1 : 0,
        cursor: input.cursor ? { id: input.cursor } : undefined
      })
      let nextCursor: typeof input.cursor | undefined = undefined
      if (bookmarks.length > 100) {
        const next = bookmarks.pop()
        nextCursor = next!.id
      }
      return {
        items: bookmarks,
        nextCursor
      }
    })
})
