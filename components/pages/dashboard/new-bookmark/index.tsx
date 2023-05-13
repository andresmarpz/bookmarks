"use client"

import HighlightInput from "@/components/ui/highlight-input"

export default function NewBookmark() {
  return (
    <label>
      <HighlightInput
        autoComplete="off"
        placeholder="Insert a link, color, or just plain text.."
        type="text"
      />
    </label>
  )
}
