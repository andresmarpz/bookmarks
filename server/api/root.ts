import { bookmarkRouter } from '~/server/api/routers/bookmark'
import { collectionRouter } from '~/server/api/routers/collection'
import { createTRPCRouter } from '~/server/api/trpc'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	bookmark: bookmarkRouter,
	collection: collectionRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
