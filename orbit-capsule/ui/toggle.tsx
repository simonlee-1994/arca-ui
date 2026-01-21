"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "orbit-hover-offset-sm inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none whitespace-nowrap",
  {
    variants: {
      variant: {
        default:
          "border border-foreground bg-secondary/50 hover:bg-secondary data-[state=on]:bg-foreground data-[state=on]:text-background",
        outline:
          "border border-foreground bg-background hover:bg-secondary/40 data-[state=on]:bg-foreground data-[state=on]:text-background",
        accent:
          "border border-foreground/30 bg-accent/15 text-foreground hover:bg-accent/30 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground data-[state=on]:border-foreground",
      },
      size: {
        default: "h-9 px-4 min-w-9",
        sm: "h-8 px-3 min-w-8 text-xs",
        lg: "h-11 px-5 min-w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
