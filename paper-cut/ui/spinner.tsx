import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const spinnerVariants = cva("", {
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
})

interface SpinnerProps
  extends React.ComponentProps<"svg">,
    VariantProps<typeof spinnerVariants> {}

function Spinner({ className, size, ...props }: SpinnerProps) {
  return (
    <svg
      role="status"
      aria-label="Loading"
      viewBox="0 0 24 24"
      fill="none"
      className={cn("animate-spin", spinnerVariants({ size }), className)}
      {...props}
    >
      {/* Paper-style circular spinner with solid offset shadow effect */}
      <circle
        cx="12"
        cy="12"
        r="9"
        strokeWidth="3"
        className="stroke-paper-edge opacity-20"
      />
      <path
        d="M12 3a9 9 0 0 1 9 9"
        strokeWidth="3"
        strokeLinecap="round"
        className="stroke-primary"
      />
    </svg>
  )
}

// Dots Spinner - Three bouncing dots
interface DotsSpinnerProps extends React.ComponentProps<"div">, VariantProps<typeof spinnerVariants> {}

function DotsSpinner({ className, size, ...props }: DotsSpinnerProps) {
  const dotSizeClass = size === "sm" ? "size-1.5" : size === "lg" ? "size-3" : size === "xl" ? "size-4" : "size-2"
  const gapClass = size === "sm" ? "gap-1" : size === "lg" ? "gap-2" : size === "xl" ? "gap-3" : "gap-1.5"

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("flex items-center", gapClass, className)}
      {...props}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            dotSizeClass,
            "shrink-0 rounded-full bg-primary animate-[pulse_900ms_ease-in-out_infinite]"
          )}
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  )
}

// Pulse Spinner - Growing and fading circle
function PulseSpinner({ className, size, ...props }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("relative", spinnerVariants({ size }), className)}
    >
      <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
      <div className="absolute inset-[25%] rounded-full bg-primary animate-pulse" />
    </div>
  )
}

// Bars Spinner - Animated bars
interface BarsSpinnerProps extends React.ComponentProps<"div">, VariantProps<typeof spinnerVariants> {}

function BarsSpinner({ className, size, ...props }: BarsSpinnerProps) {
  const barHeight = size === "sm" ? "h-3" : size === "lg" ? "h-6" : size === "xl" ? "h-8" : "h-4"
  const barWidth = size === "sm" ? "w-0.5" : size === "lg" ? "w-1.5" : size === "xl" ? "w-2" : "w-1"
  const gapClass = size === "sm" ? "gap-0.5" : size === "lg" ? "gap-1" : size === "xl" ? "gap-1.5" : "gap-0.5"

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("flex items-center", gapClass, className)}
      {...props}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={cn(barWidth, barHeight, "bg-primary rounded-full animate-[scaleY_1s_ease-in-out_infinite]")}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  )
}

// Ring Spinner - Rotating ring with gradient
function RingSpinner({ className, size, ...props }: SpinnerProps) {
  return (
    <svg
      role="status"
      aria-label="Loading"
      viewBox="0 0 24 24"
      fill="none"
      className={cn("animate-spin", spinnerVariants({ size }), className)}
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        strokeWidth="2"
        className="stroke-paper-edge"
      />
      <circle
        cx="12"
        cy="12"
        r="10"
        strokeWidth="2"
        strokeDasharray="32 32"
        strokeLinecap="round"
        className="stroke-primary"
      />
    </svg>
  )
}

// Orbit Spinner - Orbiting dot
function OrbitSpinner({ className, size, ...props }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("relative", spinnerVariants({ size }), className)}
    >
      <div className="absolute inset-0 rounded-full border-2 border-paper-edge" />
      <div className="absolute inset-0 animate-spin">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-2 rounded-full bg-primary" />
      </div>
    </div>
  )
}

// Square Spinner - Rotating square
function SquareSpinner({ className, size, ...props }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("relative", spinnerVariants({ size }), className)}
    >
      <div className="absolute inset-[15%] rounded-md bg-primary animate-[spin_1.5s_ease-in-out_infinite]" />
    </div>
  )
}

// Grid Spinner - 3x3 grid dots
function GridSpinner({ className, size, ...props }: SpinnerProps) {
  const dotSize = size === "sm" ? "size-1" : size === "lg" ? "size-2" : size === "xl" ? "size-2.5" : "size-1.5"
  const gap = size === "sm" ? "gap-0.5" : size === "lg" ? "gap-1" : size === "xl" ? "gap-1.5" : "gap-0.5"

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("grid grid-cols-3", gap, className)}
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
        const row = Math.floor(i / 3)
        const col = i % 3
        return (
          <div
            key={i}
            className={cn(
              dotSize,
              "shrink-0 rounded-full bg-primary animate-[bounce_1.2s_ease-in-out_infinite]"
            )}
            style={{ animationDelay: `${(row + col) * 0.12}s` }}
          />
        )
      })}
    </div>
  )
}

// Flip Spinner - Flipping card
function FlipSpinner({ className, size, ...props }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("perspective-[100px]", spinnerVariants({ size }), className)}
    >
      <div className="size-full rounded-lg bg-primary animate-[flip_1.5s_ease-in-out_infinite]" />
    </div>
  )
}

// Wave Spinner - Wave animation
interface WaveSpinnerProps extends React.ComponentProps<"div">, VariantProps<typeof spinnerVariants> {}

function WaveSpinner({ className, size, ...props }: WaveSpinnerProps) {
  const dotSize = size === "sm" ? "size-1.5" : size === "lg" ? "size-3" : size === "xl" ? "size-4" : "size-2"
  const gap = size === "sm" ? "gap-0.5" : size === "lg" ? "gap-1.5" : size === "xl" ? "gap-2" : "gap-1"

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("flex items-center", gap, className)}
      {...props}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={cn(dotSize, "rounded-full bg-primary animate-[wave_1.2s_ease-in-out_infinite]")}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  )
}

const spinnerCardVariants = cva(
  "inline-flex items-center justify-center gap-3 rounded-[20px] border border-paper-edge p-4 transition-all duration-paper ease-paper",
  {
    variants: {
      elevation: {
        flat: "bg-secondary/60 shadow-paper-none",
        section: "bg-card shadow-paper-sm",
        elevated:
          "bg-card shadow-paper-md hover:shadow-paper-lg hover:-translate-x-[var(--paper-lift-md)] hover:-translate-y-[var(--paper-lift-md)]",
      },
    },
    defaultVariants: {
      elevation: "flat",
    },
  }
)

type SpinnerCardProps = React.ComponentProps<"div"> &
  VariantProps<typeof spinnerCardVariants> & {
    spinnerSize?: VariantProps<typeof spinnerVariants>["size"]
  }

function SpinnerCard({
  className,
  children,
  spinnerSize,
  elevation,
  ...props
}: SpinnerCardProps) {
  return (
    <div
      className={cn(
        spinnerCardVariants({ elevation }),
        className
      )}
      {...props}
    >
      <Spinner size={spinnerSize} />
      {children}
    </div>
  )
}

export {
  Spinner,
  SpinnerCard,
  DotsSpinner,
  PulseSpinner,
  BarsSpinner,
  RingSpinner,
  OrbitSpinner,
  SquareSpinner,
  GridSpinner,
  FlipSpinner,
  WaveSpinner,
}
