"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  variant = "default",
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> & {
  variant?: "default" | "gradient" | "dashed" | "dotted"
}) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      data-variant={variant}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 transition-opacity duration-300",
        // Horizontal base
        "data-[orientation=horizontal]:w-full",
        // Vertical base
        "data-[orientation=vertical]:h-full",
        // Default variant - soft, organic feel
        "data-[variant=default]:bg-border/60",
        "data-[variant=default]:data-[orientation=horizontal]:h-px",
        "data-[variant=default]:data-[orientation=vertical]:w-px",
        // Gradient variant - smooth fade effect
        "data-[variant=gradient]:data-[orientation=horizontal]:h-px",
        "data-[variant=gradient]:data-[orientation=horizontal]:bg-gradient-to-r data-[variant=gradient]:data-[orientation=horizontal]:from-transparent data-[variant=gradient]:data-[orientation=horizontal]:via-border data-[variant=gradient]:data-[orientation=horizontal]:to-transparent",
        "data-[variant=gradient]:data-[orientation=vertical]:w-px",
        "data-[variant=gradient]:data-[orientation=vertical]:bg-gradient-to-b data-[variant=gradient]:data-[orientation=vertical]:from-transparent data-[variant=gradient]:data-[orientation=vertical]:via-border data-[variant=gradient]:data-[orientation=vertical]:to-transparent",
        // Dashed variant - softer, more organic dash pattern
        "data-[variant=dashed]:data-[orientation=horizontal]:h-px",
        "data-[variant=dashed]:data-[orientation=horizontal]:bg-[length:10px_1px] data-[variant=dashed]:data-[orientation=horizontal]:bg-repeat-x data-[variant=dashed]:data-[orientation=horizontal]:bg-[linear-gradient(90deg,var(--border)_55%,transparent_55%)]",
        "data-[variant=dashed]:data-[orientation=vertical]:w-px",
        "data-[variant=dashed]:data-[orientation=vertical]:bg-[length:1px_10px] data-[variant=dashed]:data-[orientation=vertical]:bg-repeat-y data-[variant=dashed]:data-[orientation=vertical]:bg-[linear-gradient(180deg,var(--border)_55%,transparent_55%)]",
        // Dotted variant - gentler dots
        "data-[variant=dotted]:data-[orientation=horizontal]:h-px",
        "data-[variant=dotted]:data-[orientation=horizontal]:bg-[length:6px_1px] data-[variant=dotted]:data-[orientation=horizontal]:bg-repeat-x data-[variant=dotted]:data-[orientation=horizontal]:bg-[linear-gradient(90deg,var(--border)_30%,transparent_30%)]",
        "data-[variant=dotted]:data-[orientation=vertical]:w-px",
        "data-[variant=dotted]:data-[orientation=vertical]:bg-[length:1px_6px] data-[variant=dotted]:data-[orientation=vertical]:bg-repeat-y data-[variant=dotted]:data-[orientation=vertical]:bg-[linear-gradient(180deg,var(--border)_30%,transparent_30%)]",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
