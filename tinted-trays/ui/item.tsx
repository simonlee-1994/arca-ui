import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/themes/tinted-trays/separator"

function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn("group/item-group flex flex-col", className)}
      {...props}
    />
  )
}

type ItemSeparatorProps = Omit<React.ComponentProps<typeof Separator>, "variant"> & {
  variant?: "default" | "subtle" | "tray"
}

function ItemSeparator({
  className,
  variant = "subtle",
  ...props
}: ItemSeparatorProps) {
  const resolvedVariant =
    variant === "subtle" ? "muted" : variant === "tray" ? "onTray" : "default"

  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      variant={resolvedVariant}
      className={cn("my-0", className)}
      {...props}
    />
  )
}

const itemVariants = cva(
  "group/item flex items-center text-sm transition-all duration-200 flex-wrap outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
  {
    variants: {
      variant: {
        default:
          "bg-tray rounded-2xl border border-border/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_6px_rgba(15,23,42,0.04)] hover:border-primary/30 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_3px_10px_rgba(15,23,42,0.07)] [a]:hover:bg-transparent",
        capsule:
          "bg-background rounded-2xl border border-border/60 shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)] hover:border-primary/40 hover:shadow-[0_2px_10px_rgba(15,23,42,0.10),inset_0_1px_0_rgba(255,255,255,0.9)] [a]:hover:bg-transparent",
        tray:
          "bg-tray rounded-2xl border border-border/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_1px_4px_rgba(15,23,42,0.03)] hover:border-primary/25 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_2px_8px_rgba(15,23,42,0.06)] [a]:hover:bg-transparent",
        ghost:
          "bg-transparent rounded-2xl border border-transparent hover:bg-tray/60 [a]:hover:bg-transparent",
        outline:
          "bg-transparent rounded-2xl border border-border/60 hover:border-primary/40 hover:bg-tray/40 [a]:hover:bg-transparent",
      },
      size: {
        default: "p-4 gap-4",
        sm: "py-3 px-4 gap-3",
        lg: "p-5 gap-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Item({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof itemVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    />
  )
}

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none group-has-[[data-slot=item-description]]/item:translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-transparent [&_svg:not([class*='size-'])]:size-5",
        icon: "size-10 rounded-xl border border-border/60 bg-background/70 shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)] [&_svg:not([class*='size-'])]:size-5",
        avatar:
          "size-10 rounded-full bg-primary text-primary-foreground font-medium [&_svg:not([class*='size-'])]:size-5",
        image:
          "size-12 rounded-xl overflow-hidden border border-border/60 [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        "flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none",
        className
      )}
      {...props}
    />
  )
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium text-foreground",
        className
      )}
      {...props}
    />
  )
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "text-muted-foreground line-clamp-2 text-sm leading-relaxed font-normal",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        "flex basis-full items-center justify-between gap-2 pt-2 mt-2 border-t border-border/50",
        className
      )}
      {...props}
    />
  )
}

const itemBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary",
        secondary: "bg-secondary text-secondary-foreground",
        success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
        destructive: "bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function ItemBadge({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof itemBadgeVariants>) {
  return (
    <span
      data-slot="item-badge"
      data-variant={variant}
      className={cn(itemBadgeVariants({ variant, className }))}
      {...props}
    />
  )
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
  ItemBadge,
}
