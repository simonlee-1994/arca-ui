"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const switchVariants = cva(
  [
    // Base styles
    "peer inline-flex h-6 w-11 shrink-0 items-center rounded-full",
    "border border-border/50",
    // Transitions and cursor
    "cursor-pointer transition-all duration-200 ease-out",
    // Focus states
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2",
    // Disabled
    "disabled:cursor-not-allowed disabled:opacity-50",
    // Checked state (shared)
    "data-[state=checked]:bg-primary data-[state=checked]:border-primary/80",
  ],
  {
    variants: {
      variant: {
        default: [
          // Micro-bevel rim + cold shadow tones
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.8),inset_0_1px_2px_rgba(15,23,42,0.06)]",
          "bg-tray",
        ],
        onTray: [
          // For use on tray background - white surface with subtle depth
          "shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]",
          "bg-background",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface SwitchProps
  extends React.ComponentProps<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {}

function Switch({
  className,
  variant,
  ...props
}: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(switchVariants({ variant }), className)}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          // Thumb capsule with white background
          "pointer-events-none block size-5 rounded-full",
          "bg-background border border-border/60",
          // Cold shadow for capsule elevation
          "shadow-[0_1px_3px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.85)]",
          // Smooth transition
          "transition-transform duration-200 ease-out",
          "data-[state=unchecked]:translate-x-0.5",
          "data-[state=checked]:translate-x-[1.375rem]"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch, switchVariants }
