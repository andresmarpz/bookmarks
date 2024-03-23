import FeaturedTechnologies from "~/components/pages/features/featured-technologies"

export default function Features() {
  return (
    <div className="pt-40">
      <section className="text-center">
        <h1 className="font-calSans text-7xl">Features</h1>
        <p className="text-gray-400">
          Built open-source to help showcase Next.js 13 and the App Router.
        </p>
      </section>

      <section className="py-20">
        <FeaturedTechnologies />
      </section>
    </div>
  )
}
