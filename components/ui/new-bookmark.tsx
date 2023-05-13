import { PlusIcon } from "lucide-react"

import { Input } from "@/components/ui/input"

export default function NewBookmark() {
  return (
    <label>
      <div className="relative w-full">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
          <PlusIcon className="h-4 w-4 text-neutral-700 dark:text-neutral-300" />
        </span>
        <Input
          id="new-bookmark"
          placeholder="Insert a link, color, or just plain text.."
          className="h-10 w-full rounded bg-background px-10"
        />
      </div>
    </label>
  )
}
