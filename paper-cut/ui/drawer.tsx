"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Drawer({
  direction = "right",
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return (
    <DrawerPrimitive.Root data-slot="drawer" direction={direction} {...props} />
  )
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

type OverlayVariant = "default" | "blur" | "dark" | "light" | "none"

/**
 * Drawer Elevation System (3 Levels):
 * - elevated: Large shadow (DEFAULT)
 * - default:  Medium shadow
 * - outlined: Border only, no shadow
 *
 * Note: Drawer defaults to opening from the right.
 */
const drawerContentVariants = cva(
  [
    "group/drawer-content bg-card fixed z-50 flex h-auto flex-col border border-paper-edge",
    "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-[24px]",
    "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-[24px]",
    "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:rounded-l-[24px] data-[vaul-drawer-direction=right]:sm:max-w-md",
    "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:rounded-r-[24px] data-[vaul-drawer-direction=left]:sm:max-w-md",
    // Direction-aware shadows (kept inside the viewport)
    "data-[vaul-drawer-direction=top]:shadow-[0px_var(--drawer-hard-offset)_0px_0px_var(--paper-shadow),0_var(--drawer-ambient-y)_var(--drawer-ambient-blur)_var(--drawer-ambient-spread)_var(--paper-shadow-ambient)]",
    "data-[vaul-drawer-direction=bottom]:shadow-[0px_calc(var(--drawer-hard-offset)_*_-1)_0px_0px_var(--paper-shadow),0_calc(var(--drawer-ambient-y)_*_-1)_var(--drawer-ambient-blur)_var(--drawer-ambient-spread)_var(--paper-shadow-ambient)]",
    "data-[vaul-drawer-direction=right]:shadow-[calc(var(--drawer-hard-offset)_*_-1)_0px_0px_0px_var(--paper-shadow),0_var(--drawer-ambient-y)_var(--drawer-ambient-blur)_var(--drawer-ambient-spread)_var(--paper-shadow-ambient)]",
    "data-[vaul-drawer-direction=left]:shadow-[var(--drawer-hard-offset)_0px_0px_0px_var(--paper-shadow),0_var(--drawer-ambient-y)_var(--drawer-ambient-blur)_var(--drawer-ambient-spread)_var(--paper-shadow-ambient)]",
  ],
  {
    variants: {
      elevation: {
        elevated:
          "[--drawer-hard-offset:var(--paper-offset-lg)] [--drawer-ambient-y:32px] [--drawer-ambient-blur:46px] [--drawer-ambient-spread:-36px]",
        default:
          "[--drawer-hard-offset:var(--paper-offset-md)] [--drawer-ambient-y:22px] [--drawer-ambient-blur:34px] [--drawer-ambient-spread:-28px]",
        outlined: "shadow-none",
      },
    },
    defaultVariants: {
      elevation: "elevated",
    },
  }
)

function DrawerOverlay({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay> & {
  variant?: OverlayVariant
}) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50",
        variant === "default" && "bg-black/30",
        variant === "blur" && "bg-black/20 backdrop-blur-md",
        variant === "dark" && "bg-black/60",
        variant === "light" && "bg-white/60 backdrop-blur-sm",
        variant === "none" && "bg-transparent",
        className
      )}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  overlayVariant = "default",
  elevation,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content> & {
  overlayVariant?: OverlayVariant
} & VariantProps<typeof drawerContentVariants>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay variant={overlayVariant} />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        data-elevation={elevation ?? "elevated"}
        className={cn(
          drawerContentVariants({ elevation }),
          className
        )}
        {...props}
      >
        <div className="bg-muted mx-auto mt-4 hidden h-1.5 w-[60px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex flex-col gap-1 p-6 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center",
        className
      )}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-3 p-6", className)}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-foreground text-lg font-bold tracking-tight", className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
