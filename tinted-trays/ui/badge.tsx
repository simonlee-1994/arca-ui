import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0",
    "[&>svg]:size-3.5 gap-1.5 [&>svg]:pointer-events-none",
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
    "transition-all duration-200 overflow-hidden",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-transparent bg-primary text-primary-foreground",
          "shadow-[0_1px_2px_rgba(15,23,42,0.08)]",
          "[a&]:hover:bg-primary/90",
        ],
        secondary: [
          "border-border/60 bg-tray text-tray-foreground",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_1px_4px_rgba(15,23,42,0.03)]",
          "[a&]:hover:bg-tray/70",
        ],
        destructive: [
          "border-transparent bg-[#FEF2F2] text-[#991B1B]",
          "shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)]",
          "[a&]:hover:bg-[#FEE2E2]",
        ],
        outline: [
          "border-border/60 bg-capsule text-foreground",
          "shadow-[0_1px_2px_rgba(15,23,42,0.06)]",
          "[a&]:hover:border-primary [a&]:hover:text-primary",
        ],
        success: [
          "border-transparent bg-[#F0FDF4] text-[#166534]",
          "shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)]",
          "[a&]:hover:bg-[#DCFCE7]",
        ],
        warning: [
          "border-transparent bg-[#FFFBEB] text-[#92400E]",
          "shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)]",
          "[a&]:hover:bg-[#FEF3C7]",
        ],
        info: [
          "border-transparent bg-[#F0F7FF] text-[#1E40AF]",
          "shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)]",
          "[a&]:hover:bg-[#DBEAFE]",
        ],
        capsule: [
          "border border-border/60 bg-capsule text-foreground",
          "shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]",
          "[a&]:hover:border-primary/50 [a&]:hover:shadow-[0_2px_6px_rgba(15,23,42,0.10),inset_0_1px_0_rgba(255,255,255,0.9)]",
        ],
      },
      size: {
        default: "px-3 py-1 text-xs",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
