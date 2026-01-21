import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        outline: "border-border bg-transparent text-foreground",
        muted: "border-transparent bg-background-subtle text-muted-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
      },
      shape: {
        default: "radius-panel",
        pill: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "pill",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, shape, ...props }: BadgeProps) {
  return (
    <div
      data-slot="badge"
      className={cn(badgeVariants({ variant, shape }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
