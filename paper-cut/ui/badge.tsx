import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Badge (Display / Level 1):
 * - Flat at rest (no shadow)
 * - Subtle lift on hover for tactility (can be disabled in dense layouts)
 */
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-[20px] border border-paper-edge font-semibold w-fit whitespace-nowrap shrink-0 px-3 py-1 text-xs gap-1.5 [&>svg]:pointer-events-none [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-3 transition-all duration-paper ease-paper focus-visible:ring-ring/50 focus-visible:ring-[3px] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-primary/20",
        secondary:
          "bg-secondary text-secondary-foreground",
        destructive:
          "bg-destructive text-white border-destructive/20",
        outline:
          "bg-card text-foreground border-2 border-foreground",
        success:
          "bg-green-500 text-white border-green-500/20",
        warning:
          "bg-amber-500 text-white border-amber-500/20",
        info:
          "bg-blue-500 text-white border-blue-500/20",
      },
      lift: {
        on: "",
        off: "",
      },
    },
    compoundVariants: [
      {
        lift: "on",
        className:
          "hover:-translate-x-[var(--paper-lift-sm)] hover:-translate-y-[var(--paper-lift-sm)] hover:shadow-paper-sm hover:z-10 active:translate-x-[var(--paper-lift-sm)] active:translate-y-[var(--paper-lift-sm)] active:shadow-paper-pressed",
      },
    ],
    defaultVariants: {
      variant: "default",
      lift: "on",
    },
  }
)

function Badge({
  className,
  variant,
  lift,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  Omit<VariantProps<typeof badgeVariants>, "lift"> & { asChild?: boolean; lift?: boolean }) {
  const Comp = asChild ? Slot : "span"
  const resolvedLift = lift ?? true

  return (
    <Comp
      data-slot="badge"
      data-lift={resolvedLift ? "on" : "off"}
      className={cn(badgeVariants({ variant, lift: resolvedLift ? "on" : "off" }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
