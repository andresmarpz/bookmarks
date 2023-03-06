import '~/styles/globals.css'
import { NextComponentType } from 'next'
import type { AppType } from 'next/app'
import { Inter as FontSans } from 'next/font/google'
import { LazyMotion } from 'framer-motion'
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
  const domAnimation = () =>
    import('~/lib/framer/domAnimation').then((res) => res.default)

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
        <LazyMotion strict features={domAnimation}>
          <SessionProvider session={session}>
            {(Component as ComponentType).auth ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </SessionProvider>
        </LazyMotion>
      </ThemeProvider>
    </>
  )
}

export default api.withTRPC(Application)
