"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

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
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "aspect-square size-5 shrink-0",
        "rounded-full border-2 border-border",
        "bg-background",
        "shadow-[0_1px_2px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.85)]",
        "transition-all duration-200",
        "outline-none",
        "hover:border-primary/60 hover:shadow-[0_2px_6px_rgba(15,23,42,0.10),inset_0_1px_0_rgba(255,255,255,0.9)]",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
        "data-[state=checked]:shadow-[0_6px_16px_rgba(37,99,235,0.22)]",
        // Disabled state
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Invalid state
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex items-center justify-center"
      >
        <CircleIcon className="size-2 fill-primary-foreground text-primary-foreground" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

function RadioGroupCard({
  className,
  children,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> & {
  children?: React.ReactNode
}) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-card"
      className={cn(
        "flex items-start gap-3 p-4",
        "rounded-2xl border border-border/50",
        "bg-tray",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_6px_rgba(15,23,42,0.04)]",
        "transition-all duration-200 cursor-pointer",
        "outline-none",
        // Hover: deeper inset shadow like Card component
        "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_3px_10px_rgba(15,23,42,0.07)]",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
        // Checked: white background with capsule shadow
        "data-[state=checked]:border-primary/60 data-[state=checked]:bg-background",
        "data-[state=checked]:shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.9)]",
        // Disabled state
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "aspect-square size-5 shrink-0 mt-0.5",
          "rounded-full border-2 border-border",
          "bg-background",
          "shadow-[0_1px_2px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.85)]",
          "transition-all duration-200",
          "[[data-state=checked]>&]:border-primary [[data-state=checked]>&]:bg-primary",
          "[[data-state=checked]>&]:shadow-[0_6px_16px_rgba(37,99,235,0.22)]"
        )}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center h-full">
          <CircleIcon className="size-2 fill-primary-foreground text-primary-foreground" />
        </RadioGroupPrimitive.Indicator>
      </div>
      <div className="flex-1 text-left">{children}</div>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem, RadioGroupCard }
