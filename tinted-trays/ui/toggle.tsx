"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5 whitespace-nowrap",
    "text-sm font-medium transition-all duration-200",
    "rounded-xl outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        // Default: tray fill when off, primary when on
        default: [
          "bg-tray border border-border/40 text-muted-foreground",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_6px_rgba(15,23,42,0.04)]",
          "hover:border-border/60 hover:text-foreground",
          "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary",
          "data-[state=on]:shadow-[0_1px_2px_rgba(15,23,42,0.16),inset_0_1px_0_rgba(255,255,255,0.25)]",
          "active:scale-[0.98]",
        ],
        // Outline: transparent when off, tray fill when on
        outline: [
          "border border-border/60 bg-transparent text-muted-foreground",
          "hover:border-border/80 hover:bg-tray/40 hover:text-foreground",
          "data-[state=on]:bg-tray data-[state=on]:border-primary/40 data-[state=on]:text-primary",
          "data-[state=on]:shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_6px_rgba(15,23,42,0.04)]",
          "active:scale-[0.98]",
        ],
        // Ghost: minimal style for toolbars
        ghost: [
          "text-muted-foreground",
          "hover:bg-accent hover:text-accent-foreground",
          "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
          "active:scale-[0.98]",
        ],
        // Capsule: for inverted context (on tray background)
        capsule: [
          "bg-capsule border border-border/60 rounded-full text-muted-foreground",
          "shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]",
          "hover:border-border/80 hover:text-foreground",
          "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary",
          "active:scale-[0.98]",
        ],
      },
      size: {
        sm: "h-7 px-2.5 min-w-7 text-xs",
        default: "h-8 px-3 min-w-8",
        lg: "h-10 px-4 min-w-10",
        "icon-sm": "size-7",
        icon: "size-8",
        "icon-lg": "size-10",
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
