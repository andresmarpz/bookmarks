import Link from "next/link"
import AuthForm from "~/components/pages/auth/auth-form"

export default async function LoginPage() {
  return (
    <main className="w-full max-w-sm p-5">
      <h1 className="text-xl">Sign In</h1>
      <h3 className="mb-6 text-sm text-neutral-400">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup" className="underline underline-offset-2">
          Sign up
        </Link>{" "}
        now.
      </h3>
      <AuthForm type="signin" />
    </main>
  )
}
