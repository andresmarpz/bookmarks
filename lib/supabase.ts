import { cache } from 'react'
import { Database } from '@/types/supabase'
import { auth } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js'

/**
 * Since we can't specify a per-request fetch function in Supabase, we need to
 * create a new client for each request. This is a workaround for that.
 * Theoretically, this doesn't come with too much perf overhead, since the
 * client is http based and the connection pool is handled by Supabase.
 * See: https://github.com/supabase/supabase-js/issues/438
 * Since using the same client and setting a local variable pointing to the
 * desired fetch function creates race conditions, we are left with this solution only.
 */

const getToken = cache(async () =>
  auth().getToken({
    template:
      process.env.NODE_ENV === 'production' ? 'supabase-prod' : 'supabase'
  })
)

export const supabase = cache(async (args?: RequestInit) => {
  const token = await getToken()
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`
        },
        fetch: (input, init) => fetch(input, { ...init, ...args })
      }
    }
  )
})
