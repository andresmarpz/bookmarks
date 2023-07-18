import NextSVG from "@/components/shared/svg/nextjs.svg"
import RadixUISVG from "@/components/shared/svg/radixui.svg"
import ShieldSVG from "@/components/shared/svg/shield.svg"
import SupabaseSVG from "@/components/shared/svg/supabase.svg"
import TailwindSVG from "@/components/shared/svg/tailwind.svg"

export default function FeaturedTechnologies() {
  return (
    <ul className="m-auto flex max-w-6xl flex-wrap justify-center gap-4 p-4">
      <FeaturedItem
        title="Next.js 13"
        description="Features the new App Router with React Server Components. Layouts, loading states, Metadata API, and more."
        icon={NextSVG}
      />
      <FeaturedItem
        title="Supabase"
        description="Open-source Firebase alternative. Features a Postgres database, auth, storage, and more."
        icon={SupabaseSVG}
      />
      <FeaturedItem
        title="Tailwind CSS"
        description="A utility-first CSS framework packed with classes to build UIs quickly."
        icon={TailwindSVG}
      />
      <FeaturedItem
        title="Radix UI"
        description="A collection of open-source UI components for building high-quality, accessible design systems and web apps."
        icon={RadixUISVG}
      />
    </ul>
  )
}

type ItemProps = {
  title: string
  description: string
  icon: React.ElementType
}
function FeaturedItem({ title, description, icon: Icon }: ItemProps) {
  return (
    <li className="flex min-w-[350px] max-w-lg flex-1 flex-col gap-4 rounded-lg border bg-black/60 p-4 shadow-xl shadow-neutral-950/50">
      <Icon />
      <span>
        <h3 className="text-lg">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </span>
    </li>
  )
}
