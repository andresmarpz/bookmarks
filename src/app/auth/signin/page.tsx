import Link from "next/link"

import AuthForm from "@/components/pages/auth/auth-form"

export default function LoginPage() {
  return (
    <main className="w-full max-w-sm p-5">
      <h1 className="text-xl">Sign In</h1>
      <h3 className="mb-6 text-sm text-neutral-400">
        Don&apos;t have an account? <Link href="/auth/signup">Sign up</Link> now.
      </h3>
      <AuthForm />
    </main>
  )
}
