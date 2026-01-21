"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

type SidebarContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

function SidebarProvider({
  defaultOpen = true,
  children,
}: {
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(defaultOpen)
  const toggle = React.useCallback(() => setOpen((prev) => !prev), [])

  return (
    <SidebarContext.Provider value={{ open, setOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  )
}

function Sidebar({
  className,
  children,
  ...props
}: React.ComponentProps<"aside">) {
  const { open } = useSidebar()

  return (
    <aside
      data-slot="sidebar"
      data-state={open ? "open" : "closed"}
      className={cn(
        "flex h-full shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground overflow-hidden",
        "transition-[width] duration-200 ease-out",
        open ? "w-64" : "w-14",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  const { open } = useSidebar()

  return (
    <div
      data-slot="sidebar-header"
      className={cn(
        "flex items-center gap-3 p-4 overflow-hidden",
        !open && "justify-center px-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn("flex-1 overflow-y-auto overflow-x-hidden p-2", className)}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  const { open } = useSidebar()

  return (
    <div
      data-slot="sidebar-footer"
      className={cn(
        "p-4 overflow-hidden border-t border-sidebar-border",
        !open && "px-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      className={cn("space-y-1", className)}
      {...props}
    />
  )
}

function SidebarGroupLabel({ className, ...props }: React.ComponentProps<"div">) {
  const { open } = useSidebar()

  if (!open) {
    return null
  }

  return (
    <div
      data-slot="sidebar-group-label"
      className={cn(
        "px-3 py-2 text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider truncate",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-item"
      className={cn("", className)}
      {...props}
    />
  )
}

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  className,
  children,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean; isActive?: boolean }) {
  const Comp = asChild ? Slot : "button"
  const { open } = useSidebar()

  return (
    <Comp
      data-slot="sidebar-menu-button"
      data-active={isActive}
      className={cn(
        "flex w-full items-center gap-3 px-3 py-2 text-sm font-medium overflow-hidden",
        "radius-panel transition-colors duration-200",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-sidebar-ring/20 focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar",
        isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
        !open && "justify-center px-2",
        "[&>svg]:shrink-0 [&>svg]:size-4",
        className
      )}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement<{ className?: string }>(child) && child.type === "span") {
          return open
            ? React.cloneElement(child, {
                className: cn("truncate", child.props.className),
              })
            : null
        }
        return child
      })}
    </Comp>
  )
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"span">) {
  const { open } = useSidebar()

  if (!open) {
    return null
  }

  return (
    <span
      data-slot="sidebar-menu-badge"
      className={cn(
        "ml-auto shrink-0 px-2 py-0.5 text-xs font-medium rounded-full",
        "bg-sidebar-accent text-sidebar-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

function SidebarTrigger({ className, ...props }: React.ComponentProps<"button">) {
  const { toggle } = useSidebar()

  return (
    <button
      data-slot="sidebar-trigger"
      onClick={toggle}
      className={cn(
        "inline-flex items-center justify-center p-2 text-sm font-medium",
        "radius-panel transition-colors duration-200",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      <svg
        className="size-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <span className="sr-only">Toggle sidebar</span>
    </button>
  )
}

export {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarTrigger,
  useSidebar,
}
