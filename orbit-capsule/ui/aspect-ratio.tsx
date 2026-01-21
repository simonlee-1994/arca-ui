"use client"

import * as React from "react"
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

import { cn } from "@/lib/utils"

function AspectRatio({
  className,
  unstyled = false,
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root> & {
  className?: string
  unstyled?: boolean
}) {
  if (unstyled) {
    return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
  }

  return (
    <div className={cn("overflow-hidden rounded-lg border border-foreground", className)}>
      <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
    </div>
  )
}

export { AspectRatio }
