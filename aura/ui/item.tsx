import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/themes/aura/separator"

function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn("group/item-group flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn("my-1", className)}
      {...props}
    />
  )
}

const itemVariants = cva(
  "group/item flex items-center border text-sm transition-all duration-300 ease-out flex-wrap outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-transparent border-transparent hover:bg-accent/30",
        outline: "border-border/60 bg-card shadow-[var(--aura-shadow-card)] hover:shadow-[var(--aura-shadow-card-hover)] hover:border-primary/25",
        muted: "bg-secondary/30 border-transparent hover:bg-secondary/50",
        elevated: "bg-card border-border/60 shadow-[var(--aura-shadow-card)] hover:shadow-[var(--aura-shadow-card-hover)] hover:-translate-y-0.5 hover:border-primary/25",
      },
      size: {
        default: "py-3.5 px-5 gap-4 rounded-2xl",
        sm: "py-2.5 px-4 gap-3 rounded-xl",
        lg: "py-4 px-6 gap-5 rounded-2xl",
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
      role="listitem"
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    />
  )
}

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none group-has-[[data-slot=item-description]]/item:translate-y-0.5 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-transparent [&_svg:not([class*='size-'])]:size-5 text-muted-foreground",
        icon: "size-10 border border-border/60 rounded-xl bg-secondary/40 [&_svg:not([class*='size-'])]:size-5 text-primary shadow-sm",
        image:
          "size-12 rounded-xl overflow-hidden [&_img]:size-full [&_img]:object-cover shadow-sm",
        avatar: "size-10 rounded-full overflow-hidden [&_img]:size-full [&_img]:object-cover",
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
        "flex flex-1 flex-col gap-1.5 [&+[data-slot=item-content]]:flex-none",
        "group-data-[size=sm]/item:gap-0.5",
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
        "group-data-[size=sm]/item:text-[13px]",
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
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4 [&>a]:transition-colors",
        "group-data-[size=sm]/item:text-xs group-data-[size=sm]/item:leading-snug group-data-[size=sm]/item:line-clamp-1",
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
      className={cn("flex items-center gap-2 ml-auto", className)}
      {...props}
    />
  )
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        "flex basis-full items-center justify-between gap-3",
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
        "flex basis-full items-center justify-between gap-3 pt-2",
        className
      )}
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
}
