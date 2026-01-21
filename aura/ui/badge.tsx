import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center border px-3 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3.5 gap-1.5 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "text-foreground border-border/60 bg-background [a&]:hover:bg-accent [a&]:hover:text-accent-foreground [a&]:hover:border-primary/30",
        soft:
          "border-transparent bg-primary/10 text-primary [a&]:hover:bg-primary/20",
        success:
          "border-transparent bg-success text-success-foreground [a&]:hover:bg-success/90",
        warning:
          "border-transparent bg-warning text-warning-foreground [a&]:hover:bg-warning/90",
        info:
          "border-transparent bg-info text-info-foreground [a&]:hover:bg-info/90",
      },
      size: {
        default: "h-6 text-xs rounded-full",
        sm: "h-5 text-[10px] px-2 rounded-full",
        lg: "h-7 text-sm px-4 rounded-full",
      },
      shape: {
        pill: "rounded-full",
        rounded: "rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "pill",
    },
  }
)

function Badge({
  className,
  variant,
  size,
  shape,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, shape }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
