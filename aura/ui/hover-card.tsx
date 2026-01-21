"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/lib/utils"

function HoverCard({
  openDelay = 200,
  closeDelay = 100,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return (
    <HoverCardPrimitive.Root
      data-slot="hover-card"
      openDelay={openDelay}
      closeDelay={closeDelay}
      {...props}
    />
  )
}

function HoverCardTrigger({
  className,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger
      data-slot="hover-card-trigger"
      className={cn(
        "cursor-pointer outline-none transition-all duration-300",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg",
        className
      )}
      {...props}
    />
  )
}

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-72 origin-(--radix-hover-card-content-transform-origin)",
          "bg-card text-card-foreground",
          "rounded-2xl border border-border/60 p-5",
          "shadow-[var(--aura-shadow-float)]",
          "outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-3 data-[side=left]:slide-in-from-right-3",
          "data-[side=right]:slide-in-from-left-3 data-[side=top]:slide-in-from-bottom-3",
          "transition-all duration-300 ease-out",
          className
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  )
}

function HoverCardArrow({
  className,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Arrow>) {
  return (
    <HoverCardPrimitive.Arrow
      data-slot="hover-card-arrow"
      className={cn("fill-card drop-shadow-sm", className)}
      {...props}
    />
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent, HoverCardArrow }
