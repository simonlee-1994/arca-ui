"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center",
  {
    variants: {
      appearance: {
        solid: "bg-secondary/60 text-muted-foreground border border-paper-edge",
        segmented: "bg-card text-muted-foreground border border-paper-edge",
        flat: "bg-transparent text-muted-foreground border-0 shadow-none gap-2",
      },
      variant: {
        default: "",
        inset: "",
      },
      size: {
        default: "",
        sm: "",
        lg: "",
      },
    },
    compoundVariants: [
      // Elevation (only applies to container appearances)
      { appearance: "solid", variant: "default", className: "shadow-paper-sm" },
      { appearance: "solid", variant: "inset", className: "shadow-none" },
      {
        appearance: "segmented",
        variant: "default",
        className: "shadow-paper-sm",
      },
      { appearance: "segmented", variant: "inset", className: "shadow-none" },

      // Sizing (no container sizing for `flat`)
      { appearance: "solid", size: "default", className: "h-12 rounded-[20px] p-1.5" },
      { appearance: "solid", size: "sm", className: "h-10 rounded-[18px] p-1" },
      { appearance: "solid", size: "lg", className: "h-14 rounded-[24px] p-1.5" },
      { appearance: "segmented", size: "default", className: "h-12 rounded-full p-1.5" },
      { appearance: "segmented", size: "sm", className: "h-10 rounded-full p-1" },
      { appearance: "segmented", size: "lg", className: "h-14 rounded-full p-1.5" },
    ],
    defaultVariants: {
      appearance: "solid",
      variant: "default",
      size: "default",
    },
  }
)

type TabsStyleContextValue = {
  appearance: NonNullable<VariantProps<typeof tabsListVariants>["appearance"]>
  size: NonNullable<VariantProps<typeof tabsListVariants>["size"]>
}

const TabsStyleContext = React.createContext<TabsStyleContextValue>({
  appearance: "solid",
  size: "default",
})

function TabsList({
  className,
  variant,
  size,
  appearance,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  const resolvedAppearance = appearance ?? "solid"
  const resolvedSize = size ?? "default"
  return (
    <TabsStyleContext.Provider
      value={{ appearance: resolvedAppearance, size: resolvedSize }}
    >
      <TabsPrimitive.List
        data-slot="tabs-list"
        data-appearance={resolvedAppearance}
        data-size={resolvedSize}
        className={cn(
          tabsListVariants({
            appearance: resolvedAppearance,
            variant,
            size: resolvedSize,
          }),
          className
        )}
        {...props}
      />
    </TabsStyleContext.Provider>
  )
}

const tabsTriggerVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "outline-none font-semibold transition-all",
    "focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      appearance: {
        solid:
          "text-muted-foreground hover:text-foreground hover:bg-muted/30 data-[state=active]:bg-foreground data-[state=active]:text-background",
        segmented:
          "rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/30 data-[state=active]:bg-foreground data-[state=active]:text-background",
        flat:
          "text-muted-foreground hover:text-foreground bg-secondary/60 border border-paper-edge shadow-none hover:bg-accent/40 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-paper-sm",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        default: "h-9 px-4 text-sm",
        lg: "h-11 px-5 text-sm",
      },
    },
    compoundVariants: [
      { appearance: "solid", size: "sm", className: "rounded-[14px]" },
      { appearance: "solid", size: "default", className: "rounded-[16px]" },
      { appearance: "solid", size: "lg", className: "rounded-[20px]" },
      { appearance: "flat", size: "sm", className: "rounded-[14px]" },
      { appearance: "flat", size: "default", className: "rounded-[16px]" },
      { appearance: "flat", size: "lg", className: "rounded-[20px]" },
    ],
    defaultVariants: {
      appearance: "solid",
      size: "default",
    },
  }
)

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const { appearance, size } = React.useContext(TabsStyleContext)
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        tabsTriggerVariants({ appearance, size }),
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "flex-1 outline-none rounded-[24px] bg-background/50 border border-paper-edge p-6 shadow-none",
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
