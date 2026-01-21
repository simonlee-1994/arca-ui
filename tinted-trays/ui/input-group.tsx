"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/themes/tinted-trays/button"
import { Input } from "@/components/themes/tinted-trays/input"
import { Textarea } from "@/components/themes/tinted-trays/textarea"

const inputGroupVariants = cva(
  "group/input-group relative flex w-full items-center transition-all duration-200 outline-none",
  {
    variants: {
      variant: {
        default:
          "h-8 min-w-0 rounded-xl border border-border/60 bg-capsule shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)] has-[>textarea]:h-auto hover:border-border/80 hover:bg-secondary/30 has-[[data-slot=input-group-control]:focus-visible]:border-primary/50 has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-primary/20",
        capsule:
          "h-8 min-w-0 rounded-full border border-border/60 bg-capsule shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)] has-[>textarea]:h-auto hover:border-border/80 hover:bg-secondary/30 has-[[data-slot=input-group-control]:focus-visible]:border-primary/50 has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-primary/20",
        tray:
          "h-10 min-w-0 rounded-xl border border-border/40 bg-tray shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_8px_rgba(15,23,42,0.06)] has-[>textarea]:h-auto hover:border-border/60 has-[[data-slot=input-group-control]:focus-visible]:border-primary/40 has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-primary/25",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function InputGroup({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupVariants>) {
  return (
    <div
      data-slot="input-group"
      data-variant={variant}
      role="group"
      className={cn(
        inputGroupVariants({ variant }),
        // Variants based on alignment.
        "has-[>[data-align=inline-start]]:[&>input]:pl-2",
        "has-[>[data-align=inline-end]]:[&>input]:pr-2",
        "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3",
        // Error state.
        "has-[[data-slot][aria-invalid=true]]:border-destructive/60 has-[[data-slot][aria-invalid=true]]:ring-destructive/20",
        className
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "text-muted-foreground flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none [&>svg:not([class*='size-'])]:size-4 [&>kbd]:rounded-lg group-data-[disabled=true]/input-group:opacity-50",
  {
    variants: {
      align: {
        "inline-start":
          "order-first pl-4 has-[>button]:ml-[-0.5rem] has-[>kbd]:ml-[-0.35rem]",
        "inline-end":
          "order-last pr-4 has-[>button]:mr-[-0.5rem] has-[>kbd]:mr-[-0.35rem]",
        "block-start":
          "order-first w-full justify-start px-4 pt-3 [.border-b]:pb-3 group-has-[>input]/input-group:pt-2.5",
        "block-end":
          "order-last w-full justify-start px-4 pb-3 [.border-t]:pt-3 group-has-[>input]/input-group:pb-2.5",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva(
  "text-sm shadow-none flex gap-2 items-center transition-all duration-200",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 px-2.5 rounded-lg [&>svg:not([class*='size-'])]:size-3.5 has-[>svg]:px-2",
        sm: "h-8 px-3 gap-1.5 rounded-lg has-[>svg]:px-2.5",
        "icon-xs":
          "size-6 rounded-lg p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 rounded-lg p-0 has-[>svg]:p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
)

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size"> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "text-muted-foreground flex items-center gap-2 text-sm [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      variant="ghost"
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:bg-transparent hover:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
