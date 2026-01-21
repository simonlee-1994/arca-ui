import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Alert Elevation Levels (3 Levels):
 * - elevated: Strong shadow (standalone announcements, hero moments)
 * - default:  Medium shadow (general notifications)
 * - outlined: Border only, no shadow (dense layouts)
 */
const alertVariants = cva(
  "relative w-full rounded-[24px] border border-paper-edge bg-card px-6 py-4 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*5)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-4 gap-y-1 items-start [&>svg]:size-5 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-foreground",
        destructive:
          "border-destructive/30 bg-destructive/5 text-destructive [&>svg]:text-destructive *:data-[slot=alert-description]:text-destructive/80",
        success:
          "border-green-500/30 bg-green-500/5 text-green-700 dark:text-green-400 [&>svg]:text-green-600 dark:[&>svg]:text-green-400 *:data-[slot=alert-description]:text-green-600/80 dark:*:data-[slot=alert-description]:text-green-400/80",
        warning:
          "border-amber-500/30 bg-amber-500/5 text-amber-700 dark:text-amber-400 [&>svg]:text-amber-600 dark:[&>svg]:text-amber-400 *:data-[slot=alert-description]:text-amber-600/80 dark:*:data-[slot=alert-description]:text-amber-400/80",
        info:
          "border-blue-500/30 bg-blue-500/5 text-blue-700 dark:text-blue-400 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400 *:data-[slot=alert-description]:text-blue-600/80 dark:*:data-[slot=alert-description]:text-blue-400/80",
        // Soft variants - more gentle on the eyes with muted backgrounds
        "soft-destructive":
          "border-paper-edge bg-red-50 dark:bg-red-950/30 text-foreground [&>svg]:text-red-500 *:data-[slot=alert-title]:text-red-700 dark:*:data-[slot=alert-title]:text-red-400",
        "soft-success":
          "border-paper-edge bg-emerald-50 dark:bg-emerald-950/30 text-foreground [&>svg]:text-emerald-500 *:data-[slot=alert-title]:text-emerald-700 dark:*:data-[slot=alert-title]:text-emerald-400",
        "soft-warning":
          "border-paper-edge bg-amber-50 dark:bg-amber-950/30 text-foreground [&>svg]:text-amber-500 *:data-[slot=alert-title]:text-amber-700 dark:*:data-[slot=alert-title]:text-amber-400",
        "soft-info":
          "border-paper-edge bg-sky-50 dark:bg-sky-950/30 text-foreground [&>svg]:text-sky-500 *:data-[slot=alert-title]:text-sky-700 dark:*:data-[slot=alert-title]:text-sky-400",
      },
      elevation: {
        elevated:
          "shadow-paper-md transition-all duration-[var(--paper-duration)] ease-[var(--paper-ease)]",
        default:
          "shadow-paper-sm transition-shadow duration-[var(--paper-duration)] ease-[var(--paper-ease)]",
        outlined: "shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
      elevation: "default",
    },
  }
)

function Alert({
  className,
  variant,
  elevation,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant, elevation }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-5 font-semibold tracking-tight",
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
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
