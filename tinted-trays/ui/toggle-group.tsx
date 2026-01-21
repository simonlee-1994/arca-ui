"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/themes/tinted-trays/toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    seamless?: boolean
  }
>({
  size: "default",
  variant: "default",
  seamless: false,
})

function ToggleGroup({
  className,
  variant,
  size,
  seamless = false,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants> & {
    seamless?: boolean
  }) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-seamless={seamless}
      className={cn(
        "inline-flex items-center",
        seamless
          ? "rounded-xl bg-tray p-1 border border-border/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_6px_rgba(15,23,42,0.04)]"
          : "gap-1",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, seamless }}>
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
  const resolvedSize = context.size || size || "default"

  // Size classes for seamless mode
  const sizeClasses = {
    sm: "h-6 px-2.5 text-xs",
    default: "h-6 px-3 text-xs",
    lg: "h-7 px-4 text-sm",
    "icon-sm": "size-6",
    icon: "size-6",
    "icon-lg": "size-7",
  }

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={resolvedSize}
      data-seamless={context.seamless}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 whitespace-nowrap",
        "font-medium transition-all duration-200",
        "outline-none",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:z-10",
        context.seamless
          ? [
              "rounded-lg",
              sizeClasses[resolvedSize as keyof typeof sizeClasses] || sizeClasses.default,
              "border border-transparent",
              "text-muted-foreground",
              "hover:text-foreground",
              "data-[state=on]:bg-capsule data-[state=on]:text-foreground data-[state=on]:border-border/60",
              "data-[state=on]:shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]",
            ]
          : [
              toggleVariants({
                variant: context.variant || variant,
                size: context.size || size,
              }),
              "shrink-0",
            ],
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }
