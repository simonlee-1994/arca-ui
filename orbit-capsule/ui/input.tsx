import * as React from "react"

import { cn } from "@/lib/utils"

type InputVariant = "default" | "subtle"

function Input({
  className,
  type,
  variant = "default",
  ...props
}: React.ComponentProps<"input"> & { variant?: InputVariant }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground h-9 w-full min-w-0 rounded-full px-4 py-2 text-sm outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        variant === "default"
          ? "orbit-hover-offset-sm border border-foreground bg-background transition-colors aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/40"
          : "border border-transparent bg-secondary/50 hover:bg-secondary/70 transition-colors aria-invalid:border-destructive/60 aria-invalid:focus-visible:ring-destructive/40",
        "focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        className
      )}
      {...props}
    />
  )
}

export { Input }
