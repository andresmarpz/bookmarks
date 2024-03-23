import { cn } from "~/utils/clsx"
import PlanFeatureItem from "./plan-feature-item"

interface Props {
  plan: "Basic" | "Pro"
  price: number
  description: string
  features: { label: string; checked?: boolean }[]
}

export default function PricingPlanCard({ plan, price, description, features }: Props) {
  return (
    <li className="flex max-w-sm flex-col justify-between rounded-2xl border border-neutral-800 bg-black px-5 py-4 shadow-xl shadow-black/50 backdrop-blur">
      <div>
        <div className="flex flex-col items-center gap-4 text-center">
          <span
            className={cn(
              "rounded-full px-3 py-[2px]",
              plan === "Pro" ? "bg-blue-900 text-blue-300" : "bg-neutral-700"
            )}
          >
            {plan}
          </span>
          <h4 className="text-3xl">${price} / mo</h4>
          <p className="text-sm text-gray-500">{description}</p>
        </div>

        <hr className="mb-8 mt-4" />

        <dl className="flex flex-col gap-4">
          {features.map((feature, idx) => (
            <PlanFeatureItem key={plan + idx + "item"} checked={feature.checked}>
              {feature.label}
            </PlanFeatureItem>
          ))}
        </dl>
      </div>

      <button className="mt-10 self-stretch rounded-xl bg-gray-200 py-3 font-bold text-gray-950">
        {plan === "Basic" ? "Get Started" : "Go Pro"}
      </button>
    </li>
  )
}
