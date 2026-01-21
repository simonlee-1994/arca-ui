"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/themes/aura/button"
import { Input, inputVariants } from "@/components/themes/aura/input"
import { Textarea, textareaVariants } from "@/components/themes/aura/textarea"

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group relative flex w-full items-center",
        "rounded-xl border border-border/80 bg-primary/5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]",
        "transition-all duration-300 ease-out outline-none",
        "h-11 min-w-0 has-[>textarea]:h-auto",

        // Variants based on alignment.
        "has-[>[data-align=inline-start]]:[&>input]:pl-2",
        "has-[>[data-align=inline-end]]:[&>input]:pr-2",
        "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3",

        // Hover state.
        "hover:border-primary/40 hover:shadow-[var(--aura-shadow-card-hover)]",

        // Focus state.
        "has-[[data-slot=input-group-control]:focus-visible]:border-primary/60 has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/30",

        // Error state.
        "has-[[data-slot][aria-invalid=true]]:border-destructive/70 has-[[data-slot][aria-invalid=true]]:ring-2 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40",

        className
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "text-muted-foreground flex h-auto cursor-text items-center justify-center gap-2 py-2 text-sm font-medium select-none [&>svg:not([class*='size-'])]:size-4 [&>kbd]:rounded-lg group-data-[disabled=true]/input-group:opacity-50 transition-colors duration-300",
  {
    variants: {
      align: {
        "inline-start":
          "order-first pl-4 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
        "inline-end":
          "order-last pr-4 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]",
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
        const control = e.currentTarget.parentElement?.querySelector(
          "[data-slot=input-group-control]"
        ) as HTMLElement | null
        control?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva(
  "text-sm shadow-none flex gap-2 items-center transition-all duration-300",
  {
    variants: {
      size: {
        xs: "h-7 gap-1 px-2.5 rounded-lg [&>svg:not([class*='size-'])]:size-3.5 has-[>svg]:px-2.5",
        sm: "h-8 px-3 gap-1.5 rounded-lg has-[>svg]:px-2.5",
        "icon-xs":
          "size-7 rounded-lg p-0 has-[>svg]:p-0",
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
}: Omit<React.ComponentProps<"input">, "size"> & VariantProps<typeof inputVariants>) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent h-full",
        "aria-invalid:border-0 aria-invalid:ring-0 aria-invalid:ring-offset-0",
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: Omit<React.ComponentProps<"textarea">, "size"> & VariantProps<typeof textareaVariants>) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent",
        "aria-invalid:border-0 aria-invalid:ring-0 aria-invalid:ring-offset-0",
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
