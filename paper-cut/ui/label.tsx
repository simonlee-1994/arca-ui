"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "flex items-center gap-2 text-sm leading-none font-medium text-foreground select-none transition-colors duration-paper ease-paper group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        strong: "font-semibold",
        underline: "border-b border-paper-edge pb-1",
        muted: "text-muted-foreground font-normal",
      },
      size: {
        default: "text-sm",
        sm: "text-xs",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface LabelProps
  extends React.ComponentProps<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  required?: boolean
  requiredIndicator?: "asterisk" | "dot" | "badge" | "text"
}

function Label({
  className,
  variant,
  size,
  required,
  requiredIndicator = "asterisk",
  children,
  ...props
}: LabelProps) {
  const renderRequiredIndicator = () => {
    if (!required) return null

    switch (requiredIndicator) {
      case "asterisk":
        return (
          <span className="text-[11px] leading-none font-normal text-muted-foreground -ml-1">
            *
          </span>
        )
      case "dot":
        return (
          <span className="size-1.5 rounded-full bg-primary shrink-0 -ml-1" />
        )
      case "badge":
        return (
          <span className="inline-flex items-center rounded-[8px] bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
            Required
          </span>
        )
      case "text":
        return (
          <span className="text-xs font-normal text-muted-foreground">
            (required)
          </span>
        )
      default:
        return null
    }
  }

  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(labelVariants({ variant, size }), className)}
      {...props}
    >
      {children}
      {renderRequiredIndicator()}
    </LabelPrimitive.Root>
  )
}

export { Label, labelVariants }
