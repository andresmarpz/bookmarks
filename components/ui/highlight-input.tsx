"use client"

import { forwardRef, useRef, useState } from "react"
import { Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

const HighlightInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, forwardedRef) => {
  const divRef = useRef<HTMLInputElement>(null)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLInputElement>) => {
    if (!divRef.current) return

    const div = divRef.current
    const rect = div.getBoundingClientRect()

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleOnFocus = () => {
    setFocused(true)
    setOpacity(0)
  }

  const handleOnBlur = () => {
    setFocused(false)
    if (hovered) setOpacity(1)
  }

  const handleMouseEnter = () => {
    setHovered(true)
    if (!focused) setOpacity(1)
  }

  const handleMouseLeave = () => {
    setHovered(false)
    setOpacity(0)
  }

  return (
    <>
      <div className={cn("relative", className)}>
        <Input
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          ref={forwardedRef}
          className="pl-10"
          {...props}
        />
        <input
          ref={divRef}
          disabled
          style={{
            opacity,
            WebkitMaskImage: `radial-gradient(30% 30px at ${position.x}px ${position.y}px, black 45%, transparent)`,
          }}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-10 h-10 w-full cursor-default rounded-md border border-gray-600 bg-[transparent] p-3.5 opacity-0 transition-opacity  duration-500 placeholder:select-none dark:border-gray-500"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2"
        >
          <Plus className="h-4 w-4 text-gray-700 dark:text-gray-300" />
        </span>
      </div>
    </>
  )
})
HighlightInput.displayName = "HighlighInput"

export default HighlightInput
