"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

const selectTriggerVariants = cva(
  [
    "group inline-flex w-fit items-center justify-between gap-2 whitespace-nowrap",
    "border font-medium",
    "outline-none transition-all duration-paper ease-paper",
    "data-[placeholder]:text-muted-foreground",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "focus-visible:ring-[3px] focus-visible:ring-ring/50",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
    "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      size: {
        default: "h-9 rounded-[16px] px-3.5 py-1.5 text-sm",
        sm: "h-8 rounded-[14px] px-3 py-1 text-xs",
        lg: "h-11 rounded-[20px] px-4 py-2 text-sm",
      },
      variant: {
        default:
          "bg-card text-foreground border-paper-edge hover:bg-accent data-[state=open]:bg-accent",
        primary:
          "bg-foreground text-background border-foreground hover:bg-foreground/90 data-[state=open]:bg-foreground/90",
        secondary:
          "bg-secondary/60 text-foreground border-paper-edge hover:bg-secondary data-[state=open]:bg-secondary",
        outline:
          "bg-transparent text-foreground border-foreground hover:bg-secondary/60 data-[state=open]:bg-secondary/60",
        ghost:
          "bg-transparent text-foreground border-transparent hover:bg-secondary/60 hover:border-paper-edge",
      },
      elevation: {
        inset: "shadow-paper-none",
        section: "shadow-paper-sm",
        elevated:
          "shadow-paper-md hover:shadow-paper-lg hover:-translate-x-[var(--paper-lift-md)] hover:-translate-y-[var(--paper-lift-md)] active:translate-x-[var(--paper-lift-md)] active:translate-y-[var(--paper-lift-md)] active:shadow-paper-pressed",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
      elevation: "section",
    },
  }
)

const selectContentVariants = cva(
  "bg-popover text-popover-foreground border border-paper-edge rounded-[24px] outline-hidden",
  {
    variants: {
      shadow: {
        sm: "shadow-paper-sm",
        md: "shadow-paper-md",
      },
    },
    defaultVariants: {
      shadow: "sm",
    },
  }
)

function SelectTrigger({
  className,
  size,
  variant,
  elevation,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> &
  VariantProps<typeof selectTriggerVariants>) {
  const resolvedSize = size ?? "default"
  const resolvedVariant = variant ?? "default"
  const resolvedElevation =
    elevation ??
    (resolvedVariant === "secondary" || resolvedVariant === "ghost"
      ? "inset"
      : "section")

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={resolvedSize}
      data-variant={resolvedVariant}
      className={cn(
        selectTriggerVariants({
          size: resolvedSize,
          variant: resolvedVariant,
          elevation: resolvedElevation,
        }),
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className={cn(
          "ml-1 transition-transform duration-paper ease-paper",
          resolvedSize === "sm" ? "size-3.5" : "size-4",
          resolvedVariant === "primary"
            ? "text-background"
            : "text-muted-foreground group-hover:text-foreground group-data-[state=open]:text-foreground",
          "group-data-[state=open]:rotate-180"
        )} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  shadow,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content> &
  VariantProps<typeof selectContentVariants>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          selectContentVariants({ shadow }),
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1.5",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-3 py-2 text-xs font-semibold uppercase tracking-wide", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-pointer items-center gap-2 rounded-[12px] py-2 pr-8 pl-3 text-sm font-medium outline-hidden select-none",
        "transition-colors duration-150 ease-[cubic-bezier(0.25,0.8,0.25,1)]",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground data-[state=checked]:font-semibold",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        "*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute right-2.5 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-3.5 text-foreground" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-paper-edge pointer-events-none -mx-1 my-2 h-px", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1.5",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4 text-muted-foreground" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1.5",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4 text-muted-foreground" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
