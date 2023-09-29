"use client"

import { useTransition } from "react"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"

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
  const form = useForm()

  const [isGithubLoading, startGithubLoading] = useTransition()

  const onSubmit = form.handleSubmit((data) => {})

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

          <Button type="submit" size="sm" variant="default">
            Sign in with email
          </Button>
        </div>

        <div className="my-4 flex items-center gap-3">
          <hr className="grow border-t border-neutral-600" />
          <span className="text-xs text-neutral-400">OR CONTINUE WITH</span>
          <hr className="grow border-t border-neutral-600" />
        </div>

        <Button
          variant="secondary"
          className="flex w-full items-center justify-center gap-2"
          onClick={() => signIn("github")}
        >
          <GithubSVG width={16} height={16} />
          GitHub
        </Button>
      </form>
    </Form>
  )
}
