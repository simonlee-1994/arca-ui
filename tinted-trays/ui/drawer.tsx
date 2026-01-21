"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const drawerContentVariants = cva(
  [
    "group/drawer-content fixed z-50 flex h-auto flex-col",
    "text-foreground",
  ],
  {
    variants: {
      surface: {
        tray: "bg-tray",
        background: "bg-background",
      },
      rim: {
        strong: "border-border/40",
        default: "border-border/50",
        subtle: "border-border/60",
      },
    },
    defaultVariants: {
      surface: "tray",
      rim: "strong",
    },
  }
)

function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
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

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        // Cold color overlay
        "fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  surface,
  rim,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content> &
  VariantProps<typeof drawerContentVariants>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          drawerContentVariants({ surface, rim }),
          // Bottom drawer
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0",
          "data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[85vh]",
          "data-[vaul-drawer-direction=bottom]:rounded-t-3xl data-[vaul-drawer-direction=bottom]:border-t",
          "data-[vaul-drawer-direction=bottom]:shadow-[0_-18px_54px_rgba(15,23,42,0.18),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_2px_10px_rgba(15,23,42,0.06)]",
          // Top drawer
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0",
          "data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[85vh]",
          "data-[vaul-drawer-direction=top]:rounded-b-3xl data-[vaul-drawer-direction=top]:border-b",
          "data-[vaul-drawer-direction=top]:shadow-[0_18px_54px_rgba(15,23,42,0.18),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_2px_10px_rgba(15,23,42,0.06)]",
          // Right drawer
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0",
          "data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:sm:max-w-md",
          "data-[vaul-drawer-direction=right]:rounded-l-3xl data-[vaul-drawer-direction=right]:border-l",
          "data-[vaul-drawer-direction=right]:shadow-[-18px_0_54px_rgba(15,23,42,0.18),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_2px_10px_rgba(15,23,42,0.06)]",
          // Left drawer
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0",
          "data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:sm:max-w-md",
          "data-[vaul-drawer-direction=left]:rounded-r-3xl data-[vaul-drawer-direction=left]:border-r",
          "data-[vaul-drawer-direction=left]:shadow-[18px_0_54px_rgba(15,23,42,0.18),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_2px_10px_rgba(15,23,42,0.06)]",
          className
        )}
        {...props}
      >
        {/* Drag handle for bottom drawer - styled as subtle capsule element */}
        <div
          className={cn(
            "mx-auto mt-4 hidden h-1.5 w-16 shrink-0 rounded-full",
            surface === "background" ? "bg-secondary/80" : "bg-background/80",
            "border border-border/50",
            "shadow-[0_1px_2px_rgba(15,23,42,0.10),inset_0_1px_0_rgba(255,255,255,0.85)]",
            "group-data-[vaul-drawer-direction=bottom]/drawer-content:block"
          )}
        />
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
        "flex flex-col gap-1.5 p-6",
        "group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center",
        "group-data-[vaul-drawer-direction=top]/drawer-content:text-center",
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
      className={cn(
        "mt-auto flex flex-col gap-3 p-6 pt-0",
        // Safe area padding for mobile devices
        "pb-[max(1.5rem,env(safe-area-inset-bottom))]",
        className
      )}
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
      className={cn(
        "text-lg font-semibold text-foreground tracking-tight",
        className
      )}
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
      className={cn("text-sm text-muted-foreground", className)}
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
