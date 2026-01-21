import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  [
    "w-full min-w-0 bg-primary/5 text-foreground transition-all duration-300 ease-out outline-none",
    "placeholder:text-muted-foreground/60",
    "selection:bg-primary selection:text-primary-foreground",
    "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "focus-visible:border-ring/50 focus-visible:ring-2 focus-visible:ring-ring/20",
    "hover:border-border hover:bg-accent/10",
    "aria-invalid:border-destructive/70 aria-invalid:ring-2 aria-invalid:ring-destructive/20",
  ],
  {
    variants: {
      variant: {
        default: "border border-border/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]",
        filled: "border-0 bg-secondary/40 hover:bg-secondary/50 focus-visible:bg-secondary/30",
        ghost: "border-0 bg-transparent hover:bg-accent/20 focus-visible:bg-accent/15 shadow-none",
      },
      size: {
        sm: "h-8 px-3 py-1.5 text-sm rounded-lg",
        default: "h-9 px-4 py-2 text-sm rounded-xl",
        lg: "h-10 px-5 py-2.5 text-[15px] rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Input({
  className,
  type,
  variant,
  size,
  ...props
}: Omit<React.ComponentProps<"input">, "size"> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Input, inputVariants }
