import { Bookmark } from "@prisma/client"

interface Props {
  bookmark: Bookmark
}
export default function BookmarkItem({ bookmark }: Props) {
  return (
    <li>
      <a
        href={bookmark.url}
        target="_blank"
        rel="noreferrer noopener"
        className="flex gap-1 rounded border p-2"
      >
        <span>
          {bookmark.image ? (
            <img src={bookmark.image} alt="" width={32} height={32} />
          ) : (
            <div className="h-8 w-8 rounded bg-gray-800" />
          )}
        </span>
        <span>
          <h5 className="text-gray-100">{bookmark.title}</h5>
          <p className="text-gray-400">{bookmark.description}</p>
        </span>
      </a>
    </li>
  )
}
