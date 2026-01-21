"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full border border-foreground transition-all",
  {
    variants: {
      size: {
        default: "size-10",
        sm: "size-8",
        lg: "size-14",
        xl: "size-20",
      },
      hover: {
        orbit: "orbit-hover-offset-sm",
        scale: "hover:scale-110 hover:!z-50",
        none: "",
      },
    },
    defaultVariants: {
      size: "default",
      hover: "orbit",
    },
  }
)

function Avatar({
  className,
  size,
  hover,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ size, hover }), className)}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-secondary flex size-full items-center justify-center rounded-full text-sm font-semibold text-foreground font-heading",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
