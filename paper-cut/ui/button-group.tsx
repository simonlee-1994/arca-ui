import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/themes/paper-cut/separator"

/**
 * ButtonGroup Elevation System (3 Levels):
 * - elevated: Strong shadow (whiteboard/canvas applications)
 * - default:  Medium shadow (standalone toolbars) - DEFAULT
 * - outlined: Border only, no shadow (inside cards)
 *
 * Lift:
 * - Disabled by default to avoid noisy motion in dense toolbars.
 * - Pass `lift` to opt in.
 */
const buttonGroupVariants = cva(
  "relative inline-flex w-fit items-stretch rounded-[24px] border border-paper-edge transition-all duration-paper ease-paper [&>*]:focus-visible:z-10 [&>*]:focus-visible:relative [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-[24px] has-[>[data-slot=button-group]]:gap-2 overflow-hidden bg-card",
  {
    variants: {
      variant: {
        elevated:
          "shadow-paper-md",
        default:
          "shadow-paper-sm",
        outlined:
          "shadow-none",
      },
      lift: {
        on: "",
        off: "",
      },
      orientation: {
        horizontal:
          "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none [&>[data-slot=button]]:shadow-none [&>[data-slot=button]]:hover:shadow-none [&>[data-slot=button]]:hover:translate-x-0 [&>[data-slot=button]]:hover:translate-y-0 [&>[data-slot=button]]:active:bg-accent [&>[data-slot=button]]:active:text-foreground [&>[data-slot=button]]:active:translate-x-[var(--paper-lift-sm)] [&>[data-slot=button]]:active:translate-y-[var(--paper-lift-sm)] [&>[data-slot=button]]:active:ring-2 [&>[data-slot=button]]:active:ring-paper-edge/80 [&>[data-slot=button]]:active:ring-inset [&>[data-slot=button]]:active:relative [&>[data-slot=button]]:active:z-10 [&>*]:border-0 [&>*:not(:last-child)]:border-r [&>*:not(:last-child)]:border-paper-edge",
        vertical:
          "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none [&>[data-slot=button]]:shadow-none [&>[data-slot=button]]:hover:shadow-none [&>[data-slot=button]]:hover:translate-x-0 [&>[data-slot=button]]:hover:translate-y-0 [&>[data-slot=button]]:active:bg-accent [&>[data-slot=button]]:active:text-foreground [&>[data-slot=button]]:active:translate-x-[var(--paper-lift-sm)] [&>[data-slot=button]]:active:translate-y-[var(--paper-lift-sm)] [&>[data-slot=button]]:active:ring-2 [&>[data-slot=button]]:active:ring-paper-edge/80 [&>[data-slot=button]]:active:ring-inset [&>[data-slot=button]]:active:relative [&>[data-slot=button]]:active:z-10 [&>*]:border-0 [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-paper-edge",
      },
    },
    compoundVariants: [
      {
        variant: "elevated",
        lift: "on",
        className:
          "hover:-translate-x-[var(--paper-lift-lg)] hover:-translate-y-[var(--paper-lift-lg)] hover:shadow-paper-lg hover:z-10 focus-within:-translate-x-[var(--paper-lift-lg)] focus-within:-translate-y-[var(--paper-lift-lg)] focus-within:shadow-paper-lg focus-within:z-10",
      },
      {
        variant: "default",
        lift: "on",
        className:
          "hover:-translate-x-[var(--paper-lift-md)] hover:-translate-y-[var(--paper-lift-md)] hover:shadow-paper-md hover:z-10 focus-within:-translate-x-[var(--paper-lift-md)] focus-within:-translate-y-[var(--paper-lift-md)] focus-within:shadow-paper-md focus-within:z-10",
      },
      {
        variant: "outlined",
        lift: "on",
        className:
          "hover:-translate-x-[var(--paper-lift-sm)] hover:-translate-y-[var(--paper-lift-sm)] hover:shadow-paper-sm hover:z-10 focus-within:-translate-x-[var(--paper-lift-sm)] focus-within:-translate-y-[var(--paper-lift-sm)] focus-within:shadow-paper-sm focus-within:z-10",
      },
    ],
    defaultVariants: {
      variant: "default",
      lift: "off",
      orientation: "horizontal",
    },
  }
)

function ButtonGroup({
  className,
  variant,
  lift,
  orientation,
  ...props
}: React.ComponentProps<"div"> &
  Omit<VariantProps<typeof buttonGroupVariants>, "lift"> & { lift?: boolean }) {
  const resolvedVariant = variant ?? "default"
  const resolvedLift = lift ?? false
  const resolvedOrientation = orientation ?? "horizontal"

  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={resolvedOrientation}
      data-variant={resolvedVariant}
      data-lift={resolvedLift ? "on" : "off"}
      className={cn(
        buttonGroupVariants({
          variant: resolvedVariant,
          lift: resolvedLift ? "on" : "off",
          orientation: resolvedOrientation,
        }),
        className
      )}
      {...props}
    />
  )
}

function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      className={cn(
        "bg-accent/50 flex items-center gap-2 px-4 text-sm font-medium text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  variant = "subtle",
  size = "sm",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      variant={variant}
      size={size}
      className={cn(
        "relative !m-0 self-stretch data-[orientation=vertical]:h-auto",
        className
      )}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
}
