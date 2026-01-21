import * as React from "react"

import { cn } from "@/lib/utils"

function Item({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item"
      className={cn(
        "flex items-center gap-4 radius-panel px-3 py-2.5 text-sm transition-colors duration-200",
        "hover:bg-background-subtle",
        "cursor-pointer",
        className
      )}
      {...props}
    />
  )
}

function ItemIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-icon"
      className={cn("shrink-0 text-muted-foreground [&>svg]:size-4", className)}
      {...props}
    />
  )
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn("flex-1 min-w-0", className)}
      {...props}
    />
  )
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn("font-medium truncate", className)}
      {...props}
    />
  )
}

function ItemDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-description"
      className={cn("text-xs text-muted-foreground truncate", className)}
      {...props}
    />
  )
}

function ItemAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-action"
      className={cn("shrink-0", className)}
      {...props}
    />
  )
}

export { Item, ItemIcon, ItemContent, ItemTitle, ItemDescription, ItemAction }
