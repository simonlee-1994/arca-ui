import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
  "flex w-full min-h-24 text-base placeholder:text-muted-foreground transition-all duration-200 outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 resize-none md:text-sm",
  {
    variants: {
      variant: {
        // Default: tray color fill (for white background - Mode A)
        default:
          "rounded-xl border border-border/40 bg-tray px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_8px_rgba(15,23,42,0.06)] hover:border-border/60 focus:border-primary/40 focus:ring-2 focus:ring-primary/25 aria-invalid:border-destructive/40 aria-invalid:ring-destructive/20",
        // Capsule: white surface (for tray background - Mode B or embedded in tray)
        capsule:
          "rounded-2xl border border-border/60 bg-capsule px-5 py-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)] hover:border-primary/50 hover:shadow-[0_2px_10px_rgba(15,23,42,0.10),inset_0_1px_0_rgba(255,255,255,0.9)] focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:shadow-[0_2px_10px_rgba(15,23,42,0.10),inset_0_1px_0_rgba(255,255,255,0.9)] aria-invalid:border-destructive aria-invalid:ring-destructive/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface TextareaProps
  extends React.ComponentProps<"textarea">,
    VariantProps<typeof textareaVariants> {}

function Textarea({
  className,
  variant = "default",
  ...props
}: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      data-variant={variant}
      className={cn(textareaVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Textarea, textareaVariants }
