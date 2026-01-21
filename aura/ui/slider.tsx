"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const sliderRangeVariants = cva(
  "absolute rounded-full data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-primary",
        success: "bg-green-500",
        warning: "bg-amber-500",
        destructive: "bg-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const sliderThumbVariants = cva(
  "block size-5 shrink-0 rounded-full bg-background shadow-md transition-all duration-300 ease-out ring-primary/20 hover:scale-110 hover:shadow-lg hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden active:scale-95 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-2 border-primary",
        success: "border-2 border-green-500 ring-green-500/20",
        warning: "border-2 border-amber-500 ring-amber-500/20",
        destructive: "border-2 border-destructive ring-destructive/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface SliderProps
  extends React.ComponentProps<typeof SliderPrimitive.Root>,
    VariantProps<typeof sliderRangeVariants> {}

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  variant,
  ...props
}: SliderProps) {
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
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "bg-accent/60 relative grow overflow-hidden rounded-full shadow-inner data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2.5"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={sliderRangeVariants({ variant })}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className={sliderThumbVariants({ variant })}
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
