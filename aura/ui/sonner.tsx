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
        success: <CircleCheckIcon className="size-4 text-primary" />,
        info: <InfoIcon className="size-4 text-primary" />,
        warning: <TriangleAlertIcon className="size-4 text-amber-500" />,
        error: <OctagonXIcon className="size-4 text-destructive" />,
        loading: <Loader2Icon className="size-4 animate-spin text-primary" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast !min-w-[18rem] !max-w-[min(28rem,calc(100vw-2rem))] group-[.toaster]:font-[Manrope,sans-serif] group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border/50 group-[.toaster]:shadow-[var(--aura-shadow-card)] group-[.toaster]:rounded-2xl group-[.toaster]:py-4 group-[.toaster]:px-5",
          title: "group-[.toast]:font-medium group-[.toast]:text-[15px]",
          description: "group-[.toast]:text-muted-foreground group-[.toast]:text-[13px]",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-xl group-[.toast]:font-medium group-[.toast]:shadow-md group-[.toast]:text-[13px] hover:group-[.toast]:bg-primary/90 group-[.toast]:transition-all group-[.toast]:duration-300",
          cancelButton:
            "group-[.toast]:bg-secondary group-[.toast]:text-secondary-foreground group-[.toast]:rounded-xl group-[.toast]:font-medium group-[.toast]:text-[13px] hover:group-[.toast]:bg-secondary/80 group-[.toast]:transition-all group-[.toast]:duration-300",
          success: "group-[.toaster]:border-primary/30",
          error: "group-[.toaster]:border-destructive/30",
          warning: "group-[.toaster]:border-amber-500/30",
          info: "group-[.toaster]:border-primary/30",
        },
      }}
      style={
        {
          "--normal-bg": "var(--card)",
          "--normal-text": "var(--foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius-2xl)",
          fontFamily: "Manrope, sans-serif",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
