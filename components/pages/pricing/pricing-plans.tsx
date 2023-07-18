import PricingPlanCard from "./pricing-plan-card"

export default function PricingPlans() {
  return (
    <ul className="flex flex-wrap justify-center gap-8 p-8">
      <PricingPlanCard
        plan="Basic"
        price={0}
        description="Start with the basics. Save ocasionally, keep forever."
        features={[
          { label: "50 Daily Bookmarks", checked: true },
          { label: "Unlimited Collections", checked: true },
          { label: "Unlimited Storage", checked: true },
          { label: "Public Profile", checked: true },
        ]}
      />
      <PricingPlanCard
        plan="Pro"
        price={10}
        description="For power users, more bookmarks, more collections, more features."
        features={[
          { label: "Unlimited Bookmarks", checked: true },
          { label: "Unlimited Collections", checked: true },
          { label: "Unlimited Storage", checked: true },
          { label: "Public Profile", checked: true },
          { label: "Dashboard Analytics", checked: true },
        ]}
      />
    </ul>
  )
}
