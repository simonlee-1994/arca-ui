import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const kbdVariants = cva(
  [
    "inline-flex h-6 w-fit min-w-6 items-center justify-center gap-1 rounded-lg px-1.5 font-sans text-xs font-medium select-none",
    "border shadow-sm",
    "transition-all duration-200",
    "[&_svg:not([class*='size-'])]:size-3",
    "[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background [[data-slot=tooltip-content]_&]:border-background/30 dark:[[data-slot=tooltip-content]_&]:bg-background/10",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-secondary/80 text-muted-foreground border-border/50",
        ],
        interactive: [
          "bg-secondary/80 text-muted-foreground border-border/50 cursor-pointer",
          "hover:bg-secondary hover:border-border hover:shadow-md hover:-translate-y-0.5",
          "active:translate-y-0 active:shadow-sm active:bg-secondary/90",
        ],
        outline: [
          "bg-background text-foreground border-border",
          "hover:bg-accent/30 hover:border-primary/40",
        ],
        ghost: [
          "bg-transparent text-muted-foreground border-transparent shadow-none",
          "hover:bg-secondary/50 hover:border-border/30",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Kbd({
  className,
  variant,
  ...props
}: React.ComponentProps<"kbd"> & VariantProps<typeof kbdVariants>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(kbdVariants({ variant, className }))}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup, kbdVariants }
