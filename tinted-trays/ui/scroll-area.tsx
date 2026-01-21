"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const scrollAreaVariants = cva(
  ["relative overflow-hidden"],
  {
    variants: {
      surface: {
        none: "",
        tray: "bg-tray",
        background: "bg-background",
      },
      rim: {
        none: "",
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
      rim: "subtle",
    },
  }
)

function ScrollArea({
  className,
  children,
  surface,
  rim,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root> &
  VariantProps<typeof scrollAreaVariants>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn(
        scrollAreaVariants({ surface, rim }),
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className={cn(
          "size-full rounded-[inherit]",
          "transition-[color,box-shadow] outline-none",
          "focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2"
        )}
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
        "flex touch-none select-none",
        "p-0.5",
        "transition-all duration-200",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className={cn(
          "relative flex-1",
          "rounded-full",
          // Tinted Trays: Dark visible scrollbar thumb
          "bg-slate-400",
          "transition-colors duration-200",
          "hover:bg-slate-500"
        )}
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
