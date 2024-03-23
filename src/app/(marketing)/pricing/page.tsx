import PricingPlans from "~/components/pages/pricing/pricing-plans"

export default function Pricing() {
  return (
    <div className="pt-40">
      <section className="text-center">
        <h1 className="font-calSans text-7xl">Pricing</h1>
        <h2 className="mt-2 text-xl text-gray-400">
          Simple, expected. Start free and go Pro if you need more.
        </h2>
      </section>

      <section className="mt-12 pb-40">
        <PricingPlans />
        <p className="text-center text-gray-400">
          Bookmarks is a open-source demo app. You can upgrade for free.
        </p>
      </section>
    </div>
  )
}
