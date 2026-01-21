"use client"

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
        classNames: {
          toast:
            "group toast bg-card text-foreground border border-paper-edge rounded-[24px] shadow-paper-md gap-3 font-sans",
          title: "font-semibold text-foreground font-sans",
          description: "text-muted-foreground font-sans",
          actionButton:
            "bg-primary text-primary-foreground rounded-[16px] font-medium px-4 py-2 shadow-none transition-colors duration-paper ease-paper hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
          cancelButton:
            "bg-secondary/60 text-foreground border border-paper-edge rounded-[16px] font-medium px-4 py-2 shadow-none transition-colors duration-paper ease-paper hover:bg-secondary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
          success: "[&_[data-icon]]:text-emerald-600 dark:[&_[data-icon]]:text-emerald-400",
          error: "[&_[data-icon]]:text-destructive",
          warning: "[&_[data-icon]]:text-amber-500 dark:[&_[data-icon]]:text-amber-400",
          info: "[&_[data-icon]]:text-sky-600 dark:[&_[data-icon]]:text-sky-400",
        },
      }}
      style={
        {
          "--normal-bg": "var(--card, #ffffff)",
          "--normal-text": "var(--foreground, #333333)",
          "--normal-border": "var(--paper-edge, #e0e0e0)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
