import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  [
    "relative w-full rounded-2xl px-5 py-4 text-sm",
    "grid has-[>svg]:grid-cols-[calc(var(--spacing)*5)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-4 gap-y-1 items-start",
    "[&>svg]:size-5 [&>svg]:translate-y-0.5 [&>svg]:text-current",
    "transition-all duration-200",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-tray border border-border/50",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_6px_rgba(15,23,42,0.04)]",
          "text-tray-foreground",
        ],
        info: [
          "bg-[#F0F7FF] border border-[#BFDBFE]/60",
          "shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)]",
          "text-[#1E40AF]",
          "[&>svg]:text-primary",
        ],
        success: [
          "bg-[#F0FDF4] border border-[#BBF7D0]/60",
          "shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)]",
          "text-[#166534]",
          "[&>svg]:text-[#16A34A]",
        ],
        warning: [
          "bg-[#FFFBEB] border border-[#FDE68A]/60",
          "shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)]",
          "text-[#92400E]",
          "[&>svg]:text-[#D97706]",
        ],
        destructive: [
          "bg-[#FEF2F2] border border-[#FECACA]/60",
          "shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)]",
          "text-[#991B1B]",
          "[&>svg]:text-destructive",
        ],
        tray: [
          "bg-tray rounded-3xl border border-border/40",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_8px_rgba(15,23,42,0.06)]",
          "text-tray-foreground",
          "[&>svg]:text-primary",
        ],
        capsule: [
          "bg-capsule rounded-2xl border border-border/60",
          "shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]",
          "text-capsule-foreground",
        ],
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
        "col-start-2 line-clamp-1 min-h-5 font-semibold tracking-tight text-base",
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
        "text-current/80 col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, alertVariants }
