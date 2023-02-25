import { trpc } from '@/lib/trpc'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

const Application = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default trpc.withTRPC(Application)
