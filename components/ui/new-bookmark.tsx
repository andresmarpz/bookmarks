import { Input } from '@/components/ui/input'
import { PlusIcon } from 'lucide-react'

export default function NewBookmark() {
  return (
    <label>
      <div className="relative w-full">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <PlusIcon className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
        </span>
        <Input
          id="new-bookmark"
          placeholder="Insert a link, color, or just plain text.."
          className="rounded px-10 w-full h-10 bg-background"
        />
      </div>
    </label>
  )
}
