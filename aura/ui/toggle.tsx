"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium",
    "transition-all duration-300 ease-out",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2",
    "whitespace-nowrap",
    "active:scale-[0.97]",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-primary/10 border border-primary/20 text-primary data-[state=off]:hover:bg-primary/15 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary/50 data-[state=on]:shadow-sm data-[state=on]:hover:bg-primary/90",
        surface:
          "bg-card border border-border/50 text-muted-foreground data-[state=off]:hover:bg-muted/40 data-[state=off]:hover:text-foreground data-[state=on]:bg-primary/10 data-[state=on]:text-primary data-[state=on]:border-primary/20 data-[state=on]:shadow-sm data-[state=on]:hover:bg-primary/15",
        outline:
          "border border-primary/20 bg-primary/5 text-primary data-[state=off]:hover:bg-primary/10 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary/50 data-[state=on]:shadow-sm data-[state=on]:hover:bg-primary/90",
        ghost:
          "bg-transparent border border-transparent text-muted-foreground data-[state=off]:hover:bg-primary/10 data-[state=off]:hover:text-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary/30 data-[state=on]:shadow-sm data-[state=on]:hover:bg-primary/90",
        primary:
          "bg-primary/10 border border-primary/20 text-primary data-[state=off]:hover:bg-primary/15 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary/50 data-[state=on]:shadow-sm data-[state=on]:hover:bg-primary/90",
        destructive:
          "bg-destructive/10 border border-destructive/20 text-destructive data-[state=off]:hover:bg-destructive/15 data-[state=on]:bg-destructive data-[state=on]:text-destructive-foreground data-[state=on]:border-destructive/50 data-[state=on]:shadow-sm data-[state=on]:hover:bg-destructive/90",
      },
      size: {
        default: "h-9 px-4 min-w-9",
        sm: "h-8 px-3 min-w-8",
        lg: "h-10 px-5 min-w-10",
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
