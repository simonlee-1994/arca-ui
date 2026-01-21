"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tableContainerVariants = cva(
  "relative w-full overflow-x-auto",
  {
    variants: {
      surface: {
        tray: "bg-tray",
        background: "bg-background",
      },
      rim: {
        strong: [
          "rounded-3xl border border-border/40",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_2px_10px_rgba(15,23,42,0.06)]",
        ],
        default: [
          "rounded-2xl border border-border/50",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_8px_rgba(15,23,42,0.06)]",
        ],
        subtle: [
          "rounded-2xl border border-border/60",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_1px_4px_rgba(15,23,42,0.03)]",
        ],
      },
    },
    defaultVariants: {
      surface: "tray",
      rim: "default",
    },
  }
)

type TableProps = React.ComponentProps<"table"> &
  VariantProps<typeof tableContainerVariants> & {
    containerClassName?: string
  }

function Table({
  className,
  containerClassName,
  surface,
  rim,
  ...props
}: TableProps) {
  return (
    <div
      data-slot="table-container"
      className={cn(
        tableContainerVariants({ surface, rim }),
        containerClassName
      )}
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        "bg-secondary/40",
        "[&_tr]:border-b-2 [&_tr]:border-border/50",
        className
      )}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-secondary/40 border-t-2 border-border/50 font-medium",
        "[&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b border-border/50 transition-all duration-150 cursor-pointer",
        // Clear hover effect with accent background
        "hover:bg-accent/60",
        "data-[state=selected]:bg-primary/10",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-11 px-4 text-left align-middle",
        "font-semibold text-foreground text-xs uppercase tracking-wider",
        "whitespace-nowrap",
        "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "px-4 py-3 align-middle",
        "text-sm text-foreground",
        "whitespace-nowrap",
        "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
