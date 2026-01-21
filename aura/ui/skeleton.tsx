import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const skeletonVariants = cva(
  // Base styles - organic, natural feel with smooth animation
  "",
  {
    variants: {
      variant: {
        default: "bg-muted/50",
        shimmer: "bg-gradient-to-r from-muted/40 via-muted/60 to-muted/40 bg-[length:200%_100%] animate-shimmer",
        pulse: "bg-muted/50 animate-pulse",
        wave: "bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 bg-[length:300%_100%] animate-shimmer",
      },
      rounded: {
        default: "rounded-xl",
        none: "rounded-none",
        sm: "rounded-md",
        lg: "rounded-xl",
        xl: "rounded-2xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "shimmer",
      rounded: "default",
    },
  }
)

function Skeleton({
  className,
  variant,
  rounded,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof skeletonVariants>) {
  return (
    <div
      data-slot="skeleton"
      className={cn(skeletonVariants({ variant, rounded }), className)}
      {...props}
    />
  )
}

export { Skeleton, skeletonVariants }
