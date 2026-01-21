"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Hover Card Shadow Offset System:
 * - compact: Small shadow offset (3px) - DEFAULT, for dense UIs
 * - spacious: Large shadow offset (6px) - for hero moments
 */
const hoverCardContentVariants = cva(
  "bg-card text-foreground z-50 w-72 origin-(--radix-hover-card-content-transform-origin) rounded-[24px] border border-paper-edge p-5 outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      offset: {
        compact: "shadow-paper-sm",
        spacious: "shadow-paper-md",
      },
    },
    defaultVariants: {
      offset: "compact",
    },
  }
)

function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
}

function HoverCardTrigger({
  className,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger
      data-slot="hover-card-trigger"
      className={cn("cursor-pointer", className)}
      {...props}
    />
  )
}

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 8,
  offset,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content> &
  VariantProps<typeof hoverCardContentVariants>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        data-offset={offset ?? "compact"}
        align={align}
        sideOffset={sideOffset}
        className={cn(hoverCardContentVariants({ offset }), className)}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent, hoverCardContentVariants }
