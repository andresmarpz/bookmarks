import { PropsWithChildren } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { useSession } from 'next-auth/react'

import Spinner from '~/components/shared/spinner'

export default function Auth({ children }: PropsWithChildren) {
  const { status } = useSession({ required: true })

  return (
    <AnimatePresence>
      {status === 'loading' ? (
        <m.div
          className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black"
          key="loading-screen-motion"
          initial={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 0.65,
            ease: 'easeOut'
          }}
        >
          <m.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="text-gray-600 dark:text-neutral-500"
          >
            loading your data..
          </m.span>
        </m.div>
      ) : (
        <m.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3, times: [] }}
        >
          {children}
        </m.div>
      )}
    </AnimatePresence>
  )
}
