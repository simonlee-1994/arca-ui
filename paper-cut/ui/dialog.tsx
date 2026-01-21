"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/themes/paper-cut/scroll-area"

/**
 * Dialog Elevation System (3 Levels):
 * - elevated: Strong shadow (hero announcements, important dialogs)
 * - default:  Medium shadow (general dialogs) - DEFAULT
 * - outlined: Border only (dense layouts)
 *
 * Note: Dialog is a modal overlay, so "flat" doesn't apply.
 */
const dialogContentVariants = cva(
  "bg-card border border-paper-edge rounded-[24px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-6 p-8 duration-paper ease-paper sm:max-w-lg",
  {
    variants: {
      elevation: {
        elevated: "shadow-paper-md",
        default: "shadow-paper-sm",
        outlined: "shadow-none",
      },
    },
    defaultVariants: {
      elevation: "default",
    },
  }
)

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

type OverlayVariant = "default" | "blur" | "dark" | "light" | "none"

function DialogOverlay({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay> & {
  variant?: OverlayVariant
}) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50",
        variant === "default" && "bg-black/30 backdrop-blur-sm",
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

function DialogContent({
  className,
  children,
  showCloseButton = true,
  overlayVariant = "default",
  elevation,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
  overlayVariant?: OverlayVariant
} & VariantProps<typeof dialogContentVariants>) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay variant={overlayVariant} />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        data-elevation={elevation ?? "default"}
        className={cn(dialogContentVariants({ elevation }), className)}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="absolute top-4 right-4 flex items-center justify-center size-8 rounded-full bg-secondary/60 border border-paper-edge shadow-none transition-all duration-paper ease-paper opacity-70 hover:opacity-100 hover:bg-secondary focus:outline-hidden focus:ring-ring/50 focus:ring-[3px] disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon className="size-4 text-muted-foreground" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollArea>) {
  return (
    <ScrollArea
      data-slot="dialog-scroll-area"
      className={cn("max-h-[60vh]", className)}
      {...props}
    >
      {children}
    </ScrollArea>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-3 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-bold", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogScrollArea,
  DialogTitle,
  DialogTrigger,
  dialogContentVariants,
}
