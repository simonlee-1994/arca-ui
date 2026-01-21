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
        success: <CircleCheckIcon className="size-4 text-emerald-500" />,
        info: <InfoIcon className="size-4 text-primary" />,
        warning: <TriangleAlertIcon className="size-4 text-amber-500" />,
        error: <OctagonXIcon className="size-4 text-destructive" />,
        loading: <Loader2Icon className="size-4 animate-spin text-primary" />,
      }}
      toastOptions={{
        classNames: {
          toast: [
            "group toast font-sans",
            // Tinted Trays: Capsule-style toast with cold shadows
            "bg-tray border border-border/50",
            "rounded-2xl shadow-[0_4px_16px_rgba(15,23,42,0.10),0_1px_3px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]",
            "p-4",
          ].join(" "),
          title: "text-foreground font-semibold text-sm font-heading",
          description: "text-muted-foreground text-sm font-sans",
          actionButton: [
            "bg-primary text-primary-foreground font-sans",
            "rounded-xl px-3 py-1.5 text-xs font-semibold",
            "shadow-[0_1px_2px_rgba(15,23,42,0.06)]",
            "hover:bg-primary/90 transition-colors",
          ].join(" "),
          cancelButton: [
            "bg-secondary text-secondary-foreground font-sans",
            "rounded-xl px-3 py-1.5 text-xs font-semibold",
            "shadow-[inset_0_1px_2px_rgba(15,23,42,0.04)]",
            "hover:bg-secondary/80 transition-colors",
          ].join(" "),
          success: "border-emerald-200/60 bg-emerald-50/50",
          error: "border-destructive/30 bg-destructive/5",
          warning: "border-amber-200/60 bg-amber-50/50",
          info: "border-primary/20 bg-primary/5",
        },
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "16px",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
