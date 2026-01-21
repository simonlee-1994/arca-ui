import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground w-full min-w-0 bg-capsule text-sm transition-all duration-200 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "h-8 rounded-xl border border-border/60 px-3 py-1.5 shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)] hover:border-border/80 hover:bg-secondary/30 focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20 aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        capsule:
          "h-8 rounded-full border border-border/60 px-4 py-1.5 shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)] hover:border-border/80 hover:bg-secondary/30 focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20 aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        tray:
          "h-10 rounded-xl border border-border/40 bg-tray px-3.5 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_8px_rgba(15,23,42,0.06)] hover:border-border/60 focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/25 aria-invalid:border-destructive/40 aria-invalid:ring-destructive/20",
        ghost:
          "h-8 rounded-xl border border-transparent bg-transparent px-3 py-1.5 hover:bg-tray/60 focus-visible:bg-tray focus-visible:border-border/60 focus-visible:ring-2 focus-visible:ring-primary/20 aria-invalid:border-destructive/40",
        underline:
          "h-8 rounded-none border-0 border-b-2 border-border/60 bg-transparent px-1 py-1.5 focus-visible:border-primary aria-invalid:border-destructive",
      },
      inputSize: {
        sm: "h-7 text-xs px-2.5",
        default: "",
        lg: "h-10 px-4",
        xl: "h-12 text-base px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
)

interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {}

function Input({
  className,
  type,
  variant = "default",
  inputSize = "default",
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      data-variant={variant}
      className={cn(inputVariants({ variant, inputSize }), className)}
      {...props}
    />
  )
}

export { Input, inputVariants }
