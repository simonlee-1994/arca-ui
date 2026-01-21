import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
  [
    "flex field-sizing-content w-full rounded-2xl border border-border/80 bg-primary/5",
    "shadow-[inset_0_1px_3px_rgba(0,0,0,0.04)]",
    "placeholder:text-muted-foreground/60",
    "transition-all duration-300 ease-out",
    "hover:border-border hover:bg-accent/10",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20 focus-visible:border-ring/50",
    "aria-invalid:ring-2 aria-invalid:ring-destructive/20 aria-invalid:border-destructive/70",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-background",
    "resize-none",
  ],
  {
    variants: {
      size: {
        sm: "min-h-20 px-3 py-2.5 text-sm",
        default: "min-h-24 px-4 py-3 text-sm",
        lg: "min-h-32 px-5 py-4 text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

interface TextareaProps
  extends Omit<React.ComponentProps<"textarea">, "size">,
    VariantProps<typeof textareaVariants> {}

function Textarea({ className, size, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ size, className }))}
      {...props}
    />
  )
}

export { Textarea, textareaVariants }
