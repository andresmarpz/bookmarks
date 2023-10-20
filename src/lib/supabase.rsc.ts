import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

export const supabaseServerComponent = createServerComponentClient({ cookies })
