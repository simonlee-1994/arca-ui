import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-2xl border px-5 py-4 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-4 gap-y-1 items-start [&>svg]:size-5 [&>svg]:translate-y-0.5 [&>svg]:text-current shadow-[var(--aura-shadow-card)] transition-all duration-300 hover:shadow-[var(--aura-shadow-card-hover)]",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground border-border/60",
        destructive:
          "text-destructive bg-destructive/5 border-destructive/20 [&>svg]:text-destructive *:data-[slot=alert-description]:text-destructive/80",
        success:
          "text-primary bg-primary/5 border-primary/20 [&>svg]:text-primary *:data-[slot=alert-description]:text-primary/80",
        warning:
          "text-amber-700 bg-amber-50 border-amber-200/60 [&>svg]:text-amber-600 *:data-[slot=alert-description]:text-amber-700/80",
        info:
          "text-blue-700 bg-blue-50 border-blue-200/60 [&>svg]:text-blue-600 *:data-[slot=alert-description]:text-blue-700/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-5 font-semibold tracking-tight text-[15px]",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm leading-relaxed [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
