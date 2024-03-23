import AuthForm from "~/components/pages/auth/auth-form"

export default async function SignUpPage() {
  return (
    <main className="w-full max-w-sm p-5">
      <h1 className="text-xl">Sign Up</h1>
      <AuthForm type="signup" />
    </main>
  )
}
