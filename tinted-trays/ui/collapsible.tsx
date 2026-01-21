"use client"

import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const collapsibleVariants = cva(
  ["grid gap-2", "text-foreground"],
  {
    variants: {
      surface: {
        tray: "",
        background: "",
      },
    },
    defaultVariants: {
      surface: "tray",
    },
  }
)

// Context to pass surface variant to children
const CollapsibleContext = React.createContext<{ surface: "tray" | "background" }>({ surface: "tray" })

function Collapsible({
  className,
  surface = "tray",
  children,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root> &
  VariantProps<typeof collapsibleVariants>) {
  return (
    <CollapsibleContext.Provider value={{ surface: surface || "tray" }}>
      <CollapsiblePrimitive.Root
        data-slot="collapsible"
        className={cn(collapsibleVariants({ surface }), className)}
        {...props}
      >
        {children}
      </CollapsiblePrimitive.Root>
    </CollapsibleContext.Provider>
  )
}

function CollapsibleTrigger({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  const { surface } = React.useContext(CollapsibleContext)

  const surfaceStyles = surface === "background"
    ? [
        "bg-background",
        "border border-border/60",
        "shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]",
        "hover:border-primary/50 hover:shadow-[0_2px_10px_rgba(15,23,42,0.10),inset_0_1px_0_rgba(255,255,255,0.9)]",
      ]
    : [
        "bg-tray",
        "border border-border/60",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_1px_4px_rgba(15,23,42,0.03)]",
        "hover:border-primary/50 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_2px_8px_rgba(15,23,42,0.05)]",
      ]

  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      className={cn(
        "flex w-full items-center justify-between gap-4 px-4 py-3",
        "rounded-2xl",
        "text-left text-sm font-medium text-foreground",
        "outline-none transition-all duration-200",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&[data-state=open]]:text-primary [&[data-state=open]]:border-primary/50",
        surfaceStyles,
        className
      )}
      {...props}
    />
  )
}

function CollapsibleContent({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  const { surface } = React.useContext(CollapsibleContext)

  const surfaceStyles = surface === "background"
    ? [
        "bg-background",
        "border border-border/60",
        "shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]",
      ]
    : [
        "bg-tray",
        "border border-border/60",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_1px_4px_rgba(15,23,42,0.03)]",
      ]

  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      className={cn(
        "overflow-hidden rounded-2xl",
        "data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
        surfaceStyles,
        className
      )}
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
