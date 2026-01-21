"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // Base: 8-12px radius for tiny primitives (Clarity spec)
        "peer size-[18px] shrink-0 rounded-md border border-border bg-background",
        // Focus: ink-like ring (soft, offset, not loud)
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Checked state: primary (foreground) bg with white check
        "data-[state=checked]:bg-foreground data-[state=checked]:border-foreground data-[state=checked]:text-background",
        // Hover: subtle border change
        "hover:border-border-hover",
        // Transition
        "transition-colors duration-200",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current"
      >
        <CheckIcon className="size-3" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
