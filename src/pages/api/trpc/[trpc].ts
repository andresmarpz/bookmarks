import { env } from 'process'
import * as trpcNext from '@trpc/server/adapters/next'
import { appRouter } from '~/server/api/root'
import { createTRPCContext } from '~/server/api/trpc'

// export API handler
// @see https://trpc.io/docs/api-handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === 'development'
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`
          )
        }
      : undefined
})
