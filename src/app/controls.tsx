"use client"

import { signIn, signOut } from "next-auth/react"

export default function Controls() {
  return (
    <div>
      <button onClick={() => signOut()}>Sign out</button>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  )
}
