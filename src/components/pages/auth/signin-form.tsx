import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { AuthApiError } from "@supabase/supabase-js"
import { AlertCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useSignInWithPassword } from "@/hooks/auth/use-sign-in-with-password"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Spinner from "@/components/ui/Spinner"

export default function SignInForm() {
  const searchParams = useSearchParams()
  const returnTo = searchParams.get("returnTo") ?? "/dashboard"

  const { mutate, isPending, error } = useSignInWithPassword({ returnTo })

  const form = useForm<{
    email: string
    password: string
  }>({
    defaultValues: {
      email: "",
      password: "",
    },

    resolver: zodResolver(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
      })
    ),
  })

  const onSubmit = form.handleSubmit((data) => mutate(data))

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col">
        {error && error instanceof AuthApiError && (
          <Alert variant="destructive" className="my-2">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error.message}.</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col gap-3">
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
            disabled={isPending}
          >
            {isPending ? <Spinner /> : "Sign In"}
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
