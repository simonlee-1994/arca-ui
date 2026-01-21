import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        // Use radius-panel for data-dense elements
        "radius-panel animate-pulse bg-background-muted",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
