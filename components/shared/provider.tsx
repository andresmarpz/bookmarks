"use client"

import { PropsWithChildren } from "react"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
      enableColorScheme
    >
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  )
}
