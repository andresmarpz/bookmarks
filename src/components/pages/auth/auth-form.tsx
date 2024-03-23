"use client"

import { useTransition } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle } from "lucide-react"

import { signInWithGithub } from "~/lib/auth/sign-in-with-github"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { Button } from "~/components/ui/button"
import Spinner from "~/components/ui/Spinner"
import SignInForm from "~/components/pages/auth/signin-form"
import SignUpForm from "~/components/pages/auth/signup-form"
import GithubSVG from "~/components/shared/svg/github.svg"

interface Props {
  type: "signin" | "signup"
}

export default function AuthForm({ type }: Props) {
  const searchParams = useSearchParams()

  const returnTo = searchParams.get("returnTo") ?? "/dashboard"
  const confirmEmail = searchParams.get("confirmEmail")

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
      {type === "signin" && confirmEmail && (
        <Alert variant="default" className="my-4">
          <CheckCircle className="h-4 w-4 " />
          <AlertTitle>Your email has been confirmed!</AlertTitle>
          <AlertDescription>Please log in with your credentials.</AlertDescription>
        </Alert>
      )}
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
