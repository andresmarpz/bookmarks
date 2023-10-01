import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

export const supabaseSCC = createServerComponentClient({ cookies })
