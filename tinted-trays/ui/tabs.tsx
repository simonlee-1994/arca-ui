"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

// Context to share layoutId for animated indicator
const TabsContext = React.createContext<{
  layoutId?: string
  surface?: "tray" | "background"
}>({})

function Tabs({
  className,
  layoutId,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root> & {
  layoutId?: string
}) {
  const id = React.useId()
  return (
    <TabsContext.Provider value={{ layoutId: layoutId || id }}>
      <TabsPrimitive.Root
        data-slot="tabs"
        className={cn("flex flex-col gap-3", className)}
        {...props}
      />
    </TabsContext.Provider>
  )
}

const tabsListVariants = cva(
  "inline-flex h-8 w-fit items-center justify-center gap-0.5 p-1",
  {
    variants: {
      surface: {
        tray: "bg-tray",
        background: "bg-background",
      },
      rim: {
        strong: [
          "rounded-2xl border border-border/40",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_2px_10px_rgba(15,23,42,0.06)]",
        ],
        default: [
          "rounded-xl border border-border/40",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_6px_rgba(15,23,42,0.04)]",
        ],
        subtle: [
          "rounded-xl border border-border/50",
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

function TabsList({
  className,
  surface,
  rim,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  const context = React.useContext(TabsContext)
  return (
    <TabsContext.Provider value={{ ...context, surface: surface || "tray" }}>
      <TabsPrimitive.List
        data-slot="tabs-list"
        className={cn(tabsListVariants({ surface, rim }), className)}
        {...props}
      >
        {children}
      </TabsPrimitive.List>
    </TabsContext.Provider>
  )
}

function TabsTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const { layoutId, surface } = React.useContext(TabsContext)
  const [isActive, setIsActive] = React.useState(false)
  const ref = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new MutationObserver(() => {
      setIsActive(el.getAttribute("data-state") === "active")
    })
    observer.observe(el, { attributes: true, attributeFilter: ["data-state"] })
    setIsActive(el.getAttribute("data-state") === "active")
    return () => observer.disconnect()
  }, [])

  // Determine active styles based on surface context
  const isInvertedContext = surface === "background"

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex items-center justify-center gap-1.5 whitespace-nowrap px-3 h-6 text-xs font-medium",
        "rounded-lg transition-colors duration-200",
        "text-muted-foreground",
        "hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:text-foreground",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
        className
      )}
      {...props}
    >
      {isActive && (
        <motion.span
          layoutId={layoutId}
          className={cn(
            "absolute inset-0 rounded-lg",
            isInvertedContext
              ? "bg-tray border border-border/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_6px_rgba(15,23,42,0.04)]"
              : "bg-background border border-border/60 shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]"
          )}
          transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-1.5">{children}</span>
    </TabsPrimitive.Trigger>
  )
}

const tabsContentVariants = cva(
  "flex-1 outline-none p-6 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
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

function TabsContent({
  className,
  surface,
  rim,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content> &
  VariantProps<typeof tabsContentVariants>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(tabsContentVariants({ surface, rim }), className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
