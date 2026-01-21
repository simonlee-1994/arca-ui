"use client"

import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const spinnerVariants = cva(
  "",
  {
    variants: {
      size: {
        sm: "size-4",
        default: "size-6",
        lg: "size-8",
        xl: "size-12",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

// Classic spinning circle
function Spinner({
  className,
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof spinnerVariants>) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "animate-spin rounded-full border-2 border-foreground border-t-transparent",
        spinnerVariants({ size, className })
      )}
      {...props}
    />
  )
}

// Pulsing dot spinner
function SpinnerDots({
  className,
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof spinnerVariants>) {
  const dotSize = {
    sm: "size-1.5",
    default: "size-2",
    lg: "size-2.5",
    xl: "size-3",
  }
  const gap = {
    sm: "gap-1",
    default: "gap-1.5",
    lg: "gap-2",
    xl: "gap-3",
  }

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("flex items-center", gap[size || "default"], className)}
      {...props}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "rounded-full bg-foreground animate-bounce",
            dotSize[size || "default"]
          )}
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: "0.6s",
          }}
        />
      ))}
    </div>
  )
}

// Pulsing circle
function SpinnerPulse({
  className,
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof spinnerVariants>) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "rounded-full border-2 border-foreground bg-foreground/20 animate-pulse",
        spinnerVariants({ size, className })
      )}
      {...props}
    />
  )
}

// Orbiting dots
function SpinnerOrbit({
  className,
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof spinnerVariants>) {
  const dotSize = {
    sm: "size-1",
    default: "size-1.5",
    lg: "size-2",
    xl: "size-3",
  }

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "relative animate-spin",
        spinnerVariants({ size, className })
      )}
      style={{ animationDuration: "1.2s" }}
      {...props}
    >
      <div className={cn("absolute top-0 left-1/2 -translate-x-1/2 rounded-full bg-foreground", dotSize[size || "default"])} />
      <div className={cn("absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-foreground/40", dotSize[size || "default"])} />
      <div className={cn("absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-foreground/60", dotSize[size || "default"])} />
      <div className={cn("absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-foreground/20", dotSize[size || "default"])} />
    </div>
  )
}

// Bar spinner
function SpinnerBars({
  className,
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof spinnerVariants>) {
  const barHeight = {
    sm: "h-3",
    default: "h-4",
    lg: "h-5",
    xl: "h-6",
  }
  const barWidth = {
    sm: "w-0.5",
    default: "w-1",
    lg: "w-1.5",
    xl: "w-2",
  }

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("flex items-end gap-0.5", className)}
      {...props}
    >
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={cn(
            "rounded-full bg-foreground",
            barWidth[size || "default"],
            barHeight[size || "default"]
          )}
          style={{
            animation: "spinnerBars 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes spinnerBars {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  )
}

// Ring spinner with thicker stroke
function SpinnerRing({
  className,
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof spinnerVariants>) {
  const strokeWidth = {
    sm: "border-2",
    default: "border-[3px]",
    lg: "border-4",
    xl: "border-[5px]",
  }

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "relative",
        spinnerVariants({ size, className })
      )}
      {...props}
    >
      <div className={cn("absolute inset-0 rounded-full border-secondary", strokeWidth[size || "default"])} />
      <div
        className={cn(
          "absolute inset-0 rounded-full border-transparent border-t-foreground border-r-foreground animate-spin",
          strokeWidth[size || "default"]
        )}
        style={{ animationDuration: "0.8s" }}
      />
    </div>
  )
}

export { Spinner, SpinnerDots, SpinnerPulse, SpinnerOrbit, SpinnerBars, SpinnerRing, spinnerVariants }
