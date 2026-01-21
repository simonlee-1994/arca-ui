import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/themes/orbit-capsule/separator"

const buttonGroupVariants = cva(
  "orbit-hover-offset-sm flex w-fit items-stretch rounded-full border border-foreground bg-background overflow-hidden [&>*]:focus-visible:z-10 [&>*]:focus-visible:relative [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-full has-[>[data-slot=button-group]]:gap-2",
  {
    variants: {
      orientation: {
        horizontal:
          "[&>*]:rounded-none [&>*]:border-0 [&>*:not(:last-child)]:border-r [&>*:not(:last-child)]:border-foreground/20 [&>*]:shadow-none [&>*]:hover:shadow-none [&>*]:hover:translate-y-0 [&>*]:active:bg-secondary/80 [&>*]:active:scale-[0.96] [&>*]:transition-transform",
        vertical:
          "flex-col rounded-lg [&>*]:rounded-none [&>*]:border-0 [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-foreground/20 [&>*]:shadow-none [&>*]:hover:shadow-none [&>*]:hover:translate-y-0 [&>*]:active:bg-secondary/80 [&>*]:active:scale-[0.96] [&>*]:transition-transform",
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
        "bg-secondary/40 flex items-center gap-2 px-4 text-sm font-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
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
        "bg-foreground/20 relative !m-0 self-stretch data-[orientation=vertical]:h-auto data-[orientation=vertical]:w-px",
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
