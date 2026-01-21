"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const avatarVariants = cva(
  [
    "relative flex shrink-0 overflow-hidden",
    "transition-all duration-200",
  ],
  {
    variants: {
      variant: {
        default: [
          "rounded-full bg-capsule border border-border/60",
          "shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]",
        ],
        capsule: [
          "rounded-2xl bg-capsule border border-border/60",
          "shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]",
        ],
        tray: [
          "rounded-full bg-tray border border-border/40",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_8px_rgba(15,23,42,0.06)]",
        ],
      },
      size: {
        xs: "size-6",
        sm: "size-8",
        default: "size-10",
        lg: "size-12",
        xl: "size-16",
        "2xl": "size-24",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Avatar({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ variant, size }), className)}
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
        "bg-tray text-tray-foreground flex size-full items-center justify-center font-medium",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback, avatarVariants }
