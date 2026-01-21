"use client"

import * as React from "react"
import { GripVerticalIcon, Grip } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className
      )}
      {...props}
    />
  )
}

function ResizablePanel({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Panel>) {
  return (
    <ResizablePrimitive.Panel
      data-slot="resizable-panel"
      className={cn("rounded-xl", className)}
      {...props}
    />
  )
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle"
      className={cn(
        "relative flex w-1 items-center justify-center transition-colors duration-300",
        withHandle ? "bg-transparent" : "bg-border/40 hover:bg-primary/20",
        "after:absolute after:inset-y-0 after:left-1/2 after:w-2 after:-translate-x-1/2",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=vertical]:w-full",
        "data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-2 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2",
        "[&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-5 w-4 items-center justify-center rounded-xl border border-border/60 bg-background shadow-sm transition-all duration-300 hover:bg-accent/60 hover:shadow-md">
          <GripVerticalIcon className="size-3 text-muted-foreground" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  )
}

// Custom handle with pill style
function ResizableHandlePill({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle>) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle-pill"
      className={cn(
        "relative flex w-2 items-center justify-center transition-colors duration-300",
        "after:absolute after:inset-y-0 after:left-1/2 after:w-4 after:-translate-x-1/2",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "data-[panel-group-direction=vertical]:h-2 data-[panel-group-direction=vertical]:w-full",
        "data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-4 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2",
        "[&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      )}
      {...props}
    >
      <div className="z-10 h-8 w-1.5 rounded-full bg-border/60 transition-all duration-300 hover:bg-primary/50 hover:h-12" />
    </ResizablePrimitive.PanelResizeHandle>
  )
}

// Custom handle with dots
function ResizableHandleDots({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle>) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle-dots"
      className={cn(
        "bg-transparent relative flex w-3 items-center justify-center transition-colors duration-300",
        "after:absolute after:inset-y-0 after:left-1/2 after:w-4 after:-translate-x-1/2",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "data-[panel-group-direction=vertical]:h-3 data-[panel-group-direction=vertical]:w-full",
        "data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-4 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2",
        "[&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      )}
      {...props}
    >
      <div className="z-10 flex flex-col gap-1 items-center justify-center p-1 rounded-lg transition-all duration-300 hover:bg-accent/60">
        <div className="size-1 rounded-full bg-border" />
        <div className="size-1 rounded-full bg-border" />
        <div className="size-1 rounded-full bg-border" />
      </div>
    </ResizablePrimitive.PanelResizeHandle>
  )
}

// Rounded handle with icon
function ResizableHandleRounded({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle>) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle-rounded"
      className={cn(
        "relative flex w-4 items-center justify-center transition-colors duration-300",
        "after:absolute after:inset-y-0 after:left-1/2 after:w-6 after:-translate-x-1/2",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "data-[panel-group-direction=vertical]:h-4 data-[panel-group-direction=vertical]:w-full",
        "data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-6 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2",
        "[&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      )}
      {...props}
    >
      <div className="z-10 flex size-6 items-center justify-center rounded-full bg-background border-2 border-border/60 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:scale-110">
        <Grip className="size-3 text-muted-foreground" />
      </div>
    </ResizablePrimitive.PanelResizeHandle>
  )
}

export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  ResizableHandlePill,
  ResizableHandleDots,
  ResizableHandleRounded,
}
