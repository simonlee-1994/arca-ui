"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { motion, useSpring, useTransform } from "framer-motion"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-2.5 w-full overflow-hidden rounded-full bg-secondary/60",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full rounded-full bg-primary shadow-sm transition-all duration-500 ease-out"
        style={{ width: `${value || 0}%` }}
      />
    </ProgressPrimitive.Root>
  )
}

// Progress with animated value using framer-motion
function ProgressAnimated({
  className,
  value = 0,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  const springValue = useSpring(0, { stiffness: 100, damping: 30 })
  const width = useTransform(springValue, (v) => `${v}%`)

  React.useEffect(() => {
    springValue.set(value ?? 0)
  }, [springValue, value])

  return (
    <ProgressPrimitive.Root
      data-slot="progress-animated"
      className={cn(
        "relative h-2.5 w-full overflow-hidden rounded-full bg-secondary/60",
        className
      )}
      {...props}
    >
      <motion.div
        className="h-full rounded-full bg-primary shadow-sm"
        style={{ width }}
      />
    </ProgressPrimitive.Root>
  )
}

// Striped progress bar
function ProgressStriped({
  className,
  value,
  animated = false,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  animated?: boolean
}) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress-striped"
      className={cn(
        "relative h-2.5 w-full overflow-hidden rounded-full bg-secondary/60",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "h-full rounded-full bg-primary transition-all duration-500 ease-out",
          "bg-[length:1rem_1rem] bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)]",
          animated && "animate-[progress-stripes_1s_linear_infinite]"
        )}
        style={{ width: `${value || 0}%` }}
      />
    </ProgressPrimitive.Root>
  )
}

// Pulsing progress (indeterminate)
function ProgressPulse({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ProgressPrimitive.Root>, "value">) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress-pulse"
      className={cn(
        "relative h-2.5 w-full overflow-hidden rounded-full bg-secondary/60",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent" />
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-gradient-to-r from-transparent via-primary/70 to-transparent blur-[2px]"
        animate={{ x: ["-60%", "120%"] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: [0.4, 0, 0.2, 1],
        }}
      />
    </ProgressPrimitive.Root>
  )
}

// Gradient progress with custom colors
function ProgressGradient({
  className,
  value,
  gradientFrom = "from-emerald-400",
  gradientVia = "via-primary",
  gradientTo = "to-teal-500",
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  gradientFrom?: string
  gradientVia?: string
  gradientTo?: string
}) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress-gradient"
      className={cn(
        "relative h-2.5 w-full overflow-hidden rounded-full bg-secondary/60",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "h-full rounded-full bg-gradient-to-r shadow-sm transition-all duration-500 ease-out",
          gradientFrom,
          gradientVia,
          gradientTo
        )}
        style={{ width: `${value || 0}%` }}
      />
    </ProgressPrimitive.Root>
  )
}

function ProgressPill({
  className,
  value,
  showValue = false,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  showValue?: boolean
}) {
  return (
    <div className="flex items-center gap-3">
      <ProgressPrimitive.Root
        data-slot="progress-pill"
        className={cn(
          "relative h-2.5 flex-1 overflow-hidden rounded-full bg-secondary/60",
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${value || 0}%` }}
        />
      </ProgressPrimitive.Root>
      {showValue && (
        <span className="text-sm font-medium text-muted-foreground min-w-[3ch] text-right">
          {value}%
        </span>
      )}
    </div>
  )
}

function ProgressSteps({
  steps,
  currentStep,
  className,
}: {
  steps: number
  currentStep: number
  className?: string
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {Array.from({ length: steps }).map((_, i) => (
        <motion.div
          key={i}
          className={cn(
            "h-2 flex-1 rounded-full",
            i < currentStep
              ? "bg-primary"
              : i === currentStep
                ? "bg-primary/50"
                : "bg-secondary/60"
          )}
          initial={false}
          animate={{
            scale: i === currentStep ? [1, 1.05, 1] : 1,
          }}
          transition={{
            duration: 0.3,
          }}
        />
      ))}
    </div>
  )
}

// Circular progress
function ProgressCircular({
  value = 0,
  size = 120,
  strokeWidth = 8,
  className,
  showValue = false,
}: {
  value?: number
  size?: number
  strokeWidth?: number
  className?: string
  showValue?: boolean
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const springValue = useSpring(0, { stiffness: 100, damping: 30 })
  const offset = useTransform(springValue, (v) => circumference - (v / 100) * circumference)

  React.useEffect(() => {
    springValue.set(value ?? 0)
  }, [springValue, value])

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-secondary/60"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="text-primary"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
      </svg>
      {showValue && (
        <motion.span
          className="absolute text-lg font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {Math.round(value)}%
        </motion.span>
      )}
    </div>
  )
}

// Segmented progress
function ProgressSegmented({
  value = 0,
  segments = 10,
  className,
}: {
  value?: number
  segments?: number
  className?: string
}) {
  const filledSegments = Math.round((value / 100) * segments)

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: segments }).map((_, i) => (
        <motion.div
          key={i}
          className={cn(
            "h-2.5 flex-1 rounded-sm first:rounded-l-full last:rounded-r-full",
            i < filledSegments ? "bg-primary" : "bg-secondary/60"
          )}
          initial={false}
          animate={{
            scale: i === filledSegments - 1 && filledSegments > 0 ? [1, 1.1, 1] : 1,
            opacity: i < filledSegments ? 1 : 0.5,
          }}
          transition={{ duration: 0.2 }}
        />
      ))}
    </div>
  )
}

export {
  Progress,
  ProgressAnimated,
  ProgressStriped,
  ProgressPulse,
  ProgressGradient,
  ProgressPill,
  ProgressSteps,
  ProgressCircular,
  ProgressSegmented,
}
