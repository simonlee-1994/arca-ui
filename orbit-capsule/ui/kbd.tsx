import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const kbdVariants = cva(
  "bg-background text-foreground pointer-events-none inline-flex w-fit items-center justify-center gap-1 rounded-full border border-foreground font-mono font-medium select-none",
  {
    variants: {
      size: {
        sm: "h-5 min-w-5 px-1.5 text-[10px] [&_svg:not([class*='size-'])]:size-2.5",
        default: "h-6 min-w-6 px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        lg: "h-8 min-w-8 px-3 text-sm [&_svg:not([class*='size-'])]:size-4",
      },
      interactive: {
        true: "pointer-events-auto cursor-pointer transition-all hover:bg-secondary active:bg-secondary/80",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      interactive: false,
    },
  }
)

function Kbd({
  className,
  size,
  interactive,
  ...props
}: React.ComponentProps<"kbd"> & VariantProps<typeof kbdVariants>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        kbdVariants({ size, interactive }),
        "[[data-slot=tooltip-content]_&]:bg-background/90 [[data-slot=tooltip-content]_&]:text-foreground [[data-slot=tooltip-content]_&]:border-background/50 dark:[[data-slot=tooltip-content]_&]:bg-background/10",
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
