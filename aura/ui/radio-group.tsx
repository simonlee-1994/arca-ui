"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

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

const radioGroupItemVariants = cva(
  cn(
    "relative grid place-items-center aspect-square shrink-0 rounded-full border-2 border-border bg-primary/5 p-0 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] transition-all duration-300 ease-out outline-none",
    "hover:border-primary/50 hover:bg-accent/30",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "data-[state=checked]:border-primary data-[state=checked]:bg-primary/10",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20"
  ),
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

const indicatorVariants = cva("block rounded-full bg-primary", {
  variants: {
    size: {
      sm: "size-2",
      default: "size-2.5",
      lg: "size-3",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

interface RadioGroupItemProps
  extends React.ComponentProps<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioGroupItemVariants> {}

function RadioGroupItem({
  className,
  size,
  ...props
}: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(radioGroupItemVariants({ size }), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="absolute inset-0 grid place-items-center"
      >
        <motion.span
          className={indicatorVariants({ size })}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

// Animated Radio with spring effect
function RadioGroupItemAnimated({
  className,
  size,
  ...props
}: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item-animated"
      className={cn(radioGroupItemVariants({ size }), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="absolute inset-0 grid place-items-center"
      >
        <motion.span
          className={indicatorVariants({ size })}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

// Radio with filled background when selected
const radioFilledVariants = cva(
  cn(
    "relative grid place-items-center aspect-square shrink-0 rounded-full border-2 border-border bg-primary/5 p-0 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] transition-all duration-300 ease-out outline-none",
    "hover:border-primary/50 hover:bg-accent/30",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
    "disabled:cursor-not-allowed disabled:opacity-50"
  ),
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

function RadioGroupItemFilled({
  className,
  size,
  ...props
}: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item-filled"
      className={cn(radioFilledVariants({ size }), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="absolute inset-0 grid place-items-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <Check className={cn(
            "text-primary-foreground",
            size === "sm" ? "size-2.5" : size === "lg" ? "size-4" : "size-3"
          )} strokeWidth={3} />
        </motion.div>
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

// Radio with ring indicator (no inner dot)
const radioRingVariants = cva(
  cn(
    "relative grid place-items-center aspect-square shrink-0 rounded-full border-2 border-border bg-primary/5 p-0 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] outline-none",
    "transition-colors duration-200 ease-out",
    "hover:border-primary/50 hover:bg-accent/30",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "data-[state=checked]:border-primary data-[state=checked]:bg-primary/10 data-[state=checked]:ring-2 data-[state=checked]:ring-primary/20",
    "disabled:cursor-not-allowed disabled:opacity-50"
  ),
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

function RadioGroupItemRing({
  className,
  size,
  ...props
}: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item-ring"
      className={cn(radioRingVariants({ size }), className)}
      {...props}
    />
  )
}

// Card-style radio item
function RadioGroupCard({
  className,
  children,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> & {
  children: React.ReactNode
}) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-card"
      className={cn(
        "relative flex cursor-pointer items-start gap-4 rounded-2xl border-2 border-border/60 bg-card p-4 transition-all duration-300",
        "hover:border-primary/30 hover:bg-accent/20",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary/5 data-[state=checked]:shadow-[var(--aura-shadow-card)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <div className="relative grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-border bg-background shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] transition-all duration-300 data-[state=checked]:border-primary data-[state=checked]:bg-primary/10">
        <RadioGroupPrimitive.Indicator className="absolute inset-0 grid place-items-center">
          <motion.div
            className="size-2.5 rounded-full bg-primary"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </RadioGroupPrimitive.Indicator>
      </div>
      <div className="flex-1">{children}</div>
    </RadioGroupPrimitive.Item>
  )
}

// Button-style radio (toggle buttons)
function RadioGroupButton({
  className,
  children,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> & {
  children: React.ReactNode
}) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-button"
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300",
        "border-2 border-border bg-background shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]",
        "hover:border-primary/30 hover:bg-accent/30",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Item>
  )
}

export {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemAnimated,
  RadioGroupItemFilled,
  RadioGroupItemRing,
  RadioGroupCard,
  RadioGroupButton,
}
