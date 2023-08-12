import { getSession } from "@/lib/auth/get-session"

export async function withAuth() {
  const session = await getSession()

  if (!session) throw new Error("You must be authenticated")

  return {
    session,
  }
}
