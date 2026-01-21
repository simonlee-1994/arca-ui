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
  variant?: "default" | "muted" | "onTray"
}) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        // Base styles
        "shrink-0",
        // Orientation-specific sizing
        "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        // Variant styles
        // Default: Standard divider for white/canvas backgrounds
        variant === "default" && "bg-border",
        // Muted: Lighter divider for dense content areas
        variant === "muted" && "bg-border/50",
        // OnTray: Darker divider for use on tray backgrounds (needs more contrast)
        variant === "onTray" && "bg-slate-300",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
