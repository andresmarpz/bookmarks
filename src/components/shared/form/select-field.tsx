import { forwardRef } from 'react'

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select'

const SelectField = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Select>
>(({ children, ...props }, ref) => {
  return (
    <Select {...props}>
      <SelectTrigger ref={ref}>
        <SelectValue placeholder="Select a collection" />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  )
})
SelectField.displayName = 'SelectField'

export default SelectField
