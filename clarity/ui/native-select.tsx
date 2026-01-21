import * as React from "react"

import { cn } from "@/lib/utils"

function NativeSelect({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      data-slot="native-select"
      className={cn(
        "radius-control flex h-10 w-full appearance-none border border-border bg-background px-3 py-2 pr-8 text-sm",
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:border-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "transition-colors duration-200",
        className
      )}
      {...props}
    />
  )
}

function NativeSelectWrapper({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("relative group", className)} {...props}>
      {children}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <svg
          className="size-4 text-muted-foreground transition-transform duration-200 group-focus-within:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}

export { NativeSelect, NativeSelectWrapper }
