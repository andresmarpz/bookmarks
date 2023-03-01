import * as React from 'react'

import { cn } from '~/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasPrefix?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasPrefix = false, ...props }, ref) => {
    return (
      <input
        className={cn(
          'mr-3 block w-full rounded-md border border-neutral-300 bg-transparent py-2 pr-2 text-sm leading-normal',
          'placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-50 dark:focus:ring-neutral-400 dark:focus:ring-offset-neutral-900',
          'placeholder:text-ellipsis',
          hasPrefix ? 'pl-9' : 'pl-3',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
