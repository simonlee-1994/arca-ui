import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  )
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  )
}

const navigationMenuTriggerStyle = cva(
  [
    "group inline-flex h-10 w-max items-center justify-center rounded-xl bg-background px-4 py-2 text-sm font-medium",
    "transition-all duration-300 ease-out outline-none",
    "hover:bg-accent/60 hover:text-accent-foreground",
    "focus:bg-accent/60 focus:text-accent-foreground",
    "focus-visible:ring-2 focus-visible:ring-ring/30",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[state=open]:bg-primary/10 data-[state=open]:text-primary",
  ]
)

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group gap-1", className)}
      {...props}
    >
      {children}{" "}
      <div className="flex items-center justify-center size-5 rounded-full bg-secondary/60 transition-all duration-300 group-hover:bg-primary/10 group-data-[state=open]:bg-primary/10">
        <ChevronDownIcon
          className="size-3.5 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180"
          aria-hidden="true"
        />
      </div>
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out",
        "data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52",
        "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground",
        "group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out",
        "group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95",
        "group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0",
        "group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-2",
        "group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-xl",
        "group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:border-border/60 group-data-[viewport=false]/navigation-menu:shadow-[var(--aura-shadow-card)]",
        "group-data-[viewport=false]/navigation-menu:duration-200",
        "**:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div
      className={cn(
        "absolute top-full left-0 isolate z-50 flex justify-center"
      )}
    >
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "origin-top-center text-popover-foreground relative isolate mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-2xl border border-border/60 shadow-[var(--aura-shadow-card)] md:w-[var(--radix-navigation-menu-viewport-width)]",
          "aura-surface-gradient-1",
          "after:absolute after:inset-0 after:-z-10 after:content-[''] after:opacity-[0.16] after:[background-image:radial-gradient(70%_60%_at_50%_0%,color-mix(in_oklab,var(--primary)_18%,transparent)_0%,transparent_72%)]",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90",
          "transition-all duration-300",
          className
        )}
        {...props}
      />
    </div>
  )
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "flex flex-col gap-1 rounded-xl p-3 text-sm transition-all duration-200 outline-none",
        "[&_svg:not([class*='text-'])]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4",
        "hover:bg-accent/60 hover:text-accent-foreground",
        "focus:bg-accent/60 focus:text-accent-foreground",
        "focus-visible:ring-2 focus-visible:ring-ring/30",
        "data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "top-full z-[1] flex h-2 items-end justify-center overflow-hidden",
        "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
        className
      )}
      {...props}
    >
      <div className="bg-border relative top-[60%] h-2.5 w-2.5 rotate-45 rounded-tl-sm shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
}
