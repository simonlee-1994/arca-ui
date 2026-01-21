import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const kbdVariants = cva(
  [
    "pointer-events-none inline-flex w-fit items-center justify-center gap-1 rounded-lg font-sans font-medium select-none",
    "text-foreground border border-border/60",
    // Cool shadow system (no pure black)
    "shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85),inset_0_-1px_0_rgba(15,23,42,0.06)]",
  ],
  {
    variants: {
      surface: {
        // Default: tray surface for use on white canvas
        tray: "bg-tray",
        // Capsule surface for use inside colored containers (like white cards on tray)
        capsule: "bg-capsule",
      },
      size: {
        sm: "h-5 min-w-5 px-1.5 text-[10px] [&_svg:not([class*='size-'])]:size-2.5",
        default: "h-6 min-w-6 px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
      },
    },
    defaultVariants: {
      surface: "tray",
      size: "default",
    },
  }
)

function Kbd({
  className,
  size = "default",
  surface = "tray",
  ...props
}: React.ComponentProps<"kbd"> & VariantProps<typeof kbdVariants>) {
  return (
    <kbd
      data-slot="kbd"
      data-size={size}
      data-surface={surface}
      className={cn(kbdVariants({ size, surface, className }))}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="kbd-group"
      className={cn(
        "inline-flex items-center gap-1.5",
        className
      )}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
