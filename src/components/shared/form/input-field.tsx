import * as React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '../input'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string

  pre?: React.ReactNode
}

const InputField = React.forwardRef<HTMLInputElement, Props>(
  ({ label, pre, type, ...props }, forwardedRef) => {
    return (
      <label>
        <span className="mb-2 block text-sm text-neutral-500">{label}</span>
        <div className="relative">
          <Input
            {...props}
            ref={forwardedRef}
            hasPrefix={!!pre}
            type={type || 'text'}
          />
          {pre && (
            <span className="absolute top-1/2 left-3 -translate-y-1/2">
              {pre}
            </span>
          )}
        </div>
      </label>
    )
  }
)
InputField.displayName = 'InputField'

export default InputField
