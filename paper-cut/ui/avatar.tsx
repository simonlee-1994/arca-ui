"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Avatar Elevation System (3 Levels):
 * - default:  Shadow at rest, lifts on hover (standalone profile heroes)
 * - outlined: Border at rest, subtle lift on hover (most common use)
 * - flat:     No shadow at rest, subtle lift on hover (nested inside containers) - DEFAULT
 *
 * Note: Avatar is a small component, so "elevated" (strong shadow + lift) is not available.
 */
const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden border border-paper-edge transition-all duration-paper ease-paper",
  {
    variants: {
      variant: {
        flat: "shadow-none",
        outlined: "shadow-none",
        default: "shadow-paper-sm",
      },
      size: {
        sm: "size-8 rounded-[12px]",
        default: "size-10 rounded-[14px]",
        lg: "size-14 rounded-[18px]",
        xl: "size-20 rounded-[24px]",
      },
      lift: {
        on: "",
        off: "",
      },
    },
    compoundVariants: [
      {
        variant: "flat",
        lift: "on",
        className:
          "hover:-translate-x-[var(--paper-lift-sm)] hover:-translate-y-[var(--paper-lift-sm)] hover:shadow-paper-sm hover:z-10 group-hover/avatar:-translate-x-[var(--paper-lift-sm)] group-hover/avatar:-translate-y-[var(--paper-lift-sm)] group-hover/avatar:shadow-paper-sm group-hover/avatar:z-10",
      },
      {
        variant: "outlined",
        lift: "on",
        className:
          "hover:-translate-x-[var(--paper-lift-sm)] hover:-translate-y-[var(--paper-lift-sm)] hover:shadow-paper-sm hover:z-10 group-hover/avatar:-translate-x-[var(--paper-lift-sm)] group-hover/avatar:-translate-y-[var(--paper-lift-sm)] group-hover/avatar:shadow-paper-sm group-hover/avatar:z-10",
      },
      {
        variant: "default",
        lift: "on",
        className:
          "hover:-translate-x-[var(--paper-lift-sm)] hover:-translate-y-[var(--paper-lift-sm)] hover:shadow-paper-md hover:z-10 group-hover/avatar:-translate-x-[var(--paper-lift-sm)] group-hover/avatar:-translate-y-[var(--paper-lift-sm)] group-hover/avatar:shadow-paper-md group-hover/avatar:z-10",
      },
    ],
    defaultVariants: {
      variant: "flat",
      size: "default",
      lift: "on",
    },
  }
)

function Avatar({
  className,
  variant,
  size,
  lift,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> &
  Omit<VariantProps<typeof avatarVariants>, "lift"> & { lift?: boolean }) {
  const resolvedVariant = variant ?? "flat"
  const resolvedLift = lift ?? true
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-variant={resolvedVariant}
      data-lift={resolvedLift ? "on" : "off"}
      className={cn(
        avatarVariants({
          variant: resolvedVariant,
          size,
          lift: resolvedLift ? "on" : "off",
        }),
        className
      )}
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
        "bg-secondary text-secondary-foreground flex size-full items-center justify-center font-semibold",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
