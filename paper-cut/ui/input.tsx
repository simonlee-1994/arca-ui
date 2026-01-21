import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  [
    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
    "flex w-full min-w-0 border border-paper-edge outline-none",
    "transition-all duration-paper ease-paper",
    "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-secondary/60 shadow-none hover:bg-secondary focus-visible:bg-card",
        elevated:
          "bg-card shadow-paper-sm hover:shadow-paper-md hover:-translate-x-[var(--paper-lift-sm)] hover:-translate-y-[var(--paper-lift-sm)] focus-visible:shadow-paper-md focus-visible:-translate-x-[var(--paper-lift-md)] focus-visible:-translate-y-[var(--paper-lift-md)]",
      },
      size: {
        default: "h-9 rounded-[16px] px-3.5 py-1.5 text-sm",
        sm: "h-8 rounded-[14px] px-3 py-1 text-xs",
        lg: "h-11 rounded-[20px] px-4 py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type InputProps = Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>

function Input({ className, type, variant, size, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        inputVariants({ variant, size }),
        className
      )}
      {...props}
    />
  )
}

export { Input, inputVariants }
