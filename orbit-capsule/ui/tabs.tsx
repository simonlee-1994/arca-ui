"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

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

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      // Orbit Capsule7: 1px border, orbit-hover-sm for the container
      className={cn(
        "orbit-hover-offset-sm inline-flex h-10 w-fit items-center justify-center gap-1 rounded-full border border-foreground bg-secondary/40 p-1",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      // Orbit Capsule7: Flat at rest, active tab gets accent background
      className={cn(
        "inline-flex h-full flex-1 items-center justify-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold whitespace-nowrap transition-all",
        "text-muted-foreground hover:text-foreground",
        "data-[state=active]:bg-accent data-[state=active]:text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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
      // Orbit Capsule7: 1px border, rounded-lg for container
      className={cn(
        "orbit-hover-offset flex-1 rounded-lg border border-foreground bg-background p-5 outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
