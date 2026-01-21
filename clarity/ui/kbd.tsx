import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Clarity: Refined minimalism with soft radius and layered grays

const kbdVariants = cva(
  [
    // Base: precision typography with panel radius
    "inline-flex items-center justify-center",
    "radius-panel border border-border",
    "bg-background-subtle",
    "font-mono font-medium text-muted-foreground",
    "select-none",
  ],
  {
    variants: {
      size: {
        sm: "h-5 min-w-5 px-1.5 text-[10px]",
        default: "h-6 min-w-6 px-2 text-xs",
        lg: "h-7 min-w-7 px-2.5 text-sm",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

interface KbdProps
  extends React.ComponentProps<"kbd">,
    VariantProps<typeof kbdVariants> {}

function Kbd({ className, size, ...props }: KbdProps) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(kbdVariants({ size }), className)}
      {...props}
    />
  )
}

export { Kbd, kbdVariants }
