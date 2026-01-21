"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/themes/paper-cut/toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
})

const toggleGroupVariants = cva(
  "group/toggle-group inline-flex items-center gap-2 transition-all duration-paper ease-paper disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-card border border-paper-edge shadow-paper-sm",
        outline: "bg-background border border-paper-edge shadow-paper-sm",
        flat: "bg-secondary/60 border border-paper-edge shadow-none",
        "flat-outline": "bg-secondary/60 border border-paper-edge shadow-none",
      },
      size: {
        sm: "rounded-[16px] p-1",
        default: "rounded-[18px] p-1.5",
        lg: "rounded-[22px] p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const toggleGroupItemVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold outline-none transition-all duration-paper ease-paper disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-ring/50 focus-visible:ring-[3px] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "text-muted-foreground border border-transparent bg-transparent shadow-none hover:bg-secondary/60 hover:text-foreground active:bg-secondary/80 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary/80",
        outline:
          "text-muted-foreground border border-transparent bg-transparent shadow-none hover:bg-muted/30 hover:text-foreground active:bg-muted/50 data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:border-foreground",
        flat:
          "text-muted-foreground border border-transparent bg-transparent shadow-none hover:bg-card hover:text-foreground active:bg-card/80 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary/80",
        "flat-outline":
          "text-muted-foreground border border-transparent bg-transparent shadow-none hover:bg-card hover:text-foreground active:bg-card/80 data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:border-foreground",
      },
      size: {
        sm: "h-8 min-w-8 rounded-[14px] px-3",
        default: "h-9 min-w-9 rounded-[16px] px-4",
        lg: "h-11 min-w-11 rounded-[20px] px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  const resolvedVariant = variant ?? "default"
  const resolvedSize = size ?? "default"

  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={resolvedVariant}
      data-size={resolvedSize}
      className={cn(
        toggleGroupVariants({ variant: resolvedVariant, size: resolvedSize }),
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant: resolvedVariant, size: resolvedSize }}>
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
  const resolvedVariant = context.variant || variant
  const resolvedSize = context.size || size

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={resolvedVariant}
      data-size={resolvedSize}
      className={cn(
        toggleGroupItemVariants({ variant: resolvedVariant ?? "default", size: resolvedSize ?? "default" }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }
