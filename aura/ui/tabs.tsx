"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  )
}

interface TabsListProps extends React.ComponentProps<typeof TabsPrimitive.List> {
  layoutId?: string
}

function TabsList({
  className,
  layoutId = "tabs-indicator",
  children,
  ...props
}: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-card/80 text-muted-foreground inline-flex h-11 w-fit items-center justify-center rounded-2xl p-1.5 border border-border/50 shadow-[var(--aura-shadow-card)] backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.List>
  )
}

interface TabsTriggerProps extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
  layoutId?: string
}

function TabsTrigger({
  className,
  layoutId = "tabs-indicator",
  children,
  ...props
}: TabsTriggerProps) {
  const [isActive, setIsActive] = React.useState(false)
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    const trigger = triggerRef.current
    if (!trigger) return

    const observer = new MutationObserver(() => {
      setIsActive(trigger.getAttribute("data-state") === "active")
    })

    observer.observe(trigger, { attributes: true, attributeFilter: ["data-state"] })
    setIsActive(trigger.getAttribute("data-state") === "active")

    return () => observer.disconnect()
  }, [])

  return (
    <TabsPrimitive.Trigger
      ref={triggerRef}
      data-slot="tabs-trigger"
      className={cn(
        "relative",
        "data-[state=active]:text-primary",
        "focus-visible:ring-ring/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "text-muted-foreground",
        "hover:text-foreground hover:bg-background/60",
        "inline-flex h-full flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium whitespace-nowrap",
        "transition-colors duration-200",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {isActive && (
        <motion.div
          layoutId={layoutId}
          className="absolute inset-0 bg-primary/10 rounded-xl shadow-sm"
          transition={{
            type: "spring",
            bounce: 0.15,
            duration: 0.5,
          }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </TabsPrimitive.Trigger>
  )
}

// Animated TabsTrigger with proper render prop pattern
const AnimatedTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    layoutId?: string
  }
>(({ className, children, layoutId = "tabs-indicator", ...props }, ref) => {
  const [isActive, setIsActive] = React.useState(false)
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    const trigger = triggerRef.current
    if (!trigger) return

    const observer = new MutationObserver(() => {
      setIsActive(trigger.getAttribute("data-state") === "active")
    })

    observer.observe(trigger, { attributes: true, attributeFilter: ["data-state"] })
    setIsActive(trigger.getAttribute("data-state") === "active")

    return () => observer.disconnect()
  }, [])

  return (
    <TabsPrimitive.Trigger
      ref={(node) => {
        // @ts-ignore
        triggerRef.current = node
        if (typeof ref === "function") ref(node)
        else if (ref) ref.current = node
      }}
      data-slot="tabs-trigger"
      className={cn(
        "relative",
        "data-[state=active]:text-primary",
        "focus-visible:ring-ring/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "text-muted-foreground",
        "hover:text-foreground hover:bg-background/60",
        "inline-flex h-full flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium whitespace-nowrap",
        "transition-colors duration-200",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {isActive && (
        <motion.div
          layoutId={layoutId}
          className="absolute inset-0 bg-primary/10 rounded-xl shadow-sm"
          transition={{
            type: "spring",
            bounce: 0.15,
            duration: 0.5,
          }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </TabsPrimitive.Trigger>
  )
})
AnimatedTabsTrigger.displayName = "AnimatedTabsTrigger"

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "flex-1 outline-none rounded-2xl",
        "focus-visible:ring-ring/30 focus-visible:ring-2 focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
  )
}

// Animated TabsContent wrapper for smooth transitions
const AnimatedTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentProps<typeof TabsPrimitive.Content>
>(({ className, children, forceMount, ...props }, ref) => {
  return (
    <TabsPrimitive.Content
      ref={ref}
      data-slot="tabs-content"
      className={cn(
        "flex-1 outline-none rounded-2xl",
        "focus-visible:ring-ring/30 focus-visible:ring-2 focus-visible:ring-offset-2",
        className
      )}
      forceMount={forceMount}
      {...props}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </TabsPrimitive.Content>
  )
})
AnimatedTabsContent.displayName = "AnimatedTabsContent"

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  AnimatedTabsTrigger,
  AnimatedTabsContent,
}
