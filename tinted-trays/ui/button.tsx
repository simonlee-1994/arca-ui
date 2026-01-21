import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium transition-all duration-200",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-primary text-primary-foreground rounded-xl",
          "shadow-[0_1px_2px_rgba(15,23,42,0.16),inset_0_1px_0_rgba(255,255,255,0.25)]",
          "hover:bg-primary/85",
          "active:scale-[0.98] active:bg-primary/80",
        ],
        destructive: [
          "bg-destructive text-white rounded-xl",
          "shadow-[0_1px_2px_rgba(15,23,42,0.16),inset_0_1px_0_rgba(255,255,255,0.2)]",
          "hover:bg-destructive/85",
          "focus-visible:ring-destructive/20",
          "active:scale-[0.98] active:bg-destructive/80",
        ],
        outline: [
          "bg-background border border-border/60 rounded-xl",
          "shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]",
          "hover:bg-secondary/60 hover:border-border/80",
          "active:scale-[0.98] active:bg-secondary/80",
        ],
        secondary: [
          "bg-tray text-secondary-foreground rounded-xl border border-border/60",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_6px_rgba(15,23,42,0.04)]",
          "hover:bg-tray/70 hover:border-border/80",
          "active:scale-[0.98] active:bg-tray/60",
        ],
        ghost: [
          "rounded-xl",
          "hover:bg-accent hover:text-accent-foreground",
          "active:scale-[0.98] active:bg-accent/80",
        ],
        link: [
          "text-primary underline-offset-4",
          "hover:underline",
        ],
        capsule: [
          "bg-background border border-border/60 rounded-full",
          "shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]",
          "hover:bg-secondary/60 hover:border-border/80",
          "active:scale-[0.98] active:bg-secondary/80",
        ],
      },
      size: {
        sm: "h-7 gap-1 px-2.5 text-xs",
        default: "h-8 gap-1.5 px-3.5",
        lg: "h-10 px-5",
        xl: "h-12 px-8 text-base font-semibold",
        "icon-sm": "size-7",
        icon: "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
