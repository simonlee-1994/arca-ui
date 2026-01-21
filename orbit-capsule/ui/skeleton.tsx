import { cn } from "@/lib/utils"

function Skeleton({
  className,
  variant = "default",
  animation = "pulse",
  ...props
}: React.ComponentProps<"div"> & {
  variant?: "default" | "pill" | "circle" | "text"
  animation?: "pulse" | "shimmer" | "wave" | "none"
}) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        // Orbit Capsule7: Clean skeleton with appropriate rounded corners
        "bg-secondary relative overflow-hidden",
        // Animation styles
        animation === "pulse" && "animate-pulse",
        animation === "shimmer" && "skeleton-shimmer",
        animation === "wave" && "skeleton-wave",
        // Variant styles - using theme-appropriate radii
        variant === "default" && "rounded-lg",
        variant === "pill" && "rounded-full",
        variant === "circle" && "rounded-full aspect-square",
        variant === "text" && "rounded-full h-4",
        className
      )}
      {...props}
    >
      {(animation === "shimmer" || animation === "wave") && (
        <div
          className={cn(
            "absolute inset-0",
            animation === "shimmer" && "animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-foreground/10 to-transparent",
            animation === "wave" && "animate-[wave_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-foreground/5 to-transparent"
          )}
          style={{
            backgroundSize: animation === "shimmer" ? "200% 100%" : "300% 100%",
          }}
        />
      )}
    </div>
  )
}

export { Skeleton }
