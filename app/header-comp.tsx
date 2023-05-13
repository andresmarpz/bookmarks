import Controls from "@/app/controls";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Link href="/">Home</Link>
      <Link href="/app">Protected</Link>
      <Controls />
    </header>
  );
}
