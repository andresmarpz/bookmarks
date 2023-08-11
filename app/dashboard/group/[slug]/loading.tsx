import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import Spinner from "@/components/ui/Spinner"

export default function Loading() {
  return (
    <div>
      <header>
        <Skeleton className="mb-6 h-9 w-64" />
        <div className="flex gap-4">
          <div className="relative grow">
            <span className="absolute left-3 top-1/2 -translate-y-2">
              <Search className="h-4 w-4 text-gray-500" />
            </span>
            <Input
              disabled
              name="search"
              placeholder="Search within your bookmarks.."
              className="pl-10"
            />
          </div>
          <Button
            variant="secondary"
            className="flex items-center justify-center py-0"
          >
            <Spinner />
          </Button>
        </div>
      </header>
      <div className="py-4">asdasd</div>
    </div>
  )
}
