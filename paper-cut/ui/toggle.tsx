"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const elevatedToggleMotion =
  "shadow-paper-sm hover:shadow-paper-md hover:-translate-x-[var(--paper-lift-sm)] hover:-translate-y-[var(--paper-lift-sm)] active:translate-x-[var(--paper-lift-sm)] active:translate-y-[var(--paper-lift-sm)] active:shadow-paper-pressed"

const toggleVariants = cva(
  "relative inline-flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-paper ease-paper disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none whitespace-nowrap focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default:
          cn(
            "bg-card text-muted-foreground border border-paper-edge",
            elevatedToggleMotion,
            "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary/80 data-[state=on]:shadow-paper-pressed",
            "data-[state=on]:hover:bg-primary/90 data-[state=on]:hover:shadow-paper-sm"
          ),
        outline:
          cn(
            "bg-background border border-paper-edge text-foreground",
            elevatedToggleMotion,
            "data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:border-foreground/80 data-[state=on]:shadow-paper-pressed",
            "data-[state=on]:hover:bg-foreground/90 data-[state=on]:hover:shadow-paper-sm"
          ),
        flat:
          "bg-secondary/60 text-foreground border border-paper-edge shadow-none hover:bg-accent hover:text-accent-foreground active:bg-accent/80 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary/80",
        "flat-outline":
          "bg-transparent text-foreground border border-paper-edge shadow-none hover:bg-accent/40 active:bg-accent/60 data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:border-foreground/80",
      },
      size: {
        default: "h-9 px-4 min-w-9 rounded-[16px]",
        sm: "h-8 px-3 min-w-8 rounded-[14px]",
        lg: "h-11 px-5 min-w-11 rounded-[20px]",
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
