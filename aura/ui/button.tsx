import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[var(--aura-shadow-card)] hover:bg-primary/90 hover:shadow-[var(--aura-shadow-card-hover)]",
        destructive:
          "bg-destructive text-white shadow-[var(--aura-shadow-card)] hover:bg-destructive/90 hover:shadow-[var(--aura-shadow-card-hover)]",
        outline:
          "border border-border/70 bg-background hover:bg-accent/60 hover:text-accent-foreground hover:border-primary/40",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:shadow-[var(--aura-shadow-card)]",
        ghost:
          "hover:bg-accent/60 hover:text-accent-foreground",
        link:
          "text-primary underline-offset-4 hover:underline",
        soft:
          "bg-primary/10 text-primary hover:bg-primary/20",
      },
      size: {
        default: "h-9 px-5 py-2 rounded-xl",
        sm: "h-8 rounded-xl gap-1.5 px-3.5 text-xs",
        lg: "h-10 rounded-xl px-6 text-[15px]",
        xl: "h-11 rounded-2xl px-8 text-base font-semibold",
        icon: "size-9 rounded-xl",
        "icon-sm": "size-8 rounded-xl",
        "icon-lg": "size-10 rounded-xl",
      },
      rounded: {
        default: "",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  rounded,
  asChild = false,
  loading = false,
  children,
  disabled,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    loading?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, rounded, className }))}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {loading && <Loader2 className="animate-spin" />}
          {loading ? <span>{children}</span> : children}
        </>
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
