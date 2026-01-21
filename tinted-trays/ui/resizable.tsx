"use client"

import * as React from "react"
import { GripVerticalIcon } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const resizablePanelGroupVariants = cva(
  [
    "flex h-full w-full overflow-hidden",
    "data-[panel-group-direction=vertical]:flex-col",
  ],
  {
    variants: {
      surface: {
        tray: "bg-tray",
        background: "bg-background",
      },
      rim: {
        strong: [
          "rounded-3xl border border-border/40",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_2px_10px_rgba(15,23,42,0.06)]",
        ],
        default: [
          "rounded-2xl border border-border/50",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_6px_rgba(15,23,42,0.04)]",
        ],
        subtle: [
          "rounded-2xl border border-border/60",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_1px_4px_rgba(15,23,42,0.03)]",
        ],
      },
    },
    defaultVariants: {
      surface: "tray",
      rim: "default",
    },
  }
)

function ResizablePanelGroup({
  className,
  surface,
  rim,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup> &
  VariantProps<typeof resizablePanelGroupVariants>) {
  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group"
      className={cn(
        resizablePanelGroupVariants({ surface, rim }),
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
      className={cn("bg-capsule", className)}
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
        "relative flex items-center justify-center",
        "bg-transparent",
        "transition-colors duration-200",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        "focus-visible:outline-hidden",
        "w-px",
        "after:absolute after:inset-y-0 after:left-1/2 after:w-6 after:-translate-x-1/2 after:content-['']",
        "before:absolute before:inset-y-3 before:left-1/2 before:w-px before:-translate-x-1/2 before:bg-border/50 before:content-['']",
        "hover:before:bg-primary/40",
        "data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full",
        "data-[panel-group-direction=vertical]:after:inset-x-0 data-[panel-group-direction=vertical]:after:top-1/2 data-[panel-group-direction=vertical]:after:h-6 data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:-translate-x-0",
        "data-[panel-group-direction=vertical]:before:inset-x-3 data-[panel-group-direction=vertical]:before:inset-y-auto data-[panel-group-direction=vertical]:before:top-1/2 data-[panel-group-direction=vertical]:before:h-px data-[panel-group-direction=vertical]:before:w-auto data-[panel-group-direction=vertical]:before:-translate-y-1/2 data-[panel-group-direction=vertical]:before:-translate-x-0",
        "[&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div
          className={cn(
            "z-10 flex items-center justify-center",
            "h-6 w-4 rounded-lg",
            "bg-capsule border border-border/60",
            "shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]",
            "transition-all duration-200",
            "hover:border-primary/50 hover:shadow-[0_2px_10px_rgba(15,23,42,0.10),inset_0_1px_0_rgba(255,255,255,0.9)]"
          )}
        >
          <GripVerticalIcon className="size-3 text-muted-foreground" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
