import { type SvgIconProps } from "./svg-icon"

export default function RadixUISVG({ width, height }: SvgIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 32}
      height={height ?? 32}
      viewBox="0 0 35 35"
      fill="white"
    >
      <path d="M17 35C10.3726 35 5 30.0751 5 24C5 17.9249 10.3726 13 17 13L17 35Z" />
      <rect x="5" width="12" height="12" />
      <circle cx="24" cy="6" r="6" />
    </svg>
  )
}
