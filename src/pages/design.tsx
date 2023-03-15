import { Button } from '~/components/shared/button'
import ThemeChanger from '~/components/shared/theme-changer'

export default function Design() {
  return (
    <div className="flex gap-2 p-4">
      <h1>Design</h1>
      <ThemeChanger />

      <Button>Hello</Button>

      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="subtle">Subtle</Button>
    </div>
  )
}
