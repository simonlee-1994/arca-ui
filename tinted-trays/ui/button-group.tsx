import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/themes/tinted-trays/separator"

const buttonGroupVariants = cva(
  [
    "flex w-fit items-stretch",
    "p-1 gap-0.5",
    "[&>*]:focus-visible:z-10 [&>*]:focus-visible:relative",
    "[&>[data-slot=button]]:shadow-none [&>[data-slot=button]]:border-0",
    "[&>[data-slot=button]]:rounded-lg",
    "[&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit",
    "[&>input]:flex-1",
    "has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-lg",
    "has-[>[data-slot=button-group]]:gap-2",
  ],
  {
    variants: {
      orientation: {
        horizontal: "",
        vertical: "flex-col",
      },
      surface: {
        tray: [
          "bg-tray rounded-2xl",
          "border border-border/50",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_6px_rgba(15,23,42,0.04)]",
          // Enhanced hover for buttons on tray surface
          "[&>[data-slot=button]:hover]:bg-background/80",
        ],
        background: [
          "bg-background rounded-2xl",
          "border border-border/60",
          "shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]",
        ],
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      surface: "tray",
    },
  }
)

function ButtonGroup({
  className,
  orientation,
  surface,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation, surface }), className)}
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
        "flex items-center gap-2 px-4 text-sm font-medium",
        "text-muted-foreground",
        "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "bg-border/40 relative !m-0 self-stretch",
        "data-[orientation=vertical]:h-auto data-[orientation=vertical]:w-px",
        "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-auto",
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
