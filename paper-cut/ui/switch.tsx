"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border border-paper-edge bg-secondary/60 shadow-none outline-none transition-colors duration-paper ease-paper focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring hover:bg-secondary data-[state=checked]:bg-foreground data-[state=checked]:border-foreground data-[state=checked]:hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        default: "h-7 w-12",
        lg: "h-8 w-14",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const thumbVariants = cva(
  "pointer-events-none block rounded-full border border-paper-edge bg-card shadow-none ring-0 transition-transform duration-paper ease-paper data-[state=checked]:bg-card data-[state=checked]:border-paper-edge",
  {
    variants: {
      size: {
        sm: "size-3.5 data-[state=checked]:translate-x-[calc(100%+2px)] data-[state=unchecked]:translate-x-0.5",
        default: "size-5 data-[state=checked]:translate-x-[calc(100%+2px)] data-[state=unchecked]:translate-x-0.5",
        lg: "size-6 data-[state=checked]:translate-x-[calc(100%+2px)] data-[state=unchecked]:translate-x-0.5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

interface SwitchProps
  extends React.ComponentProps<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {}

function Switch({ className, size, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(switchVariants({ size }), className)}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(thumbVariants({ size }))}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
