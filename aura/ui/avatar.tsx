"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden transition-all duration-300",
  {
    variants: {
      size: {
        xs: "size-6 text-[10px]",
        sm: "size-8 text-xs",
        default: "size-10 text-sm",
        lg: "size-12 text-base",
        xl: "size-16 text-lg",
        "2xl": "size-20 text-xl",
      },
      shape: {
        circle: "rounded-full",
        rounded: "rounded-2xl",
      },
    },
    defaultVariants: {
      size: "default",
      shape: "circle",
    },
  }
)

function Avatar({
  className,
  size,
  shape,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ size, shape }), className)}
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
        "bg-secondary text-secondary-foreground flex size-full items-center justify-center font-medium",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback, avatarVariants }
