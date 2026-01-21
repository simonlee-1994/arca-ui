"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/themes/orbit-capsule/toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number
  }
>({
  size: "default",
  variant: "default",
  spacing: 0,
})

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 0,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants> & {
    spacing?: number
  }) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      className={cn(
        "inline-flex items-center",
        spacing === 0 && "rounded-full border border-foreground bg-secondary/40 p-1",
        spacing > 0 && `gap-${spacing}`,
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, spacing }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext)
  const spacing = context.spacing ?? 0
  const effectiveSize = size || context.size || "default"

  // Use borderless for joined groups, outline for spaced
  const itemVariant = spacing === 0 ? "borderless" : (variant || context.variant || "outline")

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none whitespace-nowrap",
        spacing > 0 && "orbit-hover-offset-sm",
        // Borderless variant for joined toggle groups
        itemVariant === "borderless" && [
          "bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground",
          "data-[state=on]:bg-foreground data-[state=on]:text-background"
        ],
        // Outline variant for spaced toggle groups
        itemVariant === "outline" && [
          "border border-foreground bg-background hover:bg-secondary/40",
          "data-[state=on]:bg-foreground data-[state=on]:text-background"
        ],
        // Default variant
        itemVariant === "default" && [
          "bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground",
          "data-[state=on]:bg-foreground data-[state=on]:text-background"
        ],
        // Accent variant
        itemVariant === "accent" && [
          "bg-transparent text-muted-foreground hover:bg-accent/20 hover:text-foreground",
          "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
        ],
        // Sizes
        effectiveSize === "default" && "h-9 px-3 min-w-9",
        effectiveSize === "sm" && "h-7 px-2 min-w-7 text-xs",
        effectiveSize === "lg" && "h-11 px-4 min-w-11",
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }
