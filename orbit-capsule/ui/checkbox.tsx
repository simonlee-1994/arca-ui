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
        "orbit-hover-offset-sm peer size-5 shrink-0 rounded-full border border-foreground bg-background transition-colors outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current"
      >
        {props.checked === "indeterminate" ? (
          <MinusIcon className="size-3.5 stroke-[3]" />
        ) : (
          <CheckIcon className="size-3.5 stroke-[3]" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

// Animated Checkbox with path animation
function AnimatedCheckbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "orbit-hover-offset-sm peer size-5 shrink-0 rounded-full border border-foreground bg-background transition-colors outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current"
      >
        {props.checked === "indeterminate" ? (
          <MinusIcon className="size-3.5 stroke-[3]" />
        ) : (
          <svg
            className="size-3.5"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M2 7L5.5 10.5L12 4"
              className="animate-[checkmark_0.2s_ease-out_forwards]"
              style={{
                strokeDasharray: 16,
                strokeDashoffset: 16,
              }}
            />
          </svg>
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox, AnimatedCheckbox }
