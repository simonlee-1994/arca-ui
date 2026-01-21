"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

const popoverContentVariants = cva(
  [
    "z-50 w-72 origin-(--radix-popover-content-transform-origin) outline-hidden",
    "bg-card text-foreground",
    "border border-paper-edge rounded-[24px]",
    "p-6",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
    "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  ],
  {
    variants: {
      shadow: {
        default: "shadow-paper-sm",
        elevated: "shadow-paper-md",
      },
    },
    defaultVariants: {
      shadow: "default",
    },
  }
)

function PopoverContent({
  className,
  align = "center",
  sideOffset = 8,
  shadow,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content> &
  VariantProps<typeof popoverContentVariants>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          popoverContentVariants({ shadow }),
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

function PopoverArrow({
  className,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Arrow>) {
  return (
    <PopoverPrimitive.Arrow
      data-slot="popover-arrow"
      className={cn(
        "fill-card drop-shadow-[0_-2px_0_var(--paper-edge)]",
        className
      )}
      width={12}
      height={6}
      {...props}
    />
  )
}

function PopoverClose({
  className,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Close>) {
  return (
    <PopoverPrimitive.Close
      data-slot="popover-close"
      className={cn(
        "absolute right-4 top-4",
        "flex items-center justify-center size-7 rounded-full",
        "bg-secondary/60 border border-paper-edge shadow-none",
        "text-muted-foreground",
        "transition-colors duration-paper ease-paper",
        "hover:bg-secondary hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        className
      )}
      {...props}
    >
      <X className="size-4 text-current" />
    </PopoverPrimitive.Close>
  )
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverArrow, PopoverClose }
