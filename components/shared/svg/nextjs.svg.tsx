import { type SvgIconProps } from "./svg-icon"

export default function NextSVG({ width, height }: SvgIconProps) {
  return (
    <svg
      aria-label="Next.js logomark"
      className="next-mark_root__iLw9v"
      height={height ?? 32}
      role="img"
      viewBox="0 0 180 180"
      width={width ?? 32}
    >
      <mask
        height="180"
        id=":R0:mask0_408_134"
        maskUnits="userSpaceOnUse"
        style={{ maskType: "alpha" }}
        width="180"
        x="0"
        y="0"
      >
        <circle cx="90" cy="90" fill="black" r="90"></circle>
      </mask>
      <g mask="url(#:R0:mask0_408_134)">
        <circle cx="90" cy="90" data-circle="true" fill="black" r="90"></circle>
        <path
          d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
          fill="url(#:R0:paint0_linear_408_134)"
        ></path>
        <rect
          fill="url(#:R0:paint1_linear_408_134)"
          height="72"
          width="12"
          x="115"
          y="54"
        ></rect>
      </g>
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id=":R0:paint0_linear_408_134"
          x1="109"
          x2="144.5"
          y1="116.5"
          y2="160.5"
        >
          <stop stopColor="white"></stop>
          <stop offset="1" stopColor="white" stopOpacity="0"></stop>
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id=":R0:paint1_linear_408_134"
          x1="121"
          x2="120.799"
          y1="54"
          y2="106.875"
        >
          <stop stopColor="white"></stop>
          <stop offset="1" stopColor="white" stopOpacity="0"></stop>
        </linearGradient>
      </defs>
    </svg>
  )
}
