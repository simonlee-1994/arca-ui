"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon, MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative size-6 shrink-0 rounded-[8px] border-2 border-paper-edge bg-secondary/60 shadow-none transition-colors duration-150 outline-none hover:bg-secondary/80 focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-foreground data-[state=checked]:border-foreground data-[state=checked]:text-background data-[state=indeterminate]:bg-foreground data-[state=indeterminate]:border-foreground data-[state=indeterminate]:text-background",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current"
      >
        {props.checked === "indeterminate" ? (
          <MinusIcon className="size-4 stroke-[3]" />
        ) : (
          <CheckIcon className="size-4 stroke-[3]" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
