"use client"

import { cn } from "@/lib/utils"

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "dots" | "pulse" | "bars" | "ring"
}

function Spinner({ className, size = "md", variant = "default", ...props }: SpinnerProps) {
  const sizeClasses = {
    sm: "size-4",
    md: "size-6",
    lg: "size-8",
  }

  const dotSizeClasses = {
    sm: "size-1",
    md: "size-1.5",
    lg: "size-2",
  }

  const barSizeClasses = {
    sm: { width: "w-0.5", height: "h-2" },
    md: { width: "w-1", height: "h-3" },
    lg: { width: "w-1.5", height: "h-4" },
  }

  if (variant === "dots") {
    return (
      <div
        role="status"
        aria-label="Loading"
        data-slot="spinner"
        className={cn("flex items-center gap-1", className)}
        {...props}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "rounded-full bg-current animate-bounce",
              dotSizeClasses[size]
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

  if (variant === "pulse") {
    return (
      <div
        role="status"
        aria-label="Loading"
        data-slot="spinner"
        className={cn(
          "rounded-full bg-current animate-pulse",
          sizeClasses[size],
          className
        )}
        style={{
          animationDuration: "1s",
        }}
        {...props}
      />
    )
  }

  if (variant === "bars") {
    return (
      <div
        role="status"
        aria-label="Loading"
        data-slot="spinner"
        className={cn("flex items-end gap-0.5", className)}
        {...props}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "bg-current rounded-sm animate-[spinner-bars_1s_ease-in-out_infinite]",
              barSizeClasses[size].width,
              barSizeClasses[size].height
            )}
            style={{
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === "ring") {
    return (
      <div
        role="status"
        aria-label="Loading"
        data-slot="spinner"
        className={cn(
          "rounded-full border-2 border-current border-t-transparent animate-spin",
          sizeClasses[size],
          className
        )}
        style={{
          animationDuration: "0.8s",
        }}
        {...props}
      />
    )
  }

  // Default spinner
  return (
    <svg
      role="status"
      aria-label="Loading"
      data-slot="spinner"
      className={cn("animate-spin text-foreground-muted", sizeClasses[size], className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...(props as React.SVGAttributes<SVGElement>)}
    >
      <circle
        className="opacity-20"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <circle
        className="opacity-80"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="18 80"
        transform="rotate(-90 12 12)"
      />
    </svg>
  )
}

export { Spinner }
