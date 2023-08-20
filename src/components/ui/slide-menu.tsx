import React, {
  forwardRef,
  type HTMLAttributes,
  type ReactElement,
} from "react"
import { Slot } from "@radix-ui/react-slot"

type SlideMenuItemProps = HTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
  children?: ReactElement
}

export const SlideMenuItem = forwardRef<HTMLButtonElement, SlideMenuItemProps>(
  ({ children, asChild, ...props }, ref) => {
    const Element = asChild ? Slot : "button"

    return (
      <Element {...props} ref={ref}>
        {!asChild && children}
      </Element>
    )
  }
)
SlideMenuItem.displayName = "SlideMenuItem"

export const SlideMenu = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  )
})
SlideMenu.displayName = "SlideMenu"
