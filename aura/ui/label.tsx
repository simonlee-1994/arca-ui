"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  className,
  required,
  optional,
  children,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & {
  required?: boolean
  optional?: boolean
}) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none",
        "text-foreground/90",
        "transition-colors duration-200",
        "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="inline-flex items-center justify-center size-1.5 rounded-full bg-gradient-to-br from-primary to-primary/70 shadow-sm shadow-primary/20" />
      )}
      {optional && (
        <span className="text-xs text-muted-foreground font-normal">(optional)</span>
      )}
    </LabelPrimitive.Root>
  )
}

export { Label }
