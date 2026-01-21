"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const thumbCount = value?.length ?? defaultValue?.length ?? 1

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      orientation={orientation}
      className={cn(
        "relative flex touch-none select-none items-center",
        orientation === "horizontal" ? "w-full" : "flex-col",
        className
      )}
      defaultValue={defaultValue}
      value={value}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "relative grow overflow-hidden rounded-full bg-foreground/12",
          orientation === "horizontal" ? "h-2 w-full" : "h-full w-2"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "absolute bg-foreground",
            orientation === "horizontal" ? "h-full" : "w-full"
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbCount }).map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          data-slot="slider-thumb"
          className={cn(
            "block size-5 rounded-full border border-border bg-background shadow-clarity-sm transition-colors duration-200",
            "hover:border-border-hover",
            "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "disabled:pointer-events-none disabled:opacity-50"
          )}
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
