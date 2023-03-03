import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const bookmarkRouter = createTRPCRouter({
  createBookmark: protectedProcedure
    .input(
      z.object({
        url: z.string().url(),
        title: z.string().optional(),
        description: z.string().optional(),
        favicon: z.string().url().optional(),
        collectionId: z.string()
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
              email: ctx.session.user.email ?? undefined
            }
          },
          collection: {
            connect: {
              id: input.collectionId
            }
          }
        }
      })
      return bookmark
    })
  // hello: publicProcedure
  //   .input(z.object({ text: z.string() }))
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input.text}`
  //     }
  //   }),

  // getAll: publicProcedure.query(({ ctx }) => {
  //   // return ctx.prisma.example.findMany()
  //   return []
  // }),

  // getSecretMessage: protectedProcedure.query(() => {
  //   return 'you can now see this secret message!'
  // })
})
