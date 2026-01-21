import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const kbdVariants = cva(
  "pointer-events-none inline-flex h-6 w-fit min-w-6 items-center justify-center gap-1 rounded-[12px] px-2 font-sans text-xs font-semibold select-none [&_svg:not([class*='size-'])]:size-3",
  {
    variants: {
      variant: {
        default:
          "bg-muted text-muted-foreground border border-paper-edge",
        primary:
          "bg-primary text-primary-foreground border border-primary",
        secondary:
          "bg-secondary text-secondary-foreground border border-paper-edge",
        destructive:
          "bg-destructive text-destructive-foreground border border-destructive",
        outline:
          "bg-transparent text-foreground border-2 border-paper-edge",
      },
      elevation: {
        flat: "shadow-none",
        raised: "shadow-paper-sm",
      },
      size: {
        default: "h-6 min-w-6 px-2 text-xs",
        sm: "h-5 min-w-5 px-1.5 text-[10px]",
        lg: "h-8 min-w-8 px-3 text-sm",
      },
      interactive: {
        true: "pointer-events-auto cursor-pointer transition-all duration-paper ease-paper",
        false: "",
      },
    },
    compoundVariants: [
      {
        interactive: true,
        elevation: "flat",
        className:
          "hover:-translate-x-[var(--paper-lift-sm)] hover:-translate-y-[var(--paper-lift-sm)] hover:shadow-paper-sm active:translate-x-[var(--paper-lift-sm)] active:translate-y-[var(--paper-lift-sm)] active:shadow-paper-pressed",
      },
      {
        interactive: true,
        elevation: "raised",
        className:
          "hover:-translate-x-[var(--paper-lift-sm)] hover:-translate-y-[var(--paper-lift-sm)] hover:shadow-paper-md active:translate-x-[var(--paper-lift-sm)] active:translate-y-[var(--paper-lift-sm)] active:shadow-paper-pressed",
      },
      {
        interactive: true,
        variant: "outline",
        className: "hover:bg-secondary active:bg-secondary/80",
      },
    ],
    defaultVariants: {
      variant: "default",
      elevation: "flat",
      size: "default",
      interactive: false,
    },
  }
)

function Kbd({
  className,
  variant,
  elevation,
  size,
  interactive,
  ...props
}: React.ComponentProps<"kbd"> & VariantProps<typeof kbdVariants>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        kbdVariants({ variant, elevation, size, interactive }),
        "[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background [[data-slot=tooltip-content]_&]:border-transparent [[data-slot=tooltip-content]_&]:shadow-none dark:[[data-slot=tooltip-content]_&]:bg-background/10",
        className
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup, kbdVariants }
