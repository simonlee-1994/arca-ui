"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const nativeSelectVariants = cva(
  [
    "peer w-full min-w-0 appearance-none outline-none text-left",
    "border border-paper-edge",
    "text-sm font-medium",
    "transition-all duration-paper ease-paper",
    "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
    "disabled:pointer-events-none disabled:cursor-not-allowed",
    "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  ],
  {
    variants: {
      size: {
        default: "h-9 rounded-[16px] pl-3.5 pr-10 py-1.5",
        sm: "h-8 rounded-[14px] pl-3 pr-10 py-1 text-xs",
        lg: "h-11 rounded-[20px] pl-4 pr-10 py-2",
      },
      elevation: {
        inset: cn(
          "bg-secondary/60 shadow-none",
          "hover:bg-secondary",
          "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:border-ring"
        ),
        section: cn(
          "bg-card shadow-paper-sm",
          "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:border-ring"
        ),
        elevated: cn(
          "bg-card shadow-paper-md",
          "hover:shadow-paper-lg hover:-translate-x-[var(--paper-lift-md)] hover:-translate-y-[var(--paper-lift-md)]",
          "focus-visible:shadow-paper-lg focus-visible:-translate-x-[var(--paper-lift-md)] focus-visible:-translate-y-[var(--paper-lift-md)]",
          "active:translate-x-[var(--paper-lift-md)] active:translate-y-[var(--paper-lift-md)] active:shadow-paper-pressed",
          "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:border-ring"
        ),
      },
    },
    defaultVariants: {
      size: "default",
      elevation: "inset",
    },
  }
)

type NativeSelectProps = Omit<React.ComponentProps<"select">, "size"> &
  VariantProps<typeof nativeSelectVariants> & {
    wrapperClassName?: string
  }

function NativeSelect({
  className,
  size,
  elevation,
  wrapperClassName,
  onPointerDown,
  onKeyDown,
  onBlur,
  onChange,
  ...props
}: NativeSelectProps) {
  const [iconOpen, setIconOpen] = React.useState(false)
  const iconTimeoutRef = React.useRef<number | null>(null)

  const clearIconTimeout = React.useCallback(() => {
    if (iconTimeoutRef.current) {
      window.clearTimeout(iconTimeoutRef.current)
      iconTimeoutRef.current = null
    }
  }, [])

  const stopIcon = React.useCallback(() => {
    clearIconTimeout()
    setIconOpen(false)
  }, [clearIconTimeout])

  const startIcon = React.useCallback(() => {
    setIconOpen(true)
    clearIconTimeout()
    iconTimeoutRef.current = window.setTimeout(() => {
      setIconOpen(false)
      iconTimeoutRef.current = null
    }, 900)
  }, [clearIconTimeout])

  React.useEffect(() => {
    return () => {
      clearIconTimeout()
    }
  }, [clearIconTimeout])

  return (
    <div
      className={cn(
        "group/native-select relative w-full has-[select:disabled]:opacity-50",
        wrapperClassName
      )}
      data-slot="native-select-wrapper"
      data-open={iconOpen ? "true" : "false"}
    >
      <select
        data-slot="native-select"
        className={cn(
          nativeSelectVariants({ size, elevation }),
          className
        )}
        onPointerDown={(event) => {
          onPointerDown?.(event)
          if (!event.defaultPrevented) startIcon()
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event)
          if (event.defaultPrevented) return

          if (event.key === "Escape") {
            stopIcon()
            return
          }

          const openKeys = ["Enter", " ", "ArrowDown", "ArrowUp"]
          if (openKeys.includes(event.key)) startIcon()
        }}
        onBlur={(event) => {
          onBlur?.(event)
          stopIcon()
        }}
        onChange={(event) => {
          onChange?.(event)
          stopIcon()
        }}
        {...props}
      />
      <ChevronDownIcon
        className={cn(
          "text-muted-foreground pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 select-none",
          "transition-[transform,color] duration-paper ease-paper",
          "peer-focus-visible:text-foreground",
          "group-data-[open=true]/native-select:rotate-180 group-data-[open=true]/native-select:text-foreground"
        )}
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
