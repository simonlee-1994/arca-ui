import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-full border has-[>svg]:px-3",
  {
    variants: {
      affordance: {
        orbit: "orbit-hover-offset-sm",
        subtle: "hover:brightness-95",
        none: "",
      },
      variant: {
        default:
          "bg-primary text-primary-foreground border-foreground",
        destructive:
          "bg-destructive text-white border-foreground",
        outline:
          "bg-background text-foreground border-foreground",
        secondary:
          "bg-secondary text-secondary-foreground border-foreground",
        ghost:
          "border-transparent bg-transparent hover:bg-secondary",
        subtle:
          "border-transparent bg-secondary/40 text-foreground hover:bg-secondary/60",
        link:
          "text-primary underline-offset-4 hover:underline border-transparent",
        accent:
          "bg-accent text-accent-foreground border-foreground",
      },
      size: {
        default: "h-9 px-5 py-2",
        sm: "h-8 px-4 text-xs",
        lg: "h-11 px-7 text-base",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      affordance: "orbit",
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean
    }
>(({ className, variant, size, affordance, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, affordance, className }))}
      {...props}
    />
  )
})

Button.displayName = "Button"

export { Button, buttonVariants }
