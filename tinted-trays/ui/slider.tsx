"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const sliderRangeVariants = cva(
  [
    "absolute rounded-full",
    "data-[orientation=horizontal]:h-full",
    "data-[orientation=vertical]:w-full",
  ],
  {
    variants: {
      color: {
        default: [
          "bg-chart-3",
        ],
        primary: [
          "bg-primary",
        ],
        soft: [
          "bg-chart-4",
        ],
        muted: [
          "bg-muted-foreground/40",
        ],
        success: [
          "bg-emerald-500",
        ],
        warning: [
          "bg-amber-500",
        ],
      },
    },
    defaultVariants: {
      color: "default",
    },
  }
)

const sliderThumbVariants = cva(
  [
    "block size-5 shrink-0 rounded-full",
    "bg-background",
    "shadow-[0_1px_3px_rgba(15,23,42,0.10),inset_0_1px_0_rgba(255,255,255,0.85)]",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      color: {
        default: [
          "border-2 border-chart-3",
          "hover:shadow-[0_2px_8px_rgba(96,165,250,0.25),inset_0_1px_0_rgba(255,255,255,0.9)]",
          "focus-visible:ring-chart-3/30",
        ],
        primary: [
          "border-2 border-primary",
          "hover:shadow-[0_2px_8px_rgba(37,99,235,0.25),inset_0_1px_0_rgba(255,255,255,0.9)]",
          "focus-visible:ring-primary/30",
        ],
        soft: [
          "border-2 border-chart-4",
          "hover:shadow-[0_2px_8px_rgba(147,197,253,0.25),inset_0_1px_0_rgba(255,255,255,0.9)]",
          "focus-visible:ring-chart-4/30",
        ],
        muted: [
          "border-2 border-muted-foreground/40",
          "hover:shadow-[0_2px_8px_rgba(100,116,139,0.2),inset_0_1px_0_rgba(255,255,255,0.9)]",
          "focus-visible:ring-muted-foreground/20",
        ],
        success: [
          "border-2 border-emerald-500",
          "hover:shadow-[0_2px_8px_rgba(16,185,129,0.25),inset_0_1px_0_rgba(255,255,255,0.9)]",
          "focus-visible:ring-emerald-500/30",
        ],
        warning: [
          "border-2 border-amber-500",
          "hover:shadow-[0_2px_8px_rgba(245,158,11,0.25),inset_0_1px_0_rgba(255,255,255,0.9)]",
          "focus-visible:ring-amber-500/30",
        ],
      },
    },
    defaultVariants: {
      color: "default",
    },
  }
)

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  color,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> &
  VariantProps<typeof sliderRangeVariants>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none",
        "data-[disabled]:opacity-50",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "relative grow overflow-hidden rounded-full",
          // Tinted Trays: Tray-tinted track with micro-bevel rim
          "bg-tray border border-border/60",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_4px_rgba(15,23,42,0.06)]",
          "data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full",
          "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(sliderRangeVariants({ color }))}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className={cn(sliderThumbVariants({ color }))}
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider, sliderRangeVariants }
