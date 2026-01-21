"use client"

import { Loader2Icon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const spinnerVariants = cva(
  "animate-spin",
  {
    variants: {
      size: {
        sm: "size-4",
        default: "size-5",
        lg: "size-6",
        xl: "size-8",
      },
      color: {
        primary: "text-primary",
        muted: "text-muted-foreground",
        destructive: "text-destructive",
        foreground: "text-foreground",
        inherit: "text-inherit",
      },
    },
    defaultVariants: {
      size: "default",
      color: "primary",
    },
  }
)

interface SpinnerProps
  extends Omit<React.ComponentProps<"svg">, "color">,
    VariantProps<typeof spinnerVariants> {}

function Spinner({ className, size, color, ...props }: SpinnerProps) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn(spinnerVariants({ size, color, className }))}
      {...props}
    />
  )
}

// Dots Spinner - bouncing dots
interface DotsSpinnerProps extends Omit<React.ComponentProps<"div">, "color"> {
  size?: "sm" | "default" | "lg" | "xl"
  color?: "primary" | "muted" | "destructive" | "foreground" | "inherit"
}

function DotsSpinner({ className, size = "default", color = "primary", ...props }: DotsSpinnerProps) {
  const dotSizes = {
    sm: "size-1.5",
    default: "size-2",
    lg: "size-2.5",
    xl: "size-3",
  }

  const gapSizes = {
    sm: "gap-1",
    default: "gap-1.5",
    lg: "gap-2",
    xl: "gap-2.5",
  }

  const colorClasses = {
    primary: "bg-primary",
    muted: "bg-muted-foreground",
    destructive: "bg-destructive",
    foreground: "bg-foreground",
    inherit: "bg-current",
  }

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("flex items-center", gapSizes[size], className)}
      {...props}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "rounded-full animate-bounce",
            dotSizes[size],
            colorClasses[color]
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

// Pulse Spinner - expanding ring
interface PulseSpinnerProps extends Omit<React.ComponentProps<"div">, "color"> {
  size?: "sm" | "default" | "lg" | "xl"
  color?: "primary" | "muted" | "destructive" | "foreground" | "inherit"
}

function PulseSpinner({ className, size = "default", color = "primary", ...props }: PulseSpinnerProps) {
  const sizes = {
    sm: "size-4",
    default: "size-5",
    lg: "size-6",
    xl: "size-8",
  }

  const colorClasses = {
    primary: "border-primary",
    muted: "border-muted-foreground",
    destructive: "border-destructive",
    foreground: "border-foreground",
    inherit: "border-current",
  }

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("relative", sizes[size], className)}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-full border-2 animate-ping opacity-75",
          colorClasses[color]
        )}
      />
      <div
        className={cn(
          "absolute inset-0 rounded-full border-2",
          colorClasses[color]
        )}
      />
    </div>
  )
}

// Bars Spinner - vertical bars
interface BarsSpinnerProps extends Omit<React.ComponentProps<"div">, "color"> {
  size?: "sm" | "default" | "lg" | "xl"
  color?: "primary" | "muted" | "destructive" | "foreground" | "inherit"
}

function BarsSpinner({ className, size = "default", color = "primary", ...props }: BarsSpinnerProps) {
  const barWidths = {
    sm: "w-0.5",
    default: "w-1",
    lg: "w-1.5",
    xl: "w-2",
  }

  const heights = {
    sm: "h-3",
    default: "h-4",
    lg: "h-5",
    xl: "h-6",
  }

  const colorClasses = {
    primary: "bg-primary",
    muted: "bg-muted-foreground",
    destructive: "bg-destructive",
    foreground: "bg-foreground",
    inherit: "bg-current",
  }

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("flex items-center gap-0.5", heights[size], className)}
      {...props}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={cn(
            "rounded-full animate-pulse",
            barWidths[size],
            colorClasses[color]
          )}
          style={{
            height: "100%",
            animation: "bars-spinner 1s ease-in-out infinite",
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes bars-spinner {
          0%, 100% {
            transform: scaleY(0.4);
            opacity: 0.4;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

// Wave Spinner - flowing wave dots
interface WaveSpinnerProps extends Omit<React.ComponentProps<"div">, "color"> {
  size?: "sm" | "default" | "lg" | "xl"
  color?: "primary" | "muted" | "destructive" | "foreground" | "inherit"
}

function WaveSpinner({ className, size = "default", color = "primary", ...props }: WaveSpinnerProps) {
  const dotSizes = {
    sm: "size-1",
    default: "size-1.5",
    lg: "size-2",
    xl: "size-2.5",
  }

  const gapSizes = {
    sm: "gap-0.5",
    default: "gap-1",
    lg: "gap-1.5",
    xl: "gap-2",
  }

  const colorClasses = {
    primary: "bg-primary",
    muted: "bg-muted-foreground",
    destructive: "bg-destructive",
    foreground: "bg-foreground",
    inherit: "bg-current",
  }

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("flex items-center", gapSizes[size], className)}
      {...props}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={cn("rounded-full", dotSizes[size], colorClasses[color])}
          style={{
            animation: "wave-spinner 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes wave-spinner {
          0%, 40%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          20% {
            transform: translateY(-6px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

// Orbit Spinner - rotating dots around center
interface OrbitSpinnerProps extends Omit<React.ComponentProps<"div">, "color"> {
  size?: "sm" | "default" | "lg" | "xl"
  color?: "primary" | "muted" | "destructive" | "foreground" | "inherit"
}

function OrbitSpinner({ className, size = "default", color = "primary", ...props }: OrbitSpinnerProps) {
  const containerSizes = {
    sm: "size-4",
    default: "size-5",
    lg: "size-6",
    xl: "size-8",
  }

  const dotSizes = {
    sm: "size-1",
    default: "size-1.5",
    lg: "size-2",
    xl: "size-2.5",
  }

  const colorClasses = {
    primary: "bg-primary",
    muted: "bg-muted-foreground",
    destructive: "bg-destructive",
    foreground: "bg-foreground",
    inherit: "bg-current",
  }

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("relative animate-spin", containerSizes[size], className)}
      style={{ animationDuration: "1s" }}
      {...props}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "absolute rounded-full",
            dotSizes[size],
            colorClasses[color]
          )}
          style={{
            top: "50%",
            left: "50%",
            transform: `rotate(${i * 120}deg) translateX(${size === "sm" ? 6 : size === "xl" ? 12 : 8}px) translateY(-50%)`,
            opacity: 1 - i * 0.25,
          }}
        />
      ))}
    </div>
  )
}

// Ring Spinner - partial ring spinner
interface RingSpinnerProps extends Omit<React.ComponentProps<"div">, "color"> {
  size?: "sm" | "default" | "lg" | "xl"
  color?: "primary" | "muted" | "destructive" | "foreground" | "inherit"
}

function RingSpinner({ className, size = "default", color = "primary", ...props }: RingSpinnerProps) {
  const sizes = {
    sm: "size-4",
    default: "size-5",
    lg: "size-6",
    xl: "size-8",
  }

  const borderSizes = {
    sm: "border-2",
    default: "border-2",
    lg: "border-[3px]",
    xl: "border-4",
  }

  const colorClasses = {
    primary: "border-primary",
    muted: "border-muted-foreground",
    destructive: "border-destructive",
    foreground: "border-foreground",
    inherit: "border-current",
  }

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "rounded-full animate-spin border-transparent border-t-current",
        sizes[size],
        borderSizes[size],
        colorClasses[color],
        className
      )}
      style={{ animationDuration: "0.75s" }}
      {...props}
    />
  )
}

export {
  Spinner,
  DotsSpinner,
  PulseSpinner,
  BarsSpinner,
  WaveSpinner,
  OrbitSpinner,
  RingSpinner,
  spinnerVariants,
}
