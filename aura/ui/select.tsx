"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { motion, type MotionProps } from "framer-motion"

import { cn } from "@/lib/utils"

function useThemePortalContainer(themeId: string) {
  const [container, setContainer] = React.useState<HTMLElement | null>(null)

  React.useEffect(() => {
    // Mount popover inside theme container to inherit correct fonts and theme variables
    setContainer(document.querySelector<HTMLElement>(`div[data-theme="${themeId}"]`))
  }, [themeId])

  return container
}

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default" | "lg"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        // Base styles - organic, rounded Aura feel
        "group inline-flex w-fit items-center justify-between gap-2 whitespace-nowrap text-sm font-medium outline-none transition-all duration-300 ease-out",
        // Border and background - soft, warm feel
        "border border-border/80 bg-primary/5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]",
        // Rounded corners - organic curves
        "rounded-xl",
        // Focus states - smooth highlight
        "focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        // Hover states
        "hover:border-border hover:bg-accent/10",
        // Active state
        "active:scale-[0.98]",
        // Placeholder styling
        "data-[placeholder]:text-muted-foreground",
        // Disabled state
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Invalid state
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        // Size variants
        "data-[size=sm]:h-8 data-[size=sm]:px-3 data-[size=sm]:text-xs data-[size=sm]:rounded-lg",
        "data-[size=default]:h-9 data-[size=default]:px-4",
        "data-[size=lg]:h-10 data-[size=lg]:px-5 data-[size=lg]:text-[15px] data-[size=lg]:rounded-xl",
        // Value styling
        "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
        // SVG icons
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-60 transition-transform duration-300 group-data-[state=open]:rotate-180" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  const portalContainer = useThemePortalContainer("aura")

  return (
    <SelectPrimitive.Portal container={portalContainer ?? undefined}>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          // Base styles
          "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto",
          // Background and border - warm, organic feel
          "bg-popover text-popover-foreground border border-border/50 shadow-[var(--aura-shadow-card)]",
          // Rounded corners - soft curves
          "rounded-xl",
          // Animations - smooth, natural feel
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-3 data-[side=left]:slide-in-from-right-3 data-[side=right]:slide-in-from-left-3 data-[side=top]:slide-in-from-bottom-3",
          // Positioning
          position === "popper" &&
            "data-[side=bottom]:translate-y-2 data-[side=left]:-translate-x-2 data-[side=right]:translate-x-2 data-[side=top]:-translate-y-2",
          className
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1.5",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

// Animated content with spring effect
function SelectContentAnimated({
  className,
  children,
  position = "popper",
  align = "center",
  animation = "spring",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content> & {
  animation?: "spring" | "bounce" | "fade" | "slide"
}) {
  const animationPresets = {
    spring: {
      initial: { opacity: 0, scale: 0.98, y: -8 },
      animate: { opacity: 1, scale: 1, y: 0 },
      transition: { type: "spring", stiffness: 500, damping: 30 },
    },
    bounce: {
      initial: { opacity: 0, scale: 0.94, y: -12 },
      animate: { opacity: 1, scale: 1, y: 0 },
      transition: { type: "spring", stiffness: 700, damping: 18, mass: 0.7 },
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.18, ease: "easeOut" },
    },
    slide: {
      initial: { opacity: 0, y: -10 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.2, ease: "easeOut" },
    },
  } satisfies Record<
    "spring" | "bounce" | "fade" | "slide",
    Pick<MotionProps, "initial" | "animate" | "transition">
  >
  const portalContainer = useThemePortalContainer("aura")

  return (
    <SelectPrimitive.Portal container={portalContainer ?? undefined}>
      <SelectPrimitive.Content
        data-slot="select-content-animated"
        className={cn(
          "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-hidden",
          "bg-popover text-popover-foreground border border-border/50 shadow-[var(--aura-shadow-card)]",
          "rounded-xl",
          position === "popper" &&
            "data-[side=bottom]:translate-y-2 data-[side=left]:-translate-x-2 data-[side=right]:translate-x-2 data-[side=top]:-translate-y-2",
          className
        )}
        position={position}
        align={align}
        {...props}
      >
        <motion.div
          {...animationPresets[animation]}
          className="origin-(--radix-select-content-transform-origin)"
        >
          <SelectPrimitive.Viewport
            className={cn(
              "p-1.5",
              position === "popper" &&
                "w-full min-w-[var(--radix-select-trigger-width)]"
            )}
          >
            {children}
          </SelectPrimitive.Viewport>
        </motion.div>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn(
        "px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
        className
      )}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        // Base styles
        "relative flex w-full cursor-pointer select-none items-center gap-2 py-2.5 pr-10 pl-3 text-sm outline-none transition-all duration-200",
        // Rounded corners
        "rounded-lg",
        // Highlight state
        "data-[highlighted]:bg-accent/60 data-[highlighted]:text-accent-foreground",
        // Selected state
        "data-[state=checked]:bg-primary/10 data-[state=checked]:text-primary data-[state=checked]:font-medium",
        // Disabled state
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        // SVG icons
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        "*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute right-3 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4 text-primary" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

// Animated select item with hover effect
function SelectItemAnimated({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item-animated"
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center gap-2 py-2.5 pr-10 pl-3 text-sm outline-none",
        "rounded-lg",
        "data-[highlighted]:bg-accent/60 data-[highlighted]:text-accent-foreground",
        "data-[state=checked]:bg-primary/10 data-[state=checked]:text-primary data-[state=checked]:font-medium",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        "*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      asChild
      {...props}
    >
      <motion.div
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15 }}
      >
        <span className="absolute right-3 flex size-4 items-center justify-center">
          <SelectPrimitive.ItemIndicator asChild>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <CheckIcon className="size-4 text-primary" />
            </motion.span>
          </SelectPrimitive.ItemIndicator>
        </span>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </motion.div>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(
        "pointer-events-none -mx-1 my-1.5 h-px bg-gradient-to-r from-transparent via-border to-transparent",
        className
      )}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1 text-muted-foreground transition-colors hover:text-foreground",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1 text-muted-foreground transition-colors hover:text-foreground",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectContentAnimated,
  SelectGroup,
  SelectItem,
  SelectItemAnimated,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
