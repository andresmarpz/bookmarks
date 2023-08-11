import Providers from "@/components/shared/provider"

import "./globals.css"

import { type Metadata } from "next"
import { Inter } from "next/font/google"
import LocalFont from "next/font/local"
import { cn } from "@/utils/clsx"

const inter = Inter({ subsets: ["latin"], weight: "variable" })
const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.woff2",
  variable: "--font-cal-sans",
})

export const metadata: Metadata = {
  title: {
    template: "%s | Bookmarks",
    default: "Bookmarks",
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
      <body className={cn(inter.className, calSans.variable, "bg-black")}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
