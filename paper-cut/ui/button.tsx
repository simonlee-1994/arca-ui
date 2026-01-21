import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Button Elevation System (4 Levels):
 *
 * - elevated: Level 4 - Strong shadow + lift animation (Landing CTA, hero buttons)
 *   Variants: elevated, elevated-primary, elevated-secondary, elevated-destructive
 *
 * - default: Level 3 - Medium shadow (standalone buttons)
 *   Variants: default, primary, secondary, destructive
 *
 * - outlined: Level 2 - Border only, no shadow (most common use) **NEW DEFAULT**
 *   Variants: outlined, outlined-primary, outlined-secondary, outlined-destructive
 *
 * - flat: Level 1 - No border, no shadow (nested inside containers)
 *   Variants: flat, flat-primary, flat-secondary, flat-destructive, ghost, link
 */

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all duration-paper ease-paper disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        // === Level 4: Elevated (Landing CTA, Hero) ===
        elevated:
          "bg-card text-foreground border border-paper-edge rounded-[24px] shadow-paper-md hover:shadow-paper-lg hover:-translate-x-[var(--paper-lift-lg)] hover:-translate-y-[var(--paper-lift-lg)] hover:z-10 active:translate-x-[var(--paper-lift-lg)] active:translate-y-[var(--paper-lift-lg)] active:shadow-paper-pressed",
        "elevated-primary":
          "bg-primary text-primary-foreground rounded-[24px] shadow-paper-md [--paper-shadow:var(--paper-shadow-primary)] hover:shadow-paper-lg hover:-translate-x-[var(--paper-lift-lg)] hover:-translate-y-[var(--paper-lift-lg)] hover:z-10 active:translate-x-[var(--paper-lift-lg)] active:translate-y-[var(--paper-lift-lg)] active:shadow-paper-pressed",
        "elevated-secondary":
          "bg-secondary text-secondary-foreground border border-paper-edge rounded-[24px] shadow-paper-md hover:shadow-paper-lg hover:-translate-x-[var(--paper-lift-lg)] hover:-translate-y-[var(--paper-lift-lg)] hover:z-10 active:translate-x-[var(--paper-lift-lg)] active:translate-y-[var(--paper-lift-lg)] active:shadow-paper-pressed",
        "elevated-destructive":
          "bg-destructive text-white rounded-[24px] shadow-paper-md [--paper-shadow:var(--paper-shadow-destructive)] hover:shadow-paper-lg hover:-translate-x-[var(--paper-lift-lg)] hover:-translate-y-[var(--paper-lift-lg)] hover:z-10 active:translate-x-[var(--paper-lift-lg)] active:translate-y-[var(--paper-lift-lg)] active:shadow-paper-pressed",

        // === Level 3: Default (standalone buttons with medium shadow) ===
        default:
          "bg-card text-foreground border border-paper-edge rounded-[24px] shadow-paper-sm hover:bg-accent/50 hover:shadow-paper-md hover:-translate-x-[var(--paper-lift-md)] hover:-translate-y-[var(--paper-lift-md)] hover:z-10 active:translate-x-[var(--paper-lift-md)] active:translate-y-[var(--paper-lift-md)] active:shadow-paper-pressed",
        primary:
          "bg-primary text-primary-foreground rounded-[24px] shadow-paper-sm [--paper-shadow:var(--paper-shadow-primary)] hover:bg-primary/90 hover:shadow-paper-md hover:-translate-x-[var(--paper-lift-md)] hover:-translate-y-[var(--paper-lift-md)] hover:z-10 active:translate-x-[var(--paper-lift-md)] active:translate-y-[var(--paper-lift-md)] active:shadow-paper-pressed",
        secondary:
          "bg-secondary text-secondary-foreground border border-paper-edge rounded-[24px] shadow-paper-sm hover:bg-secondary/80 hover:shadow-paper-md hover:-translate-x-[var(--paper-lift-md)] hover:-translate-y-[var(--paper-lift-md)] hover:z-10 active:translate-x-[var(--paper-lift-md)] active:translate-y-[var(--paper-lift-md)] active:shadow-paper-pressed",
        destructive:
          "bg-destructive text-white rounded-[24px] shadow-paper-sm [--paper-shadow:var(--paper-shadow-destructive)] hover:bg-destructive/90 hover:shadow-paper-md hover:-translate-x-[var(--paper-lift-md)] hover:-translate-y-[var(--paper-lift-md)] hover:z-10 active:translate-x-[var(--paper-lift-md)] active:translate-y-[var(--paper-lift-md)] active:shadow-paper-pressed",

        // === Level 2: Outlined (border only, no shadow) - MOST COMMON ===
        outlined:
          "bg-card text-foreground border border-paper-edge rounded-[24px] shadow-none hover:bg-accent/50 hover:shadow-paper-sm hover:-translate-x-[var(--paper-lift-sm)] hover:-translate-y-[var(--paper-lift-sm)] hover:z-10 active:translate-x-[var(--paper-lift-sm)] active:translate-y-[var(--paper-lift-sm)] active:shadow-paper-pressed",
        "outlined-primary":
          "bg-primary text-primary-foreground rounded-[24px] shadow-none [--paper-shadow:var(--paper-shadow-primary)] hover:bg-primary/90 hover:shadow-paper-sm hover:-translate-x-[var(--paper-lift-sm)] hover:-translate-y-[var(--paper-lift-sm)] hover:z-10 active:translate-x-[var(--paper-lift-sm)] active:translate-y-[var(--paper-lift-sm)] active:shadow-paper-pressed",
        "outlined-secondary":
          "bg-secondary text-secondary-foreground border border-paper-edge rounded-[24px] shadow-none hover:bg-secondary/80 hover:shadow-paper-sm hover:-translate-x-[var(--paper-lift-sm)] hover:-translate-y-[var(--paper-lift-sm)] hover:z-10 active:translate-x-[var(--paper-lift-sm)] active:translate-y-[var(--paper-lift-sm)] active:shadow-paper-pressed",
        "outlined-destructive":
          "bg-destructive text-white rounded-[24px] shadow-none [--paper-shadow:var(--paper-shadow-destructive)] hover:bg-destructive/90 hover:shadow-paper-sm hover:-translate-x-[var(--paper-lift-sm)] hover:-translate-y-[var(--paper-lift-sm)] hover:z-10 active:translate-x-[var(--paper-lift-sm)] active:translate-y-[var(--paper-lift-sm)] active:shadow-paper-pressed",
        outline:
          "bg-background border-2 border-foreground text-foreground rounded-[24px] shadow-none hover:bg-accent/50 hover:shadow-paper-sm hover:-translate-x-[var(--paper-lift-sm)] hover:-translate-y-[var(--paper-lift-sm)] hover:z-10 active:translate-x-[var(--paper-lift-sm)] active:translate-y-[var(--paper-lift-sm)] active:shadow-paper-pressed",

        // === Level 1: Flat (no border, no shadow - nested in containers) ===
        flat:
          "bg-secondary/60 text-foreground border border-paper-edge rounded-[24px] shadow-none hover:bg-accent hover:text-accent-foreground hover:shadow-paper-sm hover:-translate-x-[var(--paper-lift-sm)] hover:-translate-y-[var(--paper-lift-sm)] hover:z-10 active:bg-accent/80 active:translate-x-[var(--paper-lift-sm)] active:translate-y-[var(--paper-lift-sm)] active:shadow-paper-pressed",
        "flat-primary":
          "bg-primary text-primary-foreground rounded-[24px] shadow-none [--paper-shadow:var(--paper-shadow-primary)] hover:bg-primary/90 hover:shadow-paper-sm hover:-translate-x-[var(--paper-lift-sm)] hover:-translate-y-[var(--paper-lift-sm)] hover:z-10 active:bg-primary active:translate-x-[var(--paper-lift-sm)] active:translate-y-[var(--paper-lift-sm)] active:shadow-paper-pressed",
        "flat-secondary":
          "bg-secondary text-secondary-foreground border border-paper-edge rounded-[24px] shadow-none hover:bg-secondary/80 hover:shadow-paper-sm hover:-translate-x-[var(--paper-lift-sm)] hover:-translate-y-[var(--paper-lift-sm)] hover:z-10 active:bg-secondary active:translate-x-[var(--paper-lift-sm)] active:translate-y-[var(--paper-lift-sm)] active:shadow-paper-pressed",
        "flat-destructive":
          "bg-destructive text-white rounded-[24px] shadow-none [--paper-shadow:var(--paper-shadow-destructive)] hover:bg-destructive/90 hover:shadow-paper-sm hover:-translate-x-[var(--paper-lift-sm)] hover:-translate-y-[var(--paper-lift-sm)] hover:z-10 active:bg-destructive active:translate-x-[var(--paper-lift-sm)] active:translate-y-[var(--paper-lift-sm)] active:shadow-paper-pressed",
        ghost:
          "rounded-[24px] hover:bg-accent/50 hover:text-accent-foreground active:bg-accent active:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-5",
        sm: "h-8 rounded-[20px] gap-1.5 px-4",
        lg: "h-11 rounded-[26px] px-7 text-base",
        // Special size for elevated CTA buttons
        cta: "h-12 rounded-[28px] px-9 text-base font-bold",
        icon: "size-9 rounded-[18px]",
        "icon-sm": "size-8 rounded-[16px]",
        "icon-lg": "size-11 rounded-[22px]",
      },
    },
    defaultVariants: {
      variant: "outlined",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
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
      data-loading={loading}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          <span className="sr-only">Loading</span>
          {children}
        </>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
