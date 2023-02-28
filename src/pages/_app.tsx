import { trpc } from '@/lib/trpc'
import '@/styles/globals.css'
import { NextComponentType } from 'next'
import type { AppProps } from 'next/app'
import { Inter as FontSans } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'

import Auth from '@/components/shared/auth'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
})

type ComponentType = NextComponentType & { auth?: boolean }
const Application = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) => {
  return (
    <>
      <style jsx global>{`
				:root {
					--font-sans: ${fontSans.style.fontFamily};
				}
			}`}</style>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
        enableSystem
      >
        <SessionProvider session={session}>
          {(Component as ComponentType).auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </SessionProvider>
      </ThemeProvider>
    </>
  )
}

export default trpc.withTRPC(Application)
