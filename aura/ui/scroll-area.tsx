"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative overflow-hidden min-h-0 min-w-0", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="h-full w-full max-h-[inherit] max-w-[inherit] transition-all duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none p-0.5 transition-all duration-300 ease-out select-none",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-primary/25 hover:bg-primary/40 relative flex-1 rounded-full transition-colors duration-300"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

// Always visible scrollbar
function ScrollAreaAlwaysVisible({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area-always-visible"
      className={cn("relative overflow-hidden min-h-0 min-w-0", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="h-full w-full max-h-[inherit] max-w-[inherit]"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBarAlwaysVisible />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBarAlwaysVisible({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar-always-visible"
      orientation={orientation}
      forceMount
      className={cn(
        "flex touch-none p-0.5 select-none",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-primary/25 hover:bg-primary/45 relative flex-1 rounded-full transition-colors duration-300"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

// Scroll area with colored track
function ScrollAreaWithTrack({
  className,
  children,
  trackColor = "bg-accent/40",
  thumbColor = "bg-primary/50",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  trackColor?: string
  thumbColor?: string
}) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area-with-track"
      className={cn("relative overflow-hidden min-h-0 min-w-0", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="h-full w-full max-h-[inherit] max-w-[inherit]"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBarWithTrack trackColor={trackColor} thumbColor={thumbColor} />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBarWithTrack({
  className,
  orientation = "vertical",
  trackColor = "bg-accent/40",
  thumbColor = "bg-primary/50",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> & {
  trackColor?: string
  thumbColor?: string
}) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar-with-track"
      orientation={orientation}
      className={cn(
        "flex touch-none select-none rounded-full",
        trackColor,
        orientation === "vertical" && "h-full w-2 m-1",
        orientation === "horizontal" && "h-2 flex-col m-1",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className={cn(
          "relative flex-1 rounded-full transition-all duration-300 hover:opacity-85",
          thumbColor
        )}
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

// Thin scrollbar
function ScrollAreaThin({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area-thin"
      className={cn("relative overflow-hidden min-h-0 min-w-0", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="h-full w-full max-h-[inherit] max-w-[inherit]"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBarThin />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBarThin({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar-thin"
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-all duration-300 ease-out select-none",
        orientation === "vertical" && "h-full w-1.5",
        orientation === "horizontal" && "h-1.5 flex-col",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-primary/20 hover:bg-primary/35 relative flex-1 rounded-full transition-colors duration-300"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

// Wide scrollbar
function ScrollAreaWide({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area-wide"
      className={cn("relative overflow-hidden min-h-0 min-w-0", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="h-full w-full max-h-[inherit] max-w-[inherit]"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBarWide />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBarWide({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar-wide"
      orientation={orientation}
      className={cn(
        "flex touch-none p-1 transition-all duration-300 ease-out select-none",
        orientation === "vertical" && "h-full w-4",
        orientation === "horizontal" && "h-4 flex-col",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-primary/20 hover:bg-primary/35 relative flex-1 rounded-xl transition-colors duration-300"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

// Scroll area with fast appearance (minimal delay)
function ScrollAreaFast({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area-fast"
      className={cn("relative overflow-hidden min-h-0 min-w-0", className)}
      scrollHideDelay={100}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="h-full w-full max-h-[inherit] max-w-[inherit]"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBarFast />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBarFast({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar-fast"
      orientation={orientation}
      className={cn(
        "flex touch-none p-0.5 transition-opacity duration-200 ease-out select-none",
        "data-[state=visible]:opacity-100 data-[state=hidden]:opacity-0",
        orientation === "vertical" && "h-full w-2.5",
        orientation === "horizontal" && "h-2.5 flex-col",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-primary/35 hover:bg-primary/50 relative flex-1 rounded-full transition-colors duration-200"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export {
  ScrollArea,
  ScrollBar,
  ScrollAreaAlwaysVisible,
  ScrollBarAlwaysVisible,
  ScrollAreaWithTrack,
  ScrollBarWithTrack,
  ScrollAreaThin,
  ScrollBarThin,
  ScrollAreaWide,
  ScrollBarWide,
  ScrollAreaFast,
  ScrollBarFast,
}
