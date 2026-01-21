"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 200,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

const tooltipContentVariants = cva(
  [
    "z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-xl px-3.5 py-2 text-sm text-balance",
    "backdrop-blur-sm shadow-[var(--aura-shadow-card)]",
    "animate-in fade-in-0 zoom-in-95",
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
    "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  ],
  {
    variants: {
      variant: {
        default: "bg-foreground/90 text-background border border-foreground/10",
        light: "bg-card text-foreground border border-border/60",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const tooltipArrowVariants = cva(
  "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-sm",
  {
    variants: {
      variant: {
        default: "fill-foreground/90",
        light: "fill-card",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TooltipContent({
  className,
  sideOffset = 8,
  variant,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> &
  VariantProps<typeof tooltipContentVariants>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(tooltipContentVariants({ variant, className }))}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow
          className={cn(tooltipArrowVariants({ variant }))}
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, tooltipContentVariants }
