"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react"

type ToasterProps = React.ComponentProps<typeof Sonner>

function Toaster({ ...props }: ToasterProps) {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex w-[360px] max-w-[calc(100vw-2rem)] items-start gap-3 border border-border bg-popover px-4 py-3 text-popover-foreground shadow-clarity-md radius-surface-nested",
          icon: "mt-0.5 text-muted-foreground",
          content: "flex flex-1 flex-col gap-0.5",
          title: "text-sm font-medium leading-5",
          description: "text-xs text-muted-foreground leading-4",
          actionButton:
            "radius-control bg-foreground px-3 py-1 text-xs font-medium text-background shadow-none hover:opacity-90 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          cancelButton:
            "radius-control bg-background-subtle px-3 py-1 text-xs font-medium text-muted-foreground shadow-none hover:bg-background-muted focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          closeButton:
            "radius-control-soft border border-border bg-background-subtle text-muted-foreground shadow-none hover:bg-background-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
