import '~/styles/globals.css'
import { NextComponentType } from 'next'
import type { AppType } from 'next/app'
import { Inter as FontSans } from 'next/font/google'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'

import { api } from '~/lib/api'
import Auth from '~/components/shared/auth'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
})

type ComponentType = NextComponentType & { auth?: boolean }
const Application: AppType<{
  session: Session | null
}> = ({ Component, pageProps: { session, ...pageProps } }) => {
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

export default api.withTRPC(Application)
