import { useEffect, useState } from "react"

export default function useIsHydrated() {
  const [hasHydrated, setHasHydrated] = useState(false)

  useEffect(() => setHasHydrated(true), [])

  return hasHydrated
}
