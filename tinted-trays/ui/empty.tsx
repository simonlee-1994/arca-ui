import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const emptyVariants = cva(
  [
    "flex min-w-0 flex-1 flex-col items-center justify-center gap-6",
    "p-8 md:p-12",
    "text-center text-balance",
  ],
  {
    variants: {
      surface: {
        tray: "bg-tray",
        background: "bg-background",
      },
      rim: {
        strong: [
          "rounded-3xl border border-border/40",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_2px_10px_rgba(15,23,42,0.06)]",
        ],
        default: [
          "rounded-3xl border border-border/50",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_6px_rgba(15,23,42,0.04)]",
        ],
        subtle: [
          "rounded-3xl border border-border/60",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_1px_4px_rgba(15,23,42,0.03)]",
        ],
      },
    },
    defaultVariants: {
      surface: "tray",
      rim: "default",
    },
  }
)

type EmptyProps = React.ComponentProps<"div"> & VariantProps<typeof emptyVariants>

function Empty({ className, surface, rim, ...props }: EmptyProps) {
  return (
    <div
      data-slot="empty"
      className={cn(
        emptyVariants({ surface, rim }),
        className
      )}
      {...props}
    />
  )
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn(
        "flex max-w-sm flex-col items-center gap-3 text-center",
        className
      )}
      {...props}
    />
  )
}

const emptyMediaVariants = cva(
  "flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent [&_svg:not([class*='size-'])]:size-6",
        icon: [
          // Capsule styling for icon container
          "flex shrink-0 items-center justify-center",
          "rounded-2xl bg-capsule",
          "border border-border/60",
          "shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]",
          "text-primary",
        ],
      },
      size: {
        sm: "",
        default: "",
        lg: "",
      },
    },
    compoundVariants: [
      // Size variants for default (no container)
      { variant: "default", size: "sm", className: "[&_svg:not([class*='size-'])]:size-5" },
      { variant: "default", size: "default", className: "[&_svg:not([class*='size-'])]:size-6" },
      { variant: "default", size: "lg", className: "[&_svg:not([class*='size-'])]:size-8" },
      // Size variants for icon (with container)
      { variant: "icon", size: "sm", className: "size-10 [&_svg:not([class*='size-'])]:size-4" },
      { variant: "icon", size: "default", className: "size-14 [&_svg:not([class*='size-'])]:size-6" },
      { variant: "icon", size: "lg", className: "size-16 [&_svg:not([class*='size-'])]:size-8" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function EmptyMedia({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      data-size={size}
      className={cn(emptyMediaVariants({ variant, size }), className)}
      {...props}
    />
  )
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn(
        "text-lg font-semibold tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  )
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="empty-description"
      className={cn(
        "text-sm text-muted-foreground leading-relaxed",
        "[&>a]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        "[&>a:hover]:text-primary/80",
        className
      )}
      {...props}
    />
  )
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        // Simple container for action buttons - no capsule wrapper
        "flex w-full max-w-xs min-w-0 flex-col items-center gap-3",
        "text-sm text-balance",
        className
      )}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}
