"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { cva, type VariantProps } from "class-variance-authority"
import { SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/themes/tinted-trays/dialog"
import { ScrollArea } from "@/components/themes/tinted-trays/scroll-area"

const commandVariants = cva(
  [
    "flex h-full w-full flex-col overflow-hidden",
    "text-foreground",
  ],
  {
    variants: {
      surface: {
        tray: "bg-tray",
        background: "bg-background",
      },
      rim: {
        none: "rounded-2xl",
        strong: [
          "rounded-3xl border border-border/40",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_2px_10px_rgba(15,23,42,0.06)]",
        ],
        default: [
          "rounded-2xl border border-border/50",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_6px_rgba(15,23,42,0.04)]",
        ],
        subtle: [
          "rounded-2xl border border-border/60",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_1px_4px_rgba(15,23,42,0.03)]",
        ],
      },
    },
    defaultVariants: {
      surface: "tray",
      rim: "default",
    },
  }
)

// Context to pass surface variant to children
const CommandContext = React.createContext<{ surface: "tray" | "background" }>({ surface: "tray" })

function Command({
  className,
  surface = "tray",
  rim,
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive> &
  VariantProps<typeof commandVariants>) {
  return (
    <CommandContext.Provider value={{ surface: surface || "tray" }}>
      <CommandPrimitive
        data-slot="command"
        className={cn(
          commandVariants({ surface, rim }),
          className
        )}
        {...props}
      >
        {children}
      </CommandPrimitive>
    </CommandContext.Provider>
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn("overflow-hidden p-0 rounded-3xl", className)}
        showCloseButton={false}
      >
        <Command
          rim="none"
          className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
        >
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  const { surface } = React.useContext(CommandContext)

  // When surface is background (white), use a subtle muted color for input wrapper
  // When surface is tray, use capsule/white color for input wrapper
  const inputBgClass = surface === "background" ? "bg-muted/50" : "bg-capsule/60"

  return (
    <div
      data-slot="command-input-wrapper"
      className={cn("flex h-12 items-center gap-3 border-b border-border/40 px-4", inputBgClass)}
    >
      <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden",
          "placeholder:text-muted-foreground",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "max-h-[300px] overflow-y-auto overflow-x-hidden p-2",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn(
        "py-6 text-center text-sm text-muted-foreground",
        "mx-2 mb-2 rounded-xl bg-capsule/60 border border-border/40 px-4",
        className
      )}
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "text-foreground overflow-hidden p-1",
        "[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("bg-border/50 -mx-1 my-2 h-px", className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 px-3 py-2 text-sm outline-hidden select-none",
        "rounded-xl",
        "border border-transparent",
        "transition-colors duration-200",
        "hover:bg-capsule/60",
        "data-[selected=true]:bg-capsule data-[selected=true]:border-border/60",
        "data-[selected=true]:shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        "[&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        "bg-tray px-1.5 py-0.5 rounded-md",
        "border border-border/60",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
