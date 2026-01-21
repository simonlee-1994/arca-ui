import * as React from "react"

import { cn } from "@/lib/utils"

function ButtonGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="button-group"
      className={cn(
        "inline-flex -space-x-px radius-control overflow-hidden [&>button]:rounded-none [&>button:first-child]:rounded-l-full [&>button:last-child]:rounded-r-full [&>button]:focus:z-10",
        className
      )}
      {...props}
    />
  )
}

export { ButtonGroup }
