import Image from "next/image"

const DUMMIES = [
  {
    url: "https://vercel.com",
    image: "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png",
    title: "Vercel: Develop. Preview. Ship. For the best frontend teams",
    description:
      "Vercel’s frontend cloud gives developers the frameworks, workflows, and infrastructure to build a faster, more personalized Web.",
  },
  {
    url: "https://notion.so",
    image: "https://www.notion.so/front-static/logo-ios.png",
    title: "Your connected workspace for wiki, docs & projects",
    description:
      "A new tool that blends your everyday work apps into one. It’s the all-in-one workspace for you and your team.",
  },
  {
    url: "https://raycast.com",
    image: "https://www.raycast.com/favicon-production.png",
    title: "Raycast - Supercharged productivity",
    description:
      "Raycast lets you control your tools with a few keystrokes. It’s designed to keep you focused.",
  },
  {
    url: "https://figma.com",
    image: "https://static.figma.com/app/icon/1/icon-192.png",
    title: "Figma: The Collaborative Interface Design Tool",
    description:
      "Figma is the leading collaborative design tool for building meaningful products. Seamlessly design, prototype, develop, and collect feedback in a single platform.",
  },
]

export default function DummyBookmarks() {
  return DUMMIES.map((bm) => (
    <li className="m-auto max-w-3xl" key={bm.url}>
      <a
        className="flex gap-3 rounded-md border bg-neutral-900/40 p-3 shadow-md shadow-neutral-950/30 backdrop-blur transition-colors hover:bg-neutral-800/40"
        href={bm.url}
        target="_blank"
        rel="noreferrer noopener"
      >
        <Image
          className="h-8 w-8 rounded-md bg-neutral-950"
          src={bm.image}
          width={32}
          height={32}
          unoptimized
          alt=""
        />
        <span>
          <h5 className="text-gray-100">{bm.title}</h5>
          <p className="text-gray-500">{bm.description}</p>
        </span>
      </a>
    </li>
  ))
}
