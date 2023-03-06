import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex justify-between p-4">
      <ul className="flex gap-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/app">Library</Link>
        </li>
      </ul>
    </header>
  )
}
