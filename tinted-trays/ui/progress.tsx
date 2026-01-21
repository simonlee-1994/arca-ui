"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const progressIndicatorVariants = cva(
  [
    "h-full w-full flex-1",
    "rounded-full",
    "transition-transform duration-300 ease-out",
  ],
  {
    variants: {
      color: {
        default: [
          "bg-chart-3",
          "shadow-[0_1px_2px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.2)]",
        ],
        primary: [
          "bg-primary",
          "shadow-[0_1px_2px_rgba(15,23,42,0.10),inset_0_1px_0_rgba(255,255,255,0.3)]",
        ],
        soft: [
          "bg-chart-4",
          "shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.25)]",
        ],
        muted: [
          "bg-muted-foreground/40",
          "shadow-[0_1px_2px_rgba(15,23,42,0.05)]",
        ],
        success: [
          "bg-emerald-500",
          "shadow-[0_1px_2px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.2)]",
        ],
        warning: [
          "bg-amber-500",
          "shadow-[0_1px_2px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.2)]",
        ],
      },
    },
    defaultVariants: {
      color: "default",
    },
  }
)

function Progress({
  className,
  value,
  color,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> &
  VariantProps<typeof progressIndicatorVariants>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-3 w-full overflow-hidden",
        // Tray style - recessed track with inset shadow
        "bg-tray rounded-full",
        "border border-border/40",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_6px_rgba(15,23,42,0.06)]",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(progressIndicatorVariants({ color }))}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

function ProgressTray({
  className,
  value,
  label,
  showValue = true,
  color = "primary",
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> &
  VariantProps<typeof progressIndicatorVariants> & {
    label?: string
    showValue?: boolean
  }) {
  return (
    <div
      className={cn(
        // Tray container
        "rounded-2xl bg-tray p-4",
        "border border-border/40",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_8px_rgba(15,23,42,0.06)]",
        className
      )}
    >
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-3">
          {label && (
            <span className="text-sm font-medium text-foreground">{label}</span>
          )}
          {showValue && (
            <span className="text-sm font-semibold text-primary">
              {value || 0}%
            </span>
          )}
        </div>
      )}
      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(
          "relative h-2.5 w-full overflow-hidden",
          // Capsule style track inside tray
          "bg-capsule rounded-full",
          "border border-border/60",
          "shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]"
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(progressIndicatorVariants({ color }))}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  )
}

export { Progress, ProgressTray, progressIndicatorVariants }
