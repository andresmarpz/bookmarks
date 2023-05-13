import Link from "next/link"
import { Triangle } from "lucide-react"

export default function Navigator() {
  return (
    <span className="flex items-center gap-2">
      <Link
        href="/"
        className="ring-offset-background focus-visible:ring-ring flex h-10 w-10 items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        <Triangle className="h-4 w-4" />
      </Link>
      <hr className="mx-3 h-5 w-[1px] border-none bg-gray-700 [transform:_rotate(16deg)] dark:bg-gray-400" />
    </span>
  )
}
