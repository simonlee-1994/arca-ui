"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/themes/paper-cut/button"
import { Input } from "@/components/themes/paper-cut/input"
import { Textarea } from "@/components/themes/paper-cut/textarea"

type InputGroupVariant = "default" | "elevated"
type InputGroupSize = "default" | "sm" | "lg"

const inputGroupVariants = cva(
  [
    "group/input-group relative flex w-full min-w-0 items-center border border-paper-edge outline-none",
    "transition-all duration-paper ease-paper",
    "has-[>textarea]:h-auto",

    // Variants based on alignment.
    "has-[>[data-align=inline-start]]:[&>[data-slot=input-group-control]]:pl-2",
    "has-[>[data-align=inline-end]]:[&>[data-slot=input-group-control]]:pr-2",
    "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>[data-slot=input-group-control]]:pb-3",
    "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>[data-slot=input-group-control]]:pt-3",

    // Focus + error states.
    "has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-[3px] has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50",
    "has-[[data-slot=input-group-control][aria-invalid=true]]:border-destructive has-[[data-slot=input-group-control][aria-invalid=true]]:ring-[3px] has-[[data-slot=input-group-control][aria-invalid=true]]:ring-destructive/20",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-secondary/60 shadow-none hover:bg-secondary/80 has-[[data-slot=input-group-control]:focus-visible]:bg-card",
        elevated:
          "bg-card shadow-paper-sm hover:shadow-paper-md hover:-translate-x-[var(--paper-lift-sm)] hover:-translate-y-[var(--paper-lift-sm)] has-[[data-slot=input-group-control]:focus-visible]:shadow-paper-md has-[[data-slot=input-group-control]:focus-visible]:-translate-x-[var(--paper-lift-md)] has-[[data-slot=input-group-control]:focus-visible]:-translate-y-[var(--paper-lift-md)]",
      },
      size: {
        default: "h-9 rounded-[16px]",
        sm: "h-8 rounded-[14px]",
        lg: "h-11 rounded-[20px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type InputGroupStyleContextValue = {
  variant: InputGroupVariant
  size: InputGroupSize
}

const InputGroupStyleContext = React.createContext<InputGroupStyleContextValue>({
  variant: "default",
  size: "default",
})

function InputGroup({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupVariants>) {
  return (
    <InputGroupStyleContext.Provider
      value={{
        variant: (variant ?? "default") as InputGroupVariant,
        size: (size ?? "default") as InputGroupSize,
      }}
    >
      <div
        data-slot="input-group"
        data-variant={variant ?? "default"}
        data-size={size ?? "default"}
        role="group"
        className={cn(inputGroupVariants({ variant, size }), className)}
        {...props}
      />
    </InputGroupStyleContext.Provider>
  )
}

const inputGroupAddonVariants = cva(
  "text-muted-foreground flex h-auto cursor-text items-center justify-center gap-2 font-medium select-none group-data-[disabled=true]/input-group:opacity-50",
  {
    variants: {
      align: {
        "inline-start": "order-first",
        "inline-end": "order-last",
        "block-start": "order-first w-full justify-start",
        "block-end": "order-last w-full justify-start",
      },
      size: {
        default:
          "py-1.5 text-sm [&>svg:not([class*='size-'])]:size-4 [&>kbd]:rounded-[12px]",
        sm: "py-1 text-xs [&>svg:not([class*='size-'])]:size-3.5 [&>kbd]:rounded-[10px]",
        lg: "py-2 text-sm [&>svg:not([class*='size-'])]:size-4 [&>kbd]:rounded-[12px]",
      },
    },
    compoundVariants: [
      {
        align: "inline-start",
        size: "default",
        className:
          "pl-4 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
      },
      {
        align: "inline-start",
        size: "sm",
        className:
          "pl-3 has-[>button]:ml-[-0.35rem] has-[>kbd]:ml-[-0.25rem]",
      },
      {
        align: "inline-start",
        size: "lg",
        className:
          "pl-5 has-[>button]:ml-[-0.55rem] has-[>kbd]:ml-[-0.45rem]",
      },
      {
        align: "inline-end",
        size: "default",
        className:
          "pr-4 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]",
      },
      {
        align: "inline-end",
        size: "sm",
        className:
          "pr-3 has-[>button]:mr-[-0.35rem] has-[>kbd]:mr-[-0.25rem]",
      },
      {
        align: "inline-end",
        size: "lg",
        className:
          "pr-5 has-[>button]:mr-[-0.55rem] has-[>kbd]:mr-[-0.45rem]",
      },
      {
        align: "block-start",
        size: "default",
        className:
          "px-4 pt-3 [.border-b]:pb-3 group-has-[>input]/input-group:pt-2.5",
      },
      {
        align: "block-start",
        size: "sm",
        className:
          "px-3 pt-2.5 [.border-b]:pb-2.5 group-has-[>input]/input-group:pt-2",
      },
      {
        align: "block-start",
        size: "lg",
        className:
          "px-5 pt-4 [.border-b]:pb-4 group-has-[>input]/input-group:pt-3.5",
      },
      {
        align: "block-end",
        size: "default",
        className:
          "px-4 pb-3 [.border-t]:pt-3 group-has-[>input]/input-group:pb-2.5",
      },
      {
        align: "block-end",
        size: "sm",
        className:
          "px-3 pb-2.5 [.border-t]:pt-2.5 group-has-[>input]/input-group:pb-2",
      },
      {
        align: "block-end",
        size: "lg",
        className:
          "px-5 pb-4 [.border-t]:pt-4 group-has-[>input]/input-group:pb-3.5",
      },
    ],
    defaultVariants: {
      align: "inline-start",
      size: "default",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  const ctx = React.useContext(InputGroupStyleContext)
  const resolvedSize = size ?? ctx.size

  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align, size: resolvedSize }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement
          ?.querySelector<HTMLElement>("[data-slot=input-group-control]")
          ?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva(
  "text-sm shadow-none flex gap-2 items-center",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 px-2 rounded-[12px] [&>svg:not([class*='size-'])]:size-3.5 has-[>svg]:px-2",
        sm: "h-8 px-2.5 gap-1.5 rounded-[14px] has-[>svg]:px-2.5",
        "icon-xs":
          "size-6 rounded-[12px] p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 rounded-[14px] p-0 has-[>svg]:p-0",
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
  const { size } = React.useContext(InputGroupStyleContext)

  return (
    <span
      className={cn(
        "text-muted-foreground flex items-center gap-2 [&_svg]:pointer-events-none",
        size === "sm"
          ? "text-xs [&_svg:not([class*='size-'])]:size-3.5"
          : "text-sm [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "size">) {
  const { size } = React.useContext(InputGroupStyleContext)

  return (
    <Input
      data-slot="input-group-control"
      size={size}
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none",
        "hover:bg-transparent hover:translate-x-0 hover:translate-y-0 hover:shadow-none",
        "focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:translate-x-0 focus-visible:translate-y-0 focus-visible:shadow-none focus-visible:border-transparent",
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
  const { size } = React.useContext(InputGroupStyleContext)

  return (
    <Textarea
      data-slot="input-group-control"
      size={size}
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent shadow-none",
        size === "sm" ? "py-2" : size === "lg" ? "py-3" : "py-2.5",
        "hover:bg-transparent",
        "focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0",
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
