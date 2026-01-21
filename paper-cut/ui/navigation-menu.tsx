import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function NavigationMenu({
  className,
  children,
  viewport = true,
  popupShadow = "default",
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean
  popupShadow?: "default" | "elevated"
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      data-popup-shadow={popupShadow}
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
  variant = "default",
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List> & {
  variant?: "default" | "elevated" | "filled" | "minimal" | "pills"
}) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      data-variant={variant}
      className={cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        // Default variant - section container (Level 2)
        variant === "default" && [
          "bg-card rounded-[24px] border border-paper-edge p-1.5 shadow-paper-sm",
          "transition-shadow duration-paper ease-paper",
        ],
        // Elevated variant - hero container (Level 3)
        variant === "elevated" && [
          "bg-card rounded-[24px] border border-paper-edge p-1.5 shadow-paper-md",
          "transition-shadow duration-paper ease-paper",
        ],
        // Filled variant - solid background, no border
        variant === "filled" && [
          "bg-secondary rounded-[24px] p-1.5",
        ],
        // Minimal variant - transparent background
        variant === "minimal" && [
          "bg-transparent p-1",
        ],
        // Pills variant - items look like individual pills
        variant === "pills" && [
          "bg-transparent gap-2 p-0",
        ],
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
  "group inline-flex h-9 w-max select-none items-center justify-center px-3.5 py-1.5 text-sm font-semibold transition-all duration-paper ease-paper outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "rounded-[16px] bg-transparent hover:bg-secondary hover:text-secondary-foreground focus:bg-secondary focus:text-secondary-foreground data-[state=open]:bg-secondary data-[state=open]:text-secondary-foreground",
        filled: "rounded-[16px] bg-secondary/50 hover:bg-secondary hover:text-secondary-foreground focus:bg-secondary focus:text-secondary-foreground data-[state=open]:bg-primary data-[state=open]:text-primary-foreground",
        pill:
          "rounded-full border border-paper-edge bg-card shadow-paper-sm hover:bg-accent/50 hover:-translate-x-[var(--paper-lift-sm)] hover:-translate-y-[var(--paper-lift-sm)] data-[state=open]:bg-secondary data-[state=open]:text-secondary-foreground data-[state=open]:-translate-x-[var(--paper-lift-sm)] data-[state=open]:-translate-y-[var(--paper-lift-sm)]",
        underline: "rounded-none border-b-2 border-transparent hover:border-muted-foreground/30 data-[state=open]:border-primary data-[state=open]:text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function NavigationMenuTrigger({
  className,
  children,
  variant = "default",
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger> & {
  variant?: "default" | "filled" | "pill" | "underline"
}) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle({ variant }), "group", className)}
      {...props}
    >
      {children}{" "}
      <ChevronDownIcon
        className="relative top-[1px] ml-1 size-3 transition-transform duration-paper ease-paper group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
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
        "top-0 left-0 w-full p-3 md:absolute md:w-auto",
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52",
        "group-data-[viewport=false]/navigation-menu:bg-card group-data-[viewport=false]/navigation-menu:text-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-2 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-[20px] group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:border-paper-edge group-data-[viewport=false]/navigation-menu:shadow-paper-sm group-data-[viewport=false]/navigation-menu:duration-paper group-data-[viewport=false]/navigation-menu:ease-paper group-[&[data-viewport=false][data-popup-shadow=elevated]]/navigation-menu:shadow-paper-md",
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
          "origin-top-center bg-card text-foreground relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-[20px] border border-paper-edge md:w-[var(--radix-navigation-menu-viewport-width)]",
          "shadow-paper-sm group-data-[popup-shadow=elevated]/navigation-menu:shadow-paper-md",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
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
        "flex flex-col gap-1 rounded-[14px] p-3 text-sm transition-all duration-paper ease-paper outline-none",
        "hover:bg-secondary hover:text-secondary-foreground",
        "focus:bg-secondary focus:text-secondary-foreground",
        "data-[active=true]:bg-secondary data-[active=true]:text-secondary-foreground",
        "focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "[&_svg:not([class*='text-'])]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4",
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
      <div className="bg-card border-l border-t border-paper-edge relative top-[60%] h-3 w-3 rotate-45 rounded-tl-[4px] shadow-[-2px_-2px_0px_0px_var(--paper-shadow)]" />
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
