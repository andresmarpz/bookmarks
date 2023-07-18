import { Check } from "lucide-react"

export default function PlanFeatureItem({
  children,
  checked,
}: {
  children: React.ReactNode
  checked?: boolean
}) {
  return (
    <dd className="flex items-center gap-2 text-gray-400">
      {checked ? (
        <Check className="h-4 w-4 text-green-400" />
      ) : (
        <span className="w-4" />
      )}
      {children}
    </dd>
  )
}
