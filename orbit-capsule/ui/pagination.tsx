import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/themes/orbit-capsule/button"

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
        "orbit-hover-offset-sm inline-flex items-center gap-1 rounded-full border border-foreground bg-background p-1",
        className
      )}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" className="contents" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & React.ComponentProps<typeof Button>

function PaginationLink({
  className,
  isActive,
  children,
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      affordance="none"
      variant={isActive ? "default" : "ghost"}
      size="sm"
      className={cn(
        "min-w-8 rounded-full px-3",
        isActive && "border-transparent",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      aria-label="Go to previous page"
      data-slot="pagination-previous"
      affordance="none"
      variant="ghost"
      size="icon-sm"
      className={cn("size-8 rounded-full", className)}
      {...props}
    >
      <ChevronLeftIcon className="size-4" strokeWidth={2.5} />
    </Button>
  )
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      aria-label="Go to next page"
      data-slot="pagination-next"
      affordance="none"
      variant="ghost"
      size="icon-sm"
      className={cn("size-8 rounded-full", className)}
      {...props}
    >
      <ChevronRightIcon className="size-4" strokeWidth={2.5} />
    </Button>
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
      className={cn("px-1 text-sm text-muted-foreground", className)}
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
