import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const isFileInput = type === "file"

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles - capsule shape (radius-control) for Clarity signature
        "radius-control flex h-10 w-full border border-border bg-background px-4 text-sm",
        isFileInput ? "py-0 file:h-10 file:py-0 file:leading-10" : "py-2",
        // File input styles
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        // Placeholder with muted color
        "placeholder:text-muted-foreground",
        // Selection styles
        "selection:bg-primary/10 selection:text-foreground",
        // Focus ring - "ink-like" presence: soft ring with offset, not loud
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:border-ring",
        // Hover state - subtle border change
        "hover:border-border-hover",
        // Disabled state
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-border",
        // Invalid state
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        // Smooth transition
        "transition-colors duration-200",
        className
      )}
      {...props}
    />
  )
}

export { Input }
