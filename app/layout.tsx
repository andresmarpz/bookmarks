import Providers from "@/components/shared/provider"

import "./globals.css"
import { Inter } from "next/font/google"

import { cn } from "@/lib/utils"
import { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: "%s | Bookmarks",
    default: "Bookmarks"
  },
  description: "A simple bookmark manager.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "px-4")}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
