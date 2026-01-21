"use client"

import * as React from "react"
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
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
            "group flex items-center gap-3 w-full rounded-lg border border-foreground bg-background px-5 py-3.5 font-sans",
          title: "text-foreground text-sm font-semibold",
          description: "text-muted-foreground text-sm",
          actionButton:
            "inline-flex items-center justify-center rounded-full border border-foreground bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90",
          cancelButton:
            "inline-flex items-center justify-center rounded-full border border-foreground bg-secondary px-4 py-1.5 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80",
          closeButton:
            "absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-foreground bg-background p-1 transition-colors hover:bg-secondary",
          success: "[&_svg]:text-green-600",
          error: "[&_svg]:text-destructive",
          warning: "[&_svg]:text-amber-500",
          info: "[&_svg]:text-blue-500",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
