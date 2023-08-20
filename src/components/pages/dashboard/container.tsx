import { forwardRef, type ElementType, type HTMLAttributes } from "react"
import { cn } from "@/utils/clsx"

const Container = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { as?: ElementType }
>(({ children, className, as, ...props }, forwardedRef) => {
  const Element = as || "div"
  return (
    <Element
      className={cn("m-auto w-full max-w-6xl", className)}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Element>
  )
})
Container.displayName = "Container"

export default Container
