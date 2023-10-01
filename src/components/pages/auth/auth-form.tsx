"use client"

import { useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { signInWithGithub } from "@/lib/auth/sign-in-with-github"
import { signInWithPassword } from "@/lib/auth/sign-in-with-password"
import { supabaseCCC } from "@/lib/supabase.client"
import Spinner from "@/components/ui/Spinner"
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
import GithubSVG from "@/components/shared/svg/github.svg"

export default function AuthForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnTo = searchParams.get("returnTo") ?? "/dashboard"

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

  const [isEmailLoading, startEmailTransition] = useTransition()
  const [isGithubLoading, startGithubTransition] = useTransition()

  const onSubmit = form.handleSubmit((data) => {
    const { email, password } = data
    try {
      startEmailTransition(async () => {
        await signInWithPassword({ email, password })

        router.push(returnTo)
      })
    } catch (err) {
      console.error(err)
    }
  })

  const handleGithubSignIn = () => {
    startGithubTransition(async () => {
      try {
        await signInWithGithub({
          redirectTo: returnTo,
        })
      } catch (err) {
        console.error(err)
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col">
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
                  <Input {...field} />
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
            {isEmailLoading ? <Spinner /> : "Sign In"}
          </Button>
        </div>

        <div className="my-4 flex items-center gap-3">
          <hr className="grow border-t border-neutral-600" />
          <span className="text-xs text-neutral-400">OR CONTINUE WITH</span>
          <hr className="grow border-t border-neutral-600" />
        </div>

        <Button
          type="button"
          variant="secondary"
          className="flex w-full items-center justify-center gap-2"
          onClick={handleGithubSignIn}
          disabled={isGithubLoading}
        >
          {isGithubLoading ? (
            <Spinner />
          ) : (
            <>
              <GithubSVG width={16} height={16} />
              GitHub
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
