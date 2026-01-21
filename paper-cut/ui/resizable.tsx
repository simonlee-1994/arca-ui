"use client"

import * as React from "react"
import { GripVerticalIcon } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const resizablePanelGroupVariants = cva(
  "flex h-full w-full data-[panel-group-direction=vertical]:flex-col overflow-hidden transition-all duration-paper ease-paper",
  {
    variants: {
      variant: {
        default: "bg-card border border-paper-edge rounded-[24px] shadow-paper-sm",
        flat: "bg-card border border-paper-edge rounded-[24px] shadow-none",
        none: "bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function ResizablePanelGroup({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup> &
  VariantProps<typeof resizablePanelGroupVariants>) {
  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group"
      className={cn(
        resizablePanelGroupVariants({ variant }),
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
      className={cn("bg-card", className)}
      {...props}
    />
  )
}

function ResizableHandle({
  withHandle,
  className,
  children,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) {
  const hasCustomHandle = children !== undefined && children !== null

  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle"
      className={cn(
        "relative flex items-center justify-center bg-paper-edge/40",
        "transition-colors duration-paper ease-paper hover:bg-paper-edge/60",
        "data-[panel-group-direction=horizontal]:cursor-col-resize data-[panel-group-direction=vertical]:cursor-row-resize",
        "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-hidden",
        "data-[panel-group-direction=horizontal]:w-px",
        "data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full",
        "after:absolute after:inset-y-0 after:left-1/2 after:w-7 after:-translate-x-1/2",
        "data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-4 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2",
        "[&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      )}
      {...props}
    >
      {hasCustomHandle ? children : null}
      {!hasCustomHandle && withHandle && (
        <div
          className={cn(
            "z-10 flex items-center justify-center",
            "h-7 w-4 rounded-[10px]",
            "bg-card border border-paper-edge shadow-none",
            "transition-colors duration-paper ease-paper hover:bg-secondary/60"
          )}
        >
          <GripVerticalIcon className="size-2.5 text-muted-foreground" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
