import { Skeleton } from '@/components/ui/skeleton'

export default function GroupContainerLoading() {
  return (
    <span className="flex gap-2">
      <Skeleton className="h-10 w-52" />
    </span>
  )
}
