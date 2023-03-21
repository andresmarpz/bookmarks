import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '../../trpc'

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
				},
				include: {
					_count: {
						select: {
							bookmarks: true
						}
					}
				}
			})
			return collection
		}),
	getCollections: protectedProcedure
		.input(
			z.object({
				limit: z.number().min(1).max(50).nullish(),
				cursor: z.string().nullish()
			})
		)
		.query(async ({ input, ctx }) => {
			const limit = input?.limit ?? 20
			const cursor = input?.cursor
			const items = await ctx.prisma.collection.findMany({
				take: limit + 1,
				where: {
					userId: ctx.session.user.id
				},
				include: {
					_count: {
						select: {
							bookmarks: true
						}
					}
				},
				cursor: input?.cursor ? { id: input.cursor } : undefined,
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
				items,
				nextCursor
			}
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
