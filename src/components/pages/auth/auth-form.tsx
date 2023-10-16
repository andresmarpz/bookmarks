"use client"

import { useTransition } from "react"
import { useSearchParams } from "next/navigation"

import { signInWithGithub } from "@/lib/auth/sign-in-with-github"
import Spinner from "@/components/ui/Spinner"
import { Button } from "@/components/ui/button"
import SignInForm from "@/components/pages/auth/signin-form"
import SignUpForm from "@/components/pages/auth/signup-form"
import GithubSVG from "@/components/shared/svg/github.svg"

interface Props {
  type: "signin" | "signup"
}

export default function AuthForm({ type }: Props) {
  const searchParams = useSearchParams()
  const returnTo = searchParams.get("returnTo") ?? "/dashboard"

  const [isGithubLoading, startGithubTransition] = useTransition()

  const handleGithubSignIn = () =>
    startGithubTransition(async () => {
      try {
        await signInWithGithub({
          redirectTo: returnTo,
        })
      } catch (err) {
        console.error(err)
      }
    })

  return (
    <div>
      {type === "signin" ? <SignInForm /> : <SignUpForm />}
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
    </div>
  )
}
