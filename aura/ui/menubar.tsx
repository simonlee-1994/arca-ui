"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const menubarVariants = cva(
  "flex h-11 items-center gap-1 rounded-2xl p-1.5 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-card border border-border/60 shadow-sm",
        filled: "bg-secondary/60 border border-transparent",
        soft: "bg-accent/30 border border-transparent",
        pills: "bg-transparent border border-transparent",
        ghost: "bg-transparent border border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const MenubarContext = React.createContext<{
  variant?: "default" | "filled" | "soft" | "pills" | "ghost"
}>({})

function Menubar({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Root> & VariantProps<typeof menubarVariants>) {
  return (
    <MenubarContext.Provider value={{ variant: variant ?? "default" }}>
      <MenubarPrimitive.Root
        data-slot="menubar"
        data-variant={variant}
        className={cn(menubarVariants({ variant }), className)}
        {...props}
      />
    </MenubarContext.Provider>
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

const menubarTriggerVariants = cva(
  [
    "flex items-center rounded-xl px-3 py-1.5 text-sm font-medium outline-none select-none",
    "transition-all duration-200",
  ],
  {
    variants: {
      variant: {
        default: [
          "hover:bg-accent/60 hover:text-accent-foreground",
          "focus:bg-accent/60 focus:text-accent-foreground",
          "data-[state=open]:bg-primary/10 data-[state=open]:text-primary",
        ],
        filled: [
          "bg-background/60 shadow-sm",
          "hover:bg-background hover:shadow-md",
          "focus:bg-background focus:shadow-md",
          "data-[state=open]:bg-background data-[state=open]:shadow-md data-[state=open]:text-primary",
        ],
        soft: [
          "bg-background/50",
          "hover:bg-background/80 hover:text-accent-foreground",
          "focus:bg-background/80 focus:text-accent-foreground",
          "data-[state=open]:bg-primary/10 data-[state=open]:text-primary",
        ],
        pills: [
          "bg-secondary/70 border border-border/50 shadow-sm",
          "hover:bg-secondary hover:border-border/60 hover:shadow-md hover:-translate-y-0.5",
          "focus:bg-secondary focus:border-border/60 focus:shadow-md",
          "data-[state=open]:bg-secondary data-[state=open]:border-primary/30 data-[state=open]:text-primary data-[state=open]:shadow-md",
        ],
        ghost: [
          "hover:bg-accent/60 hover:text-accent-foreground",
          "focus:bg-accent/60 focus:text-accent-foreground",
          "data-[state=open]:bg-accent/80 data-[state=open]:text-accent-foreground",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  const { variant } = React.useContext(MenubarContext)
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(menubarTriggerVariants({ variant }), className)}
      {...props}
    />
  )
}

function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-xl border border-border/60 p-1.5 shadow-[var(--aura-shadow-float)]",
          "data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
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
        "relative flex cursor-default items-center gap-2 rounded-lg px-2.5 py-2 text-sm outline-none select-none",
        "transition-colors duration-200",
        "[&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "focus:bg-accent/60 focus:text-accent-foreground",
        "data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "data-[inset]:pl-8",
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
        "relative flex cursor-default items-center gap-2 rounded-lg py-2 pr-2.5 pl-8 text-sm outline-none select-none",
        "transition-colors duration-200",
        "focus:bg-accent/60 focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2.5 flex size-4 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon className="size-4 text-primary" />
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
        "relative flex cursor-default items-center gap-2 rounded-lg py-2 pr-2.5 pl-8 text-sm outline-none select-none",
        "transition-colors duration-200",
        "focus:bg-accent/60 focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2.5 flex size-4 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-primary text-primary" />
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
        "px-2.5 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
        "data-[inset]:pl-8",
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
      className={cn("bg-border/60 -mx-1.5 my-1.5 h-px", className)}
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
        "text-muted-foreground ml-auto text-xs tracking-widest opacity-70",
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
        "flex cursor-default items-center rounded-lg px-2.5 py-2 text-sm outline-none select-none",
        "transition-colors duration-200",
        "focus:bg-accent/60 focus:text-accent-foreground",
        "data-[state=open]:bg-accent/60 data-[state=open]:text-accent-foreground",
        "data-[inset]:pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4 text-muted-foreground" />
    </MenubarPrimitive.SubTrigger>
  )
}

function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      className={cn(
        "bg-popover text-popover-foreground z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-xl border border-border/60 p-1.5 shadow-[var(--aura-shadow-float)]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
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
