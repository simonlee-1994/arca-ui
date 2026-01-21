"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { cva, type VariantProps } from "class-variance-authority"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const menubarVariants = cva(
  "bg-card flex h-10 items-center gap-1 rounded-[20px] border border-paper-edge p-1",
  {
    variants: {
      variant: {
        elevated:
          "shadow-paper-md transition-all duration-paper ease-paper hover:-translate-x-[var(--paper-lift-md)] hover:-translate-y-[var(--paper-lift-md)] hover:shadow-paper-lg",
        section:
          "shadow-paper-sm transition-shadow duration-paper ease-paper",
        flat: "bg-secondary/60 shadow-none",
      },
    },
    defaultVariants: {
      variant: "section",
    },
  }
)

const menubarContentVariants = cva(
  [
    "bg-card text-foreground z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-[20px] border border-paper-edge p-2",
    "data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  ],
  {
    variants: {
      shadow: {
        default: "shadow-paper-sm",
        elevated: "shadow-paper-md",
      },
    },
    defaultVariants: {
      shadow: "default",
    },
  }
)

const menubarSubContentVariants = cva(
  [
    "bg-card text-foreground z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-[20px] border border-paper-edge p-2",
    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  ],
  {
    variants: {
      shadow: {
        default: "shadow-paper-sm",
        elevated: "shadow-paper-md",
      },
    },
    defaultVariants: {
      shadow: "default",
    },
  }
)

function Menubar({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Root> &
  VariantProps<typeof menubarVariants>) {
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      className={cn(
        menubarVariants({ variant }),
        className
      )}
      {...props}
    />
  )
}

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return (
    <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
  )
}

function MenubarTrigger({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger> & {
  variant?: "default" | "filled" | "pill" | "underline"
}) {
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      data-variant={variant}
      className={cn(
        "flex h-8 items-center px-3 text-sm font-semibold outline-none select-none transition-all duration-paper ease-paper",
        // Default variant
        variant === "default" && [
          "rounded-[14px]",
          "hover:bg-secondary hover:text-secondary-foreground",
          "focus:bg-secondary focus:text-secondary-foreground",
          "data-[state=open]:bg-secondary data-[state=open]:text-secondary-foreground",
        ],
        // Filled variant - always has background
        variant === "filled" && [
          "rounded-[14px] bg-secondary/50",
          "hover:bg-secondary hover:text-secondary-foreground",
          "focus:bg-secondary focus:text-secondary-foreground",
          "data-[state=open]:bg-primary data-[state=open]:text-primary-foreground",
        ],
        // Pill variant - with border and shadow on active
        variant === "pill" && [
          "rounded-full border border-transparent",
          "hover:border-paper-edge hover:bg-secondary/60",
          "focus:border-paper-edge focus:bg-secondary/60",
          "data-[state=open]:border-paper-edge data-[state=open]:bg-secondary data-[state=open]:text-secondary-foreground",
        ],
        // Underline variant
        variant === "underline" && [
          "rounded-none border-b-2 border-transparent",
          "hover:border-muted-foreground/30",
          "focus:border-muted-foreground/30",
          "data-[state=open]:border-primary data-[state=open]:text-primary",
        ],
        className
      )}
      {...props}
    />
  )
}

function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  shadow,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Content> &
  VariantProps<typeof menubarContentVariants>) {
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          menubarContentVariants({ shadow }),
          className
        )}
        {...props}
      />
    </MenubarPortal>
  )
}

function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-[12px] px-3 py-2 text-sm outline-none select-none transition-all duration-200 ease-[cubic-bezier(0.25,0.8,0.25,1)]",
        "hover:bg-secondary hover:text-secondary-foreground",
        "focus:bg-secondary focus:text-secondary-foreground",
        "data-[variant=destructive]:text-destructive data-[variant=destructive]:hover:bg-destructive/10 data-[variant=destructive]:focus:bg-destructive/10",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "data-[inset]:pl-8",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function MenubarCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-[12px] py-2 pr-3 pl-8 text-sm outline-none select-none transition-all duration-200 ease-[cubic-bezier(0.25,0.8,0.25,1)]",
        "hover:bg-secondary hover:text-secondary-foreground",
        "focus:bg-secondary focus:text-secondary-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-4 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
}

function MenubarRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-[12px] py-2 pr-3 pl-8 text-sm outline-none select-none transition-all duration-200 ease-[cubic-bezier(0.25,0.8,0.25,1)]",
        "hover:bg-secondary hover:text-secondary-foreground",
        "focus:bg-secondary focus:text-secondary-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-4 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
}

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
      data-inset={inset}
      className={cn(
        "px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      className={cn("bg-paper-edge -mx-2 my-2 h-px", className)}
      {...props}
    />
  )
}

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center rounded-[12px] px-3 py-2 text-sm outline-none select-none transition-all duration-200 ease-[cubic-bezier(0.25,0.8,0.25,1)]",
        "hover:bg-secondary hover:text-secondary-foreground",
        "focus:bg-secondary focus:text-secondary-foreground",
        "data-[state=open]:bg-secondary data-[state=open]:text-secondary-foreground",
        "data-[inset]:pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
  )
}

function MenubarSubContent({
  className,
  shadow,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent> &
  VariantProps<typeof menubarSubContentVariants>) {
  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      className={cn(
        menubarSubContentVariants({ shadow }),
        className
      )}
      {...props}
    />
  )
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
}
