import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"ul"> & {
  variant?: "default" | "unified" | "flat"
}) {
  return (
    <ul
      data-slot="pagination-content"
      data-variant={variant}
      className={cn(
        "flex flex-row items-center",
        variant === "default" && "gap-2",
        variant === "unified" && [
          "gap-0 bg-card border border-paper-edge rounded-[24px] p-1 shadow-paper-sm transition-shadow duration-paper ease-paper",
          "[&_[data-slot=pagination-link]]:rounded-[16px] [&_[data-slot=pagination-link]]:border-0 [&_[data-slot=pagination-link]]:shadow-none",
          "[&_[data-slot=pagination-link]]:hover:shadow-none [&_[data-slot=pagination-link]]:hover:translate-x-0 [&_[data-slot=pagination-link]]:hover:translate-y-0 [&_[data-slot=pagination-link]]:active:translate-x-0 [&_[data-slot=pagination-link]]:active:translate-y-0",
          "[&_[data-slot=pagination-link][data-active=true]]:bg-primary [&_[data-slot=pagination-link][data-active=true]]:text-primary-foreground",
        ],
        variant === "flat" && [
          "gap-2",
          "[&_[data-slot=pagination-link]]:border [&_[data-slot=pagination-link]]:border-paper-edge [&_[data-slot=pagination-link]]:bg-secondary/60 [&_[data-slot=pagination-link]]:text-muted-foreground",
          "[&_[data-slot=pagination-link]]:shadow-none [&_[data-slot=pagination-link]]:hover:shadow-none [&_[data-slot=pagination-link]]:active:shadow-none",
          "[&_[data-slot=pagination-link]]:hover:translate-x-0 [&_[data-slot=pagination-link]]:hover:translate-y-0 [&_[data-slot=pagination-link]]:active:translate-x-0 [&_[data-slot=pagination-link]]:active:translate-y-0",
          "[&_[data-slot=pagination-link]]:hover:bg-accent [&_[data-slot=pagination-link]]:hover:text-accent-foreground",
          "[&_[data-slot=pagination-link][data-active=true]]:bg-primary [&_[data-slot=pagination-link][data-active=true]]:text-primary-foreground [&_[data-slot=pagination-link][data-active=true]]:border-0",
        ],
        className
      )}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
  variant?: "page" | "nav"
} & React.ComponentProps<"a">

function PaginationLink({
  className,
  isActive,
  variant = "page",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        "relative inline-flex items-center justify-center font-semibold cursor-pointer select-none outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "transition-all duration-paper ease-paper",
        "h-9",
        variant === "page"
          ? "w-9 rounded-[16px]"
          : "w-auto rounded-[18px] gap-1 px-3.5",
        variant === "nav" && [
          "bg-secondary/60 text-foreground border border-paper-edge shadow-none",
          "hover:bg-card hover:shadow-paper-sm hover:-translate-x-[var(--paper-lift-sm)] hover:-translate-y-[var(--paper-lift-sm)]",
          "active:translate-x-[var(--paper-lift-sm)] active:translate-y-[var(--paper-lift-sm)] active:shadow-paper-pressed",
        ],
        variant === "page" &&
          (isActive
            ? "bg-card text-foreground border border-paper-edge shadow-paper-sm"
            : [
                "bg-transparent text-muted-foreground border border-transparent",
                "hover:bg-card hover:text-foreground hover:border-paper-edge hover:shadow-paper-sm hover:-translate-x-[var(--paper-lift-sm)] hover:-translate-y-[var(--paper-lift-sm)]",
                "active:translate-x-[var(--paper-lift-sm)] active:translate-y-[var(--paper-lift-sm)] active:shadow-paper-pressed",
              ]),
        className
      )}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      className={className}
      {...props}
      variant="nav"
      aria-label="Go to previous page"
    >
      <ChevronLeftIcon className="size-4" />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      className={className}
      {...props}
      variant="nav"
      aria-label="Go to next page"
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon className="size-4" />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-9 items-center justify-center text-muted-foreground",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
