"use client"

import * as React from "react"
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const aspectRatioVariants = cva(
  "overflow-hidden",
  {
    variants: {
      variant: {
        default: [
          "rounded-2xl bg-tray border border-border/50",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_6px_rgba(15,23,42,0.04)]",
        ],
        capsule: [
          "rounded-2xl bg-capsule border border-border/60",
          "shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]",
        ],
        tray: [
          "rounded-3xl bg-tray border border-border/40",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_8px_rgba(15,23,42,0.06)]",
        ],
        flat: "rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function AspectRatio({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root> &
  VariantProps<typeof aspectRatioVariants>) {
  return (
    <AspectRatioPrimitive.Root
      data-slot="aspect-ratio"
      className={cn(aspectRatioVariants({ variant }), className)}
      {...props}
    />
  )
}

export { AspectRatio, aspectRatioVariants }
