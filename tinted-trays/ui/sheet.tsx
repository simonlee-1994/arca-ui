"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        // Tinted Trays: Subtle overlay with slight blur for depth
        "fixed inset-0 z-50 bg-background/60 backdrop-blur-sm",
        // Animations
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  hideCloseButton = false,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
  hideCloseButton?: boolean
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          // Tinted Trays: Sheet as a large tray sliding in - cold shadows
          "bg-tray fixed z-50 flex flex-col",
          "shadow-[0_18px_60px_rgba(15,23,42,0.18),inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_10px_rgba(15,23,42,0.06)]",
          // Animations
          "transition-transform ease-out duration-300",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:duration-200 data-[state=open]:duration-300",
          // Side-specific styles
          side === "right" && [
            "inset-y-0 right-0 h-full w-3/4 sm:max-w-md",
            "border-l border-border/40",
            "rounded-l-3xl",
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
          ],
          side === "left" && [
            "inset-y-0 left-0 h-full w-3/4 sm:max-w-md",
            "border-r border-border/40",
            "rounded-r-3xl",
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
          ],
          side === "top" && [
            "inset-x-0 top-0 h-auto max-h-[80vh]",
            "border-b border-border/40",
            "rounded-b-3xl",
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
          ],
          side === "bottom" && [
            "inset-x-0 bottom-0 h-auto max-h-[80vh]",
            "border-t border-border/40",
            "rounded-t-3xl",
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
          ],
          className
        )}
        {...props}
      >
        {children}
        {!hideCloseButton && (
          <SheetPrimitive.Close
            className={cn(
              // Tinted Trays: Close button as a small capsule with cold shadows
              "absolute top-4 right-4 rounded-xl p-2",
              "bg-secondary/50 hover:bg-secondary",
              "border border-border/40",
              "shadow-[0_1px_2px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.85)]",
              "text-muted-foreground hover:text-foreground",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/30",
              "disabled:pointer-events-none"
            )}
          >
            <XIcon className="size-4" />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        // Tinted Trays: Header section with padding
        "flex flex-col gap-2 p-6 pb-4",
        className
      )}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        // Tinted Trays: Footer with top border as tray divider
        "mt-auto flex flex-col-reverse gap-3 p-6 pt-4",
        "border-t border-border/40",
        "sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "text-lg font-semibold text-foreground tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function SheetBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-body"
      className={cn(
        // Tinted Trays: Scrollable body area
        "flex-1 overflow-auto px-6 py-4",
        className
      )}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetBody,
}
