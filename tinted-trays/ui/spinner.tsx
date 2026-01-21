import { Loader2Icon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const spinnerVariants = cva(
  "animate-spin text-primary",
  {
    variants: {
      size: {
        sm: "size-4",
        default: "size-6",
        md: "size-8",
        lg: "size-10",
        xl: "size-12",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

interface SpinnerProps
  extends React.ComponentProps<"svg">,
    VariantProps<typeof spinnerVariants> {}

function Spinner({ className, size, ...props }: SpinnerProps) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    />
  )
}

function SpinnerContainer({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      role="status"
      className={cn(
        "inline-flex items-center justify-center",
        // Tinted Trays: Tray surface with micro-bevel rim
        "rounded-2xl bg-tray border border-border/50",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_6px_rgba(15,23,42,0.04)]",
        "p-3",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Spinner, SpinnerContainer, spinnerVariants }
