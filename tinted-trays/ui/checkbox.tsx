"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { cva, type VariantProps } from "class-variance-authority"
import { CheckIcon, MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const checkboxVariants = cva(
  [
    "peer relative shrink-0 rounded-md border",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
    "data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground",
    "data-[state=checked]:shadow-[0_6px_16px_rgba(37,99,235,0.18),inset_0_1px_0_rgba(255,255,255,0.25)]",
    "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-primary-foreground",
    "data-[state=indeterminate]:shadow-[0_6px_16px_rgba(37,99,235,0.18),inset_0_1px_0_rgba(255,255,255,0.25)]",
  ],
  {
    variants: {
      surface: {
        tray: [
          "bg-tray border-border/60",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_1px_3px_rgba(15,23,42,0.06)]",
          "hover:border-primary/50 hover:bg-background/50",
        ],
        background: [
          "bg-background border-border/60",
          "shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]",
          "hover:border-primary/50 hover:shadow-[0_2px_6px_rgba(15,23,42,0.10),inset_0_1px_0_rgba(255,255,255,0.9)]",
        ],
      },
      size: {
        default: "size-5",
        sm: "size-4",
        lg: "size-6",
      },
      indicator: {
        check: "",
        dot: "",
        minus: "",
      },
    },
    defaultVariants: {
      surface: "tray",
      size: "default",
      indicator: "check",
    },
  }
)

export interface CheckboxProps
  extends React.ComponentProps<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {}

function Checkbox({
  className,
  surface,
  size,
  indicator,
  ...props
}: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        checkboxVariants({ surface, size, indicator }),
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="absolute inset-0 flex items-center justify-center text-current"
      >
        {indicator === "dot" ? (
          <span className={cn(
            "rounded-full bg-current",
            size === "sm" ? "size-1.5" : size === "lg" ? "size-2.5" : "size-2"
          )} />
        ) : indicator === "minus" ? (
          <MinusIcon className={cn(
            "stroke-[3]",
            size === "sm" ? "size-2.5" : size === "lg" ? "size-4" : "size-3"
          )} />
        ) : (
          <CheckIcon className={cn(
            "stroke-[3]",
            size === "sm" ? "size-2.5" : size === "lg" ? "size-4" : "size-3"
          )} />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
