import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-3 py-0.5 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none transition-colors overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-foreground bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "border-foreground bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-foreground bg-destructive text-white hover:bg-destructive/90",
        outline:
          "border-foreground bg-background text-foreground hover:bg-secondary",
        accent:
          "border-foreground bg-accent text-accent-foreground hover:bg-accent/90",
        ghost:
          "border-transparent bg-secondary/50 text-foreground hover:bg-secondary hover:border-foreground",
      },
      size: {
        default: "h-6 px-3 text-xs",
        sm: "h-5 px-2 text-[10px]",
        lg: "h-7 px-4 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
