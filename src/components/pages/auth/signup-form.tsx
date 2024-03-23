import { useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { createUserWithPasswordSchema } from "~/lib/action/user/user.schema"
import { signUpWithPassword } from "~/lib/auth/sign-up-with-password"
import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import Spinner from "~/components/ui/Spinner"

export default function SignUpForm() {
  const [isEmailLoading, startEmailTransition] = useTransition()
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnTo = searchParams.get("returnTo") ?? "/dashboard"

  const form = useForm<{
    username: string
    email: string
    password: string
  }>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },

    resolver: zodResolver(createUserWithPasswordSchema),
  })

  const onSubmit = form.handleSubmit((data) => {
    const { username, email, password } = data
    try {
      startEmailTransition(async () => {
        const res = await signUpWithPassword({ username, email, password })

        if (res?.error) {
          if ("field" in res.error) {
            if (res.error.field === "username") {
              form.setError(
                "username",
                {
                  type: "manual",
                  message: res.error.message,
                },
                {
                  shouldFocus: true,
                }
              )
            } else if (res.error.field === "email") {
              form.setError(
                "email",
                {
                  type: "manual",
                  message: res.error.message,
                },
                {
                  shouldFocus: true,
                }
              )
            }
          }
        } else {
          router.push(returnTo)
        }
      })
    } catch (err) {
      console.error(err)
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col">
        <div className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="mt-4"
            type="submit"
            size="sm"
            variant="default"
            disabled={isEmailLoading}
          >
            {isEmailLoading ? <Spinner /> : "Sign Up"}
          </Button>
        </div>

        <div className="my-4 flex items-center gap-3">
          <hr className="grow border-t border-neutral-600" />
          <span className="text-xs text-neutral-400">OR CONTINUE WITH</span>
          <hr className="grow border-t border-neutral-600" />
        </div>
      </form>
    </Form>
  )
}
