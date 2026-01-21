import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "radius-surface-nested relative w-full border p-4 text-sm flex gap-3 [&>svg]:shrink-0 [&>svg]:size-4 [&>svg]:mt-0.5 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-card text-foreground border-border",
        destructive:
          "border-destructive/30 bg-destructive/5 text-destructive [&>svg]:text-destructive",
      },
      size: {
        default: "",
        compact: "py-2.5 px-3 [&>svg]:mt-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Alert({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant, size }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"h5">) {
  return (
    <h5
      data-slot="alert-title"
      className={cn("mb-1 text-sm font-semibold leading-none tracking-tight", className)}
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
      className={cn("text-sm text-muted-foreground leading-relaxed [&_p]:leading-relaxed", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
