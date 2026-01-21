import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

const breadcrumbVariants = cva(
  "relative inline-flex items-center transition-all duration-[var(--paper-duration)] ease-[var(--paper-ease)]",
  {
    variants: {
      variant: {
        default:
          "bg-card border border-paper-edge rounded-[24px] px-5 py-2.5 shadow-[4px_4px_0px_0px_var(--paper-shadow)]",
        flat:
          "bg-secondary/60 border border-paper-edge rounded-[24px] px-5 py-2.5 shadow-none",
        bare: "bg-transparent border-0 shadow-none px-0 py-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Breadcrumb({
  className,
  variant,
  ...props
}: React.ComponentProps<"nav"> & VariantProps<typeof breadcrumbVariants>) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={cn(breadcrumbVariants({ variant }), className)}
      {...props}
    />
  )
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn(
        "relative px-2 py-1 rounded-[16px] hover:text-foreground hover:bg-accent transition-all duration-200 ease-[cubic-bezier(0.25,0.8,0.25,1)] cursor-pointer",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn(
        "text-foreground font-semibold px-2 py-1 bg-accent rounded-[16px]",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5 text-muted-foreground", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "flex size-9 items-center justify-center rounded-[16px] hover:bg-accent transition-all duration-200 ease-[cubic-bezier(0.25,0.8,0.25,1)] cursor-pointer",
        className
      )}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
