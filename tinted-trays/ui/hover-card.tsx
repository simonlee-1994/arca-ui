"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
}

function HoverCardTrigger({
  className,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger
      data-slot="hover-card-trigger"
      className={cn(
        "cursor-pointer rounded-xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        className
      )}
      {...props}
    />
  )
}

const hoverCardContentVariants = cva(
  "z-50 origin-(--radix-hover-card-content-transform-origin) outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        default:
          "w-72 rounded-2xl bg-popover border border-border/60 p-4 text-popover-foreground shadow-[0_4px_12px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.85)]",
        capsule:
          "w-72 rounded-xl bg-popover border border-border/60 p-4 text-popover-foreground shadow-[0_1px_2px_rgba(15,23,42,0.04),inset_0_1px_0_rgba(255,255,255,0.85)]",
        tray:
          "w-80 rounded-3xl bg-tray border border-border/40 p-5 text-tray-foreground shadow-[0_8px_24px_rgba(15,23,42,0.10),inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_8px_rgba(15,23,42,0.06)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 8,
  variant = "default",
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content> &
  VariantProps<typeof hoverCardContentVariants>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        data-variant={variant}
        align={align}
        sideOffset={sideOffset}
        className={cn(hoverCardContentVariants({ variant }), className)}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  )
}

function HoverCardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="hover-card-header"
      className={cn("flex items-center gap-3 mb-3", className)}
      {...props}
    />
  )
}

function HoverCardAvatar({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="hover-card-avatar"
      className={cn(
        "size-12 rounded-xl bg-secondary flex items-center justify-center overflow-hidden shrink-0 [&>img]:size-full [&>img]:object-cover",
        className
      )}
      {...props}
    />
  )
}

function HoverCardTitle({
  className,
  ...props
}: React.ComponentProps<"h4">) {
  return (
    <h4
      data-slot="hover-card-title"
      className={cn("text-sm font-semibold text-foreground", className)}
      {...props}
    />
  )
}

function HoverCardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="hover-card-description"
      className={cn("text-sm text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  )
}

function HoverCardFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="hover-card-footer"
      className={cn(
        "flex items-center gap-4 mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  HoverCardHeader,
  HoverCardAvatar,
  HoverCardTitle,
  HoverCardDescription,
  HoverCardFooter,
}
