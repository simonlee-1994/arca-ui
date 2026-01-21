"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function useThemePortalContainer(themeId: string) {
  const [container, setContainer] = React.useState<HTMLElement | null>(null)

  React.useEffect(() => {
    // Mount portal inside theme container to inherit correct fonts and theme variables
    setContainer(document.querySelector<HTMLElement>(`div[data-theme="${themeId}"]`))
  }, [themeId])

  return container
}

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  container,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" container={container ?? undefined} {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        // Base overlay with soft, misty feel
        "fixed inset-0 z-50 bg-foreground/10 backdrop-blur-sm",
        // Smooth animations
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "duration-300 ease-out",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  hideCloseButton = false,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
  hideCloseButton?: boolean
}) {
  const portalContainer = useThemePortalContainer("aura")

  return (
    <SheetPortal container={portalContainer}>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          // Base styles - organic, warm feel
          "fixed z-50 flex flex-col bg-background shadow-[var(--aura-shadow-card)]",
          // Border styling
          "border-border/60",
          // Smooth transitions
          "transition-all ease-out",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:duration-300 data-[state=open]:duration-500",
          // Side-specific styles
          side === "right" && [
            "inset-y-0 right-0 h-full w-3/4 sm:max-w-md",
            "border-l rounded-l-3xl",
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
          ],
          side === "left" && [
            "inset-y-0 left-0 h-full w-3/4 sm:max-w-md",
            "border-r rounded-r-3xl",
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
          ],
          side === "top" && [
            "inset-x-0 top-0 h-auto max-h-[85vh]",
            "border-b rounded-b-3xl",
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
          ],
          side === "bottom" && [
            "inset-x-0 bottom-0 h-auto max-h-[85vh]",
            "border-t rounded-t-3xl",
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
          ],
          className
        )}
        {...props}
      >
        {children}
        {!hideCloseButton && (
          <SheetPrimitive.Close
            className={cn(
              // Base close button
              "absolute top-4 right-4 size-10 flex items-center justify-center",
              // Rounded, organic feel
              "rounded-full",
              // Colors and effects
              "bg-secondary/50 text-muted-foreground",
              "hover:bg-secondary hover:text-foreground",
              "active:scale-95",
              // Transitions
              "transition-all duration-200",
              // Focus states
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
              // Disabled
              "disabled:pointer-events-none"
            )}
          >
            <XIcon className="size-4" />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        "flex flex-col gap-2 p-6 pb-4 pr-14",
        className
      )}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        "mt-auto flex flex-col-reverse gap-3 p-6 pt-4 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "text-xl font-semibold text-foreground tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn(
        "text-sm text-muted-foreground leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

function SheetBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-body"
      className={cn("flex-1 overflow-auto px-6 py-2", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetBody,
}
