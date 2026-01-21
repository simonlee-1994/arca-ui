"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "orbit-hover-offset-sm peer inline-flex h-6 w-10 shrink-0 items-center rounded-full border border-foreground bg-secondary transition-colors outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-4 rounded-full border border-foreground bg-background transition-transform data-[state=checked]:translate-x-[calc(100%+2px)] data-[state=unchecked]:translate-x-0.5 data-[state=checked]:bg-background"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
