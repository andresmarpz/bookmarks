import { createUserWithPassword } from "@/lib/action/user/user.actions"
import type { CreateUserWithPasswordSchema } from "@/lib/action/user/user.schema"

export async function signUpWithPassword(
  opts: Pick<CreateUserWithPasswordSchema, "email" | "password" | "username">
) {
  return await createUserWithPassword(opts)
}
