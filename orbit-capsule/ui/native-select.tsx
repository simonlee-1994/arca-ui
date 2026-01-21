import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function NativeSelect({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <div
      className="group/native-select orbit-hover-offset-sm relative w-fit rounded-full has-[select:disabled]:opacity-50"
      data-slot="native-select-wrapper"
    >
      <select
        data-slot="native-select"
        className={cn(
          "border-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground h-10 w-full min-w-0 appearance-none rounded-full border bg-background px-4 py-2 pr-10 text-sm font-medium transition-all outline-none disabled:pointer-events-none disabled:cursor-not-allowed",
          "focus-visible:ring-2 focus-visible:ring-ring/50",
          "aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      <ChevronDownIcon
        className="text-foreground pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 select-none transition-transform duration-200 group-focus-within/native-select:rotate-180"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  )
}

function NativeSelectOption({ ...props }: React.ComponentProps<"option">) {
  return <option data-slot="native-select-option" {...props} />
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn("font-semibold", className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
