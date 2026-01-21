import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const skeletonVariants = cva(
  "animate-pulse",
  {
    variants: {
      variant: {
        default: "rounded-lg bg-tray shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)]",
        rounded: "rounded-xl bg-tray shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)]",
        circular: "rounded-full bg-tray shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)]",
        tray: "rounded-2xl bg-tray border border-border/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_4px_rgba(15,23,42,0.04)]",
        capsule: "rounded-2xl bg-secondary/80 border border-border/50 shadow-[inset_0_1px_2px_rgba(15,23,42,0.04)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface SkeletonProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof skeletonVariants> {}

function Skeleton({
  className,
  variant = "default",
  ...props
}: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      data-variant={variant}
      className={cn(skeletonVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Skeleton, skeletonVariants }
