"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const separatorVariants = cva(
  "shrink-0 transition-all duration-paper ease-paper",
  {
    variants: {
      variant: {
        solid: "bg-paper-edge",
        subtle: "bg-border/60",
        dashed: "bg-transparent border-none",
        dotted: "bg-transparent border-none",
        gradient: "bg-gradient-to-r from-transparent via-paper-edge to-transparent border-none",
      },
      size: {
        sm: "",
        default: "",
        lg: "",
      },
    },
    compoundVariants: [
      // Horizontal solid sizes
      { variant: "solid", size: "sm", className: "data-[orientation=horizontal]:h-px" },
      { variant: "solid", size: "default", className: "data-[orientation=horizontal]:h-[2px]" },
      { variant: "solid", size: "lg", className: "data-[orientation=horizontal]:h-1" },
      { variant: "subtle", size: "sm", className: "data-[orientation=horizontal]:h-px" },
      { variant: "subtle", size: "default", className: "data-[orientation=horizontal]:h-[2px]" },
      { variant: "subtle", size: "lg", className: "data-[orientation=horizontal]:h-1" },
      // Vertical solid sizes
      { variant: "solid", size: "sm", className: "data-[orientation=vertical]:w-px" },
      { variant: "solid", size: "default", className: "data-[orientation=vertical]:w-[2px]" },
      { variant: "solid", size: "lg", className: "data-[orientation=vertical]:w-1" },
      { variant: "subtle", size: "sm", className: "data-[orientation=vertical]:w-px" },
      { variant: "subtle", size: "default", className: "data-[orientation=vertical]:w-[2px]" },
      { variant: "subtle", size: "lg", className: "data-[orientation=vertical]:w-1" },
      // Dashed
      { variant: "dashed", size: "sm", className: "data-[orientation=horizontal]:border-t data-[orientation=horizontal]:border-dashed data-[orientation=horizontal]:border-paper-edge" },
      { variant: "dashed", size: "default", className: "data-[orientation=horizontal]:border-t-2 data-[orientation=horizontal]:border-dashed data-[orientation=horizontal]:border-paper-edge" },
      { variant: "dashed", size: "lg", className: "data-[orientation=horizontal]:border-t-4 data-[orientation=horizontal]:border-dashed data-[orientation=horizontal]:border-paper-edge" },
      { variant: "dashed", size: "sm", className: "data-[orientation=vertical]:border-l data-[orientation=vertical]:border-dashed data-[orientation=vertical]:border-paper-edge" },
      { variant: "dashed", size: "default", className: "data-[orientation=vertical]:border-l-2 data-[orientation=vertical]:border-dashed data-[orientation=vertical]:border-paper-edge" },
      { variant: "dashed", size: "lg", className: "data-[orientation=vertical]:border-l-4 data-[orientation=vertical]:border-dashed data-[orientation=vertical]:border-paper-edge" },
      // Dotted
      { variant: "dotted", size: "sm", className: "data-[orientation=horizontal]:border-t data-[orientation=horizontal]:border-dotted data-[orientation=horizontal]:border-paper-edge" },
      { variant: "dotted", size: "default", className: "data-[orientation=horizontal]:border-t-2 data-[orientation=horizontal]:border-dotted data-[orientation=horizontal]:border-paper-edge" },
      { variant: "dotted", size: "lg", className: "data-[orientation=horizontal]:border-t-4 data-[orientation=horizontal]:border-dotted data-[orientation=horizontal]:border-paper-edge" },
      { variant: "dotted", size: "sm", className: "data-[orientation=vertical]:border-l data-[orientation=vertical]:border-dotted data-[orientation=vertical]:border-paper-edge" },
      { variant: "dotted", size: "default", className: "data-[orientation=vertical]:border-l-2 data-[orientation=vertical]:border-dotted data-[orientation=vertical]:border-paper-edge" },
      { variant: "dotted", size: "lg", className: "data-[orientation=vertical]:border-l-4 data-[orientation=vertical]:border-dotted data-[orientation=vertical]:border-paper-edge" },
      // Gradient sizes
      { variant: "gradient", size: "sm", className: "data-[orientation=horizontal]:h-px" },
      { variant: "gradient", size: "default", className: "data-[orientation=horizontal]:h-[2px]" },
      { variant: "gradient", size: "lg", className: "data-[orientation=horizontal]:h-1" },
      { variant: "gradient", size: "sm", className: "data-[orientation=vertical]:w-px data-[orientation=vertical]:bg-gradient-to-b" },
      { variant: "gradient", size: "default", className: "data-[orientation=vertical]:w-[2px] data-[orientation=vertical]:bg-gradient-to-b" },
      { variant: "gradient", size: "lg", className: "data-[orientation=vertical]:w-1 data-[orientation=vertical]:bg-gradient-to-b" },
    ],
    defaultVariants: {
      variant: "solid",
      size: "default",
    },
  }
)

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> &
  VariantProps<typeof separatorVariants>) {
  const resolvedVariant = variant ?? "solid"
  const resolvedSize = size ?? "default"

  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      data-variant={resolvedVariant}
      data-size={resolvedSize}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        separatorVariants({ variant: resolvedVariant, size: resolvedSize }),
        "data-[orientation=horizontal]:w-full",
        "data-[orientation=vertical]:h-full",
        className
      )}
      {...props}
    />
  )
}

export { Separator, separatorVariants }
