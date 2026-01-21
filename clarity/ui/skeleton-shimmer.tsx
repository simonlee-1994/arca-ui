"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

function SkeletonShimmer({ className, ...props }: React.ComponentProps<"div">) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div
      data-slot="skeleton-shimmer"
      className={cn(
        "radius-panel relative overflow-hidden bg-background-muted",
        className
      )}
      {...props}
    >
      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-background/70 to-transparent"
          animate={{ translateX: ["-100%", "100%"] }}
          transition={{ duration: 1.4, ease: "linear", repeat: Infinity }}
        />
      )}
    </div>
  )
}

export { SkeletonShimmer }

