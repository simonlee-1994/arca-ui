import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
  [
    "flex field-sizing-content w-full border border-paper-edge outline-none",
    "placeholder:text-muted-foreground",
    "transition-all duration-paper ease-paper",
    "focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
    "md:text-sm",
  ],
  {
    variants: {
      variant: {
        inset: "bg-secondary/60 shadow-none hover:bg-secondary focus-visible:bg-card",
        default:
          "bg-card shadow-paper-sm hover:shadow-paper-md hover:-translate-x-[var(--paper-lift-sm)] hover:-translate-y-[var(--paper-lift-sm)] focus-visible:shadow-paper-md focus-visible:-translate-x-[var(--paper-lift-md)] focus-visible:-translate-y-[var(--paper-lift-md)]",
        elevated:
          "bg-card shadow-paper-md hover:shadow-paper-lg hover:-translate-x-[var(--paper-lift-sm)] hover:-translate-y-[var(--paper-lift-sm)] focus-visible:shadow-paper-lg focus-visible:-translate-x-[var(--paper-lift-md)] focus-visible:-translate-y-[var(--paper-lift-md)]",
      },
      size: {
        default: "min-h-20 rounded-[20px] px-4 py-3 text-sm",
        sm: "min-h-16 rounded-[18px] px-3.5 py-2.5 text-xs",
        lg: "min-h-28 rounded-[24px] px-5 py-4 text-sm",
      },
    },
    defaultVariants: {
      variant: "inset",
      size: "default",
    },
  }
)

interface TextareaProps extends React.ComponentProps<"textarea"> {
  resize?: "none" | "vertical" | "horizontal" | "both"
  variant?: VariantProps<typeof textareaVariants>["variant"]
  size?: VariantProps<typeof textareaVariants>["size"]
}

function Textarea({
  className,
  resize = "vertical",
  variant,
  size,
  ...props
}: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        textareaVariants({ variant, size }),
        resize === "none" && "resize-none",
        resize === "vertical" && "resize-y",
        resize === "horizontal" && "resize-x",
        resize === "both" && "resize",
        className
      )}
      {...props}
    />
  )
}

export { Textarea, textareaVariants }
