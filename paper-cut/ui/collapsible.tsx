"use client"

import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"

/**
 * Collapsible Elevation System (4 Levels):
 * - elevated: Strong shadow + lift (Landing pages, hero sections)
 * - default:  Medium shadow + medium lift (General containers, panels) - DEFAULT
 * - outlined: Border at rest, subtle lift on interaction (Sidebars, settings, dense layouts)
 * - flat:     No border, no shadow (Nested inside elevated containers)
 *
 * Lift:
 * - Defaults to enabled for elevated/default/outlined, disabled for flat.
 * - Pass `lift={false}` to opt out per usage.
 */
type CollapsibleVariant = "elevated" | "default" | "outlined" | "flat"
type CollapsibleLift = boolean

const collapsibleVariants = cva(
  "relative",
  {
    variants: {
      variant: {
        elevated:
          "bg-card border border-paper-edge rounded-[24px] shadow-paper-md transition-all duration-paper ease-paper",
        default:
          "bg-card border border-paper-edge rounded-[24px] shadow-paper-sm transition-all duration-paper ease-paper",
        outlined:
          "bg-card border border-paper-edge rounded-[24px] shadow-none transition-all duration-paper ease-paper",
        flat:
          "rounded-none border-0 bg-transparent shadow-none transition-none",
      },
      lift: {
        on: "",
        off: "",
      },
    },
    compoundVariants: [
      {
        variant: "elevated",
        lift: "on",
        className:
          "hover:-translate-x-[var(--paper-lift-lg)] hover:-translate-y-[var(--paper-lift-lg)] hover:shadow-paper-lg hover:z-10 focus-within:-translate-x-[var(--paper-lift-lg)] focus-within:-translate-y-[var(--paper-lift-lg)] focus-within:shadow-paper-lg focus-within:z-10 data-[state=open]:-translate-x-[var(--paper-lift-lg)] data-[state=open]:-translate-y-[var(--paper-lift-lg)] data-[state=open]:shadow-paper-lg data-[state=open]:z-10",
      },
      {
        variant: "default",
        lift: "on",
        className:
          "hover:-translate-x-[var(--paper-lift-md)] hover:-translate-y-[var(--paper-lift-md)] hover:shadow-paper-md hover:z-10 focus-within:-translate-x-[var(--paper-lift-md)] focus-within:-translate-y-[var(--paper-lift-md)] focus-within:shadow-paper-md focus-within:z-10 data-[state=open]:-translate-x-[var(--paper-lift-md)] data-[state=open]:-translate-y-[var(--paper-lift-md)] data-[state=open]:shadow-paper-md data-[state=open]:z-10",
      },
      {
        variant: "outlined",
        lift: "on",
        className:
          "hover:-translate-x-[var(--paper-lift-sm)] hover:-translate-y-[var(--paper-lift-sm)] hover:shadow-paper-sm hover:z-10 focus-within:-translate-x-[var(--paper-lift-sm)] focus-within:-translate-y-[var(--paper-lift-sm)] focus-within:shadow-paper-sm focus-within:z-10 data-[state=open]:-translate-x-[var(--paper-lift-sm)] data-[state=open]:-translate-y-[var(--paper-lift-sm)] data-[state=open]:shadow-paper-sm data-[state=open]:z-10",
      },
    ],
    defaultVariants: {
      variant: "default",
      lift: "on",
    },
  }
)

type CollapsibleContextValue = {
  open: boolean
  variant: CollapsibleVariant
  lift: CollapsibleLift
}

const CollapsibleContext = React.createContext<CollapsibleContextValue>({
  open: false,
  variant: "default",
  lift: true,
})

function Collapsible({
  className,
  variant,
  lift,
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root> &
  Omit<VariantProps<typeof collapsibleVariants>, "lift"> & {
    lift?: CollapsibleLift
  }) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen
  const resolvedVariant = variant ?? "default"
  const resolvedLift = lift ?? resolvedVariant !== "flat"

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  return (
    <CollapsibleContext.Provider
      value={{ open: isOpen, variant: resolvedVariant, lift: resolvedLift }}
    >
      <CollapsiblePrimitive.Root
        data-slot="collapsible"
        data-variant={resolvedVariant}
        data-lift={resolvedLift ? "on" : "off"}
        open={isOpen}
        onOpenChange={handleOpenChange}
        className={cn(
          collapsibleVariants({
            variant: resolvedVariant,
            lift: resolvedLift ? "on" : "off",
          }),
          className
        )}
        {...props}
      />
    </CollapsibleContext.Provider>
  )
}

const collapsibleTriggerVariants = cva(
  "group flex w-full items-center justify-between gap-4 text-left font-semibold transition-colors duration-paper ease-paper outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        elevated: "px-6 py-4 rounded-[24px]",
        default: "px-5 py-3.5 rounded-[24px]",
        outlined: "px-5 py-3.5 rounded-[24px]",
        flat: "py-3 px-4 rounded-[16px] hover:bg-accent/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function CollapsibleTrigger({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger> &
  VariantProps<typeof collapsibleTriggerVariants>) {
  const { variant: contextVariant } = React.useContext(CollapsibleContext)
  const resolvedVariant = variant ?? contextVariant

  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      data-variant={resolvedVariant}
      className={cn(
        collapsibleTriggerVariants({ variant: resolvedVariant }),
        className
      )}
      {...props}
    />
  )
}

// Animated content using framer-motion
function CollapsibleContent({
  className,
  children,
  forceMount,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  const { open } = React.useContext(CollapsibleContext)
  // Filter DOM drag events to avoid type conflicts with motion's drag types
  const {
    onDrag,
    onDragEnd,
    onDragStart,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    ...restProps
  } = props as React.HTMLAttributes<HTMLDivElement>
  // Motion component has stricter event types, perform compatibility conversion
  const motionSafeProps = restProps as unknown as Record<string, unknown>

  if (forceMount) {
    return (
      <motion.div
        data-slot="collapsible-content"
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.2, ease: [0.25, 0.8, 0.25, 1] }}
        className="overflow-hidden"
        {...motionSafeProps}
      >
        <div className={cn("text-sm text-muted-foreground pt-0", className)}>
          {children}
        </div>
      </motion.div>
    )
  }

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          data-slot="collapsible-content"
          initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.2, ease: [0.25, 0.8, 0.25, 1] }}
        className="overflow-hidden"
        {...motionSafeProps}
      >
          <div className={cn("text-sm text-muted-foreground pt-0", className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
