import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const nativeSelectVariants = cva(
  [
    "h-9 w-full min-w-0 appearance-none px-3 py-2 pr-9 text-sm transition-all outline-none",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "text-foreground",
    "placeholder:text-muted-foreground",
    "selection:bg-primary selection:text-primary-foreground",
  ],
  {
    variants: {
      variant: {
        default: [
          // Tray style - recessed with inset shadow
          "bg-tray rounded-xl",
          "border border-border/40",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_8px_rgba(15,23,42,0.06)]",
          "focus:border-primary focus:ring-2 focus:ring-primary/20",
        ],
        capsule: [
          // Capsule style - raised on tray
          "bg-capsule rounded-xl",
          "border border-border/60",
          "shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]",
          "focus:border-primary/50 focus:shadow-[0_2px_10px_rgba(15,23,42,0.10),inset_0_1px_0_rgba(255,255,255,0.9)]",
        ],
        flat: [
          "bg-background rounded-xl",
          "border border-transparent",
          "focus:bg-secondary focus:border-border/40",
        ],
      },
      size: {
        sm: "h-8 text-xs px-2 pr-8 rounded-lg",
        default: "h-9 text-sm",
        lg: "h-11 text-base px-4 pr-10 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface NativeSelectProps
  extends Omit<React.ComponentProps<"select">, "size">,
    VariantProps<typeof nativeSelectVariants> {}

function NativeSelect({
  className,
  variant,
  size,
  ...props
}: NativeSelectProps) {
  return (
    <div
      className="group/native-select relative w-full has-[select:disabled]:opacity-50"
      data-slot="native-select-wrapper"
    >
      <select
        data-slot="native-select"
        className={cn(
          nativeSelectVariants({ variant, size }),
          "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      <ChevronDownIcon
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground transition-all duration-200 select-none group-has-[select:focus]/native-select:text-primary group-has-[select:focus]/native-select:rotate-180"
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
      className={cn("font-semibold text-foreground", className)}
      {...props}
    />
  )
}

export {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
  nativeSelectVariants,
}
