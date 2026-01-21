import * as React from "react"

import { cn } from "@/lib/utils"

type TextareaVariant = "default" | "subtle"

function Textarea({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"textarea"> & { variant?: TextareaVariant }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-[120px] w-full rounded-lg px-4 py-3 text-base transition-colors",
        "placeholder:text-muted-foreground",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "resize-none md:text-sm",
        variant === "default"
          ? "orbit-hover-offset border border-foreground bg-background aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/40"
          : "border border-transparent bg-secondary/50 hover:bg-secondary/70 aria-invalid:border-destructive/60 aria-invalid:focus-visible:ring-destructive/40",
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
