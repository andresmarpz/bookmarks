import { Suspense } from "react"
import Link from "next/link"
import { BookmarkIcon } from "lucide-react"

import SelectGroup from "@/components/pages/dashboard/header/select-group"

export default async function Navigator() {
  return (
    <span className="flex items-center gap-2">
      <Link
        href="/"
        className="flex h-10 w-10 items-center justify-center rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <BookmarkIcon className="h-4 w-4" />
      </Link>
      <hr className="mx-3 h-5 w-[1px] border-none bg-gray-700 [transform:_rotate(16deg)] dark:bg-gray-400" />
      <Suspense fallback={"loading.."}>
        <SelectGroup />
      </Suspense>
    </span>
  )
}
