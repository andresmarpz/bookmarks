import { useMemo } from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import Spinner from "@/components/ui/Spinner"
import DashboardPage from "@/components/pages/dashboard/dashboard-page"

export default function LoadingGroup() {
  const skeletons = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => i).map((i) => (
        <Skeleton key={"sk-bm-" + i} className="h-16 w-full animate-in fade-in-90" />
      )),
    []
  )

  return (
    <DashboardPage>
      <div className="my-8">
        <header>
          <div className="flex gap-4">
            <div className="relative grow">
              <span className="absolute left-3 top-1/2 -translate-y-2">
                <Search className="h-4 w-4 text-gray-500" />
              </span>
              <Input
                name="search"
                placeholder="Search within your bookmarks.."
                className="pl-10"
                disabled
              />
            </div>
            <Button
              variant="secondary"
              disabled
              className="flex items-center justify-center py-0"
            >
              <Spinner />
            </Button>
          </div>
        </header>
        <div className="py-4">
          <ul className="flex flex-col gap-3">{skeletons}</ul>
        </div>
      </div>
    </DashboardPage>
  )
}
