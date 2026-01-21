"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

type DrawerDirection = "top" | "bottom" | "left" | "right"

type DrawerProps = React.ComponentProps<typeof DrawerPrimitive.Root> & {
  direction?: DrawerDirection
  children?: React.ReactNode
}

const DrawerContext = React.createContext<{ direction: DrawerDirection }>({ direction: "right" })

const Drawer = ({
  shouldScaleBackground = true,
  direction = "right",
  ...props
}: DrawerProps) => (
  <DrawerContext.Provider value={{ direction }}>
    <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} direction={direction} {...props} />
  </DrawerContext.Provider>
)
Drawer.displayName = "Drawer"

const DrawerTrigger = DrawerPrimitive.Trigger
const DrawerPortal = DrawerPrimitive.Portal
const DrawerClose = DrawerPrimitive.Close

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      className={cn("fixed inset-0 z-50 bg-black/40", className)}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  const { direction } = React.useContext(DrawerContext)

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        className={cn(
          "fixed z-50 flex flex-col bg-background shadow-clarity-xl",
          // Clarity: radius-surface (32px) for main containers
          direction === "bottom" && "inset-x-0 bottom-0 mt-24 h-auto max-h-[96dvh] radius-t-surface",
          direction === "top" && "inset-x-0 top-0 mb-24 h-auto max-h-[96dvh] radius-b-surface",
          direction === "left" && "inset-y-0 left-0 mr-24 h-full w-[85%] max-w-sm radius-r-surface",
          direction === "right" && "inset-y-0 right-0 ml-24 h-full w-[85%] max-w-sm radius-l-surface",
          className
        )}
        {...props}
      >
        {/* Handle bar - Clarity style: subtle, rounded-full */}
        {(direction === "bottom" || direction === "top") && (
          <div className={cn(
            "mx-auto h-1.5 w-12 rounded-full bg-muted-foreground/20",
            direction === "bottom" && "mt-4",
            direction === "top" && "mb-4 mt-auto order-last"
          )} />
        )}
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)} {...props} />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      className={cn("text-lg font-semibold leading-none tracking-tight text-foreground", className)}
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
