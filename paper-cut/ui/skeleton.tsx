"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const skeletonVariants = cva(
  "rounded-[16px] border border-paper-edge/30 bg-secondary/40",
  {
    variants: {
      variant: {
        default: "",
        pulse: "",
        wave: "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-[150%] before:bg-gradient-to-r before:from-transparent before:via-card/70 before:to-transparent",
        shimmer: "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-[150%] before:bg-gradient-to-r before:from-transparent before:via-card/90 before:to-transparent",
      },
      speed: {
        slow: "",
        default: "",
        fast: "",
      },
    },
    compoundVariants: [
      { variant: "default", speed: "slow", className: "animate-[pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite]" },
      { variant: "default", speed: "default", className: "animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" },
      { variant: "default", speed: "fast", className: "animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_infinite]" },
      { variant: "pulse", speed: "slow", className: "animate-[pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite]" },
      { variant: "pulse", speed: "default", className: "animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" },
      { variant: "pulse", speed: "fast", className: "animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_infinite]" },
      { variant: "wave", speed: "slow", className: "before:animate-[skeleton-wave_2.5s_linear_infinite]" },
      { variant: "wave", speed: "default", className: "before:animate-[skeleton-wave_1.5s_linear_infinite]" },
      { variant: "wave", speed: "fast", className: "before:animate-[skeleton-wave_0.8s_linear_infinite]" },
      { variant: "shimmer", speed: "slow", className: "before:animate-[skeleton-shimmer_3s_linear_infinite]" },
      { variant: "shimmer", speed: "default", className: "before:animate-[skeleton-shimmer_2s_linear_infinite]" },
      { variant: "shimmer", speed: "fast", className: "before:animate-[skeleton-shimmer_1s_linear_infinite]" },
    ],
    defaultVariants: {
      variant: "default",
      speed: "default",
    },
  }
)

function Skeleton({
  className,
  variant,
  speed,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof skeletonVariants>) {
  return (
    <div
      data-slot="skeleton"
      className={cn(skeletonVariants({ variant, speed }), className)}
      {...props}
    />
  )
}

export { Skeleton, skeletonVariants }
