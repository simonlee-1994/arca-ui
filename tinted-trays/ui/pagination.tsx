import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import type { Button } from "@/components/themes/tinted-trays/button"

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
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn(
        "flex flex-row items-center gap-1.5",
        "bg-tray rounded-2xl p-2",
        "border border-border/40",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_8px_rgba(15,23,42,0.06)]",
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
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap",
        "text-sm font-medium transition-all duration-200",
        "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "rounded-xl size-10",
        isActive
          ? [
              "bg-primary text-primary-foreground",
              "shadow-[0_2px_8px_rgba(37,99,235,0.25),inset_0_1px_0_rgba(255,255,255,0.2)]",
            ]
          : [
              "bg-transparent text-muted-foreground",
              "hover:bg-background hover:text-foreground",
              "hover:border hover:border-border/60",
              "hover:shadow-[0_1px_2px_rgba(15,23,42,0.06)]",
            ],
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
      aria-label="Go to previous page"
      size="default"
      className={cn(
        "gap-1.5 w-auto px-3",
        "bg-background border border-border/60",
        "shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]",
        "hover:border-primary/50 hover:text-primary",
        className
      )}
      {...props}
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
      aria-label="Go to next page"
      size="default"
      className={cn(
        "gap-1.5 w-auto px-3",
        "bg-background border border-border/60",
        "shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]",
        "hover:border-primary/50 hover:text-primary",
        className
      )}
      {...props}
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
        "flex size-10 items-center justify-center",
        "text-muted-foreground",
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
