"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  [
    // Base styles with Tinted Trays typography
    "flex items-center gap-2 leading-none font-medium select-none",
    // Dark slate text color for readability
    "text-foreground",
    // Disabled states
    "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
    "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  ],
  {
    variants: {
      size: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
      },
      showRequired: {
        true: "after:content-['•'] after:ml-0.5 after:text-destructive after:text-[0.9em] after:leading-none",
        false: "",
        auto: "has-[[data-required]]:after:content-['•'] has-[[data-required]]:after:ml-0.5 has-[[data-required]]:after:text-destructive has-[[data-required]]:after:text-[0.9em] has-[[data-required]]:after:leading-none",
      },
    },
    defaultVariants: {
      size: "default",
      showRequired: "auto",
    },
  }
)

function Label({
  className,
  size = "default",
  showRequired = "auto",
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      data-size={size}
      className={cn(labelVariants({ size, showRequired, className }))}
      {...props}
    />
  )
}

export { Label }
