import * as React from "react"

import { cn } from "@/lib/utils"

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      className={cn(
        "flex items-center rounded-full border border-border bg-background",
        "transition-colors duration-200",
        "focus-within:border-border-hover focus-within:ring-[3px] focus-within:ring-ring/20 focus-within:ring-offset-2 focus-within:ring-offset-background",
        "[&>input]:border-0 [&>input]:focus-visible:ring-0 [&>input]:focus-visible:ring-offset-0",
        className
      )}
      {...props}
    />
  )
}

function InputGroupAddon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group-addon"
      className={cn(
        "flex items-center self-stretch px-3 text-sm text-muted-foreground",
        "first:rounded-l-full last:rounded-r-full",
        className
      )}
      {...props}
    />
  )
}

export { InputGroup, InputGroupAddon }
