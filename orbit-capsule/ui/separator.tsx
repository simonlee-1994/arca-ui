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
  variant?: "default" | "thick" | "dashed" | "dotted"
}) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        // Orbit Capsule: Solid ink line separators
        "bg-foreground shrink-0",
        // Orientation styles
        "data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full",
        // Default thickness
        variant === "default" && "data-[orientation=horizontal]:h-px data-[orientation=vertical]:w-px",
        // Thick variant for more prominent separation
        variant === "thick" && "data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:w-0.5",
        // Dashed variant
        variant === "dashed" && "bg-transparent border-foreground data-[orientation=horizontal]:h-0 data-[orientation=horizontal]:border-t-2 data-[orientation=horizontal]:border-dashed data-[orientation=vertical]:w-0 data-[orientation=vertical]:border-l-2 data-[orientation=vertical]:border-dashed",
        // Dotted variant
        variant === "dotted" && "bg-transparent border-foreground data-[orientation=horizontal]:h-0 data-[orientation=horizontal]:border-t-2 data-[orientation=horizontal]:border-dotted data-[orientation=vertical]:w-0 data-[orientation=vertical]:border-l-2 data-[orientation=vertical]:border-dotted",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
