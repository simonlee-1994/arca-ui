import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const nativeSelectVariants = cva(
  cn(
    "w-full min-w-0 appearance-none border-2 border-border/80 bg-primary/5 text-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out outline-none",
    "text-foreground placeholder:text-muted-foreground/70",
    "selection:bg-primary selection:text-primary-foreground",
    "hover:border-primary/40 hover:bg-accent/20",
    "focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-ring/30",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
  ),
  {
    variants: {
      size: {
        sm: "h-8 rounded-lg px-3 py-1.5 pr-9 text-xs",
        default: "h-9 rounded-xl px-4 py-2 pr-10",
        lg: "h-10 rounded-2xl px-5 py-2.5 pr-12 text-[15px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const iconWrapperVariants = cva(
  "flex items-center justify-center rounded-full bg-secondary/60 transition-colors duration-200 group-hover/native-select:bg-primary/10",
  {
    variants: {
      size: {
        sm: "size-4",
        default: "size-5",
        lg: "size-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const iconVariants = cva("text-muted-foreground", {
  variants: {
    size: {
      sm: "size-3",
      default: "size-3.5",
      lg: "size-4",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

interface NativeSelectProps
  extends Omit<React.ComponentProps<"select">, "size">,
    VariantProps<typeof nativeSelectVariants> {}

function NativeSelect({
  className,
  size,
  onBlur,
  onChange,
  onKeyDown,
  onPointerDown,
  ...props
}: NativeSelectProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div
      className={cn(
        "group/native-select relative w-fit has-[select:disabled]:opacity-50",
        "has-[select.w-full]:w-full has-[select.max-w-sm]:max-w-sm"
      )}
      data-slot="native-select-wrapper"
      data-open={open ? "true" : "false"}
    >
      <select
        data-slot="native-select"
        className={cn(nativeSelectVariants({ size }), className)}
        onPointerDown={(event) => {
          onPointerDown?.(event)
          if (event.defaultPrevented) return
          setOpen(true)
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event)
          if (event.defaultPrevented) return

          if (event.key === "Escape") {
            setOpen(false)
            return
          }

          if (
            event.key === "Enter" ||
            event.key === " " ||
            event.key === "ArrowDown" ||
            event.key === "ArrowUp"
          ) {
            setOpen(true)
          }
        }}
        onChange={(event) => {
          onChange?.(event)
          setOpen(false)
        }}
        onBlur={(event) => {
          onBlur?.(event)
          setOpen(false)
        }}
        {...props}
      />
      <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
        <div
          className={cn(
            iconWrapperVariants({ size }),
            "group-data-[open=true]/native-select:bg-primary/10"
          )}
        >
          <ChevronDownIcon
            className={cn(
              iconVariants({ size }),
              "transition-transform duration-300 group-data-[open=true]/native-select:rotate-180"
            )}
            aria-hidden="true"
            data-slot="native-select-icon"
          />
        </div>
      </div>
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
      className={cn("font-medium", className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
