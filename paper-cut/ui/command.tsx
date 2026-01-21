"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { cva, type VariantProps } from "class-variance-authority"
import { SearchIcon } from "lucide-react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/themes/paper-cut/dialog"
import { ScrollBar } from "@/components/themes/paper-cut/scroll-area"

const commandVariants = cva(
  "text-foreground flex h-full w-full flex-col overflow-hidden",
  {
    variants: {
      variant: {
        elevated:
          "bg-card rounded-[24px] border border-paper-edge shadow-paper-md",
        default:
          "bg-card rounded-[24px] border border-paper-edge shadow-paper-sm",
        outlined:
          "bg-card rounded-[24px] border border-paper-edge shadow-none",
        embedded:
          "bg-transparent rounded-none border-0 shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Command({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof CommandPrimitive> &
  VariantProps<typeof commandVariants>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        commandVariants({ variant }),
        className
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) {
  return (
    <Dialog {...props}>
      <DialogContent
        className={cn("overflow-hidden p-0", className)}
        showCloseButton={showCloseButton}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Command
          variant="embedded"
          className="[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
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
  return (
    <div
      data-slot="command-input-wrapper"
      className="flex h-14 items-center gap-3 border-b border-paper-edge px-4"
    >
      <div className="flex items-center justify-center size-9 shrink-0 rounded-full bg-secondary/60 border border-paper-edge">
        <SearchIcon className="size-5 text-muted-foreground" />
      </div>
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "placeholder:text-muted-foreground flex h-10 w-full bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CommandList({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="command-list-scroll-area"
      className="relative overflow-hidden"
      type="hover"
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="command-list-viewport"
        className="max-h-[300px] rounded-[inherit] outline-none scroll-py-1"
      >
        <CommandPrimitive.List
          data-slot="command-list"
          className={cn("overflow-x-hidden p-2", className)}
          {...props}
        >
          {children}
        </CommandPrimitive.List>
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner
        data-slot="command-list-corner"
        className="bg-transparent"
      />
    </ScrollAreaPrimitive.Root>
  )
}

function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-sm text-muted-foreground"
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
        "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden py-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold",
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
      className={cn("bg-paper-edge -mx-1 my-2 h-px", className)}
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
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-3 rounded-[16px] px-3 py-2.5 text-sm outline-hidden select-none transition-all duration-150 ease-[cubic-bezier(0.25,0.8,0.25,1)] data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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
        "ml-auto text-xs tracking-widest bg-secondary border border-paper-edge rounded-[8px] px-2 py-0.5 text-muted-foreground",
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
