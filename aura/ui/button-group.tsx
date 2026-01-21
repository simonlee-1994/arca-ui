import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/themes/aura/separator"

const buttonGroupVariants = cva(
  "flex w-fit items-stretch rounded-2xl shadow-[var(--aura-shadow-card)] border border-border/60 transition-all duration-300 hover:shadow-[var(--aura-shadow-card-hover)] [&_[data-slot=button]]:shadow-none [&_[data-slot=button]:hover]:shadow-none [&_[data-slot=button]:hover]:translate-y-0 [&>*]:focus-visible:z-10 [&>*]:focus-visible:relative [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-xl has-[>[data-slot=button-group]]:gap-2",
  {
    variants: {
      orientation: {
        horizontal:
          "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none [&>*:first-child]:rounded-l-[calc(var(--radius)+3px)] [&>*:last-child]:rounded-r-[calc(var(--radius)+3px)] [&>*]:rounded-none",
        vertical:
          "flex-col rounded-3xl [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none [&>*:first-child]:rounded-t-[calc(var(--radius)+7px)] [&>*:last-child]:rounded-b-[calc(var(--radius)+7px)] [&>*]:rounded-none",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
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
        "bg-secondary/50 flex items-center gap-2 px-4 text-sm font-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 transition-colors duration-300",
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
        "bg-border/60 relative m-0 self-stretch data-[orientation=vertical]:h-auto",
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
