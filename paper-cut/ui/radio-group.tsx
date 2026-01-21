"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const radioGroupItemVariants = cva(
  [
    "relative grid place-items-center aspect-square shrink-0 rounded-full outline-none cursor-pointer",
    "bg-secondary/60 border-2 border-paper-edge shadow-none",
    "transition-all duration-paper ease-paper",
    "hover:bg-secondary",
    "focus-visible:ring-[3px] focus-visible:ring-ring/50",
    "data-[state=checked]:bg-foreground data-[state=checked]:border-foreground",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      size: {
        sm: "size-4",
        default: "size-5",
        lg: "size-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  size,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> &
  VariantProps<typeof radioGroupItemVariants>) {
  const indicatorSizeClasses = {
    sm: "size-1.5",
    default: "size-2",
    lg: "size-2.5",
  } as const

  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        // Flat/Inset style: inner control, no shadow, subtle background
        radioGroupItemVariants({ size }),
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="absolute inset-0 grid place-items-center data-[state=checked]:animate-in data-[state=checked]:zoom-in-50 data-[state=checked]:duration-200"
      >
        <div
          className={cn(
            "rounded-full bg-card transition-transform duration-paper ease-paper",
            indicatorSizeClasses[size ?? "default"]
          )}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
