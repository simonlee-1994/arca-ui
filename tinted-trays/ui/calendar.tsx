"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/themes/tinted-trays/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-tray group/calendar p-4 rounded-2xl",
        "border border-border/40",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_8px_rgba(15,23,42,0.06)]",
        "[--cell-size:--spacing(9)]",
        "[[data-slot=card-content]_&]:bg-transparent [[data-slot=card-content]_&]:border-0 [[data-slot=card-content]_&]:shadow-none",
        "[[data-slot=popover-content]_&]:bg-transparent [[data-slot=popover-content]_&]:border-0 [[data-slot=popover-content]_&]:shadow-none",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "flex gap-4 flex-col md:flex-row relative",
          defaultClassNames.months
        ),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          "rounded-xl",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          "rounded-xl",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative rounded-lg",
          "bg-background/80 border border-border/60",
          "shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]",
          "has-focus:border-ring has-focus:ring-ring/50 has-focus:ring-[3px]",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute bg-popover inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-semibold text-foreground",
          captionLayout === "label"
            ? "text-sm"
            : "rounded-lg pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground rounded-lg flex-1 font-medium text-[0.8rem] select-none",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full mt-1", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-(--cell-size)",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.8rem] select-none text-muted-foreground",
          defaultClassNames.week_number
        ),
        day: cn(
          "relative w-full h-full p-0.5 text-center group/day aspect-square select-none",
          defaultClassNames.day
        ),
        range_start: cn(defaultClassNames.range_start),
        range_middle: cn(defaultClassNames.range_middle),
        range_end: cn(defaultClassNames.range_end),
        today: cn(
          // Use ring instead of background to avoid color clash with tray
          "ring-2 ring-inset ring-primary/40 rounded-xl",
          // When selected, remove the ring to avoid visual conflict
          "data-[selected=true]:ring-0",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground/50 aria-selected:text-muted-foreground/50",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  // Get day of week (0 = Sunday, 6 = Saturday)
  const dayOfWeek = day.date.getDay()
  const isRowStart = dayOfWeek === 0 // Sunday
  const isRowEnd = dayOfWeek === 6 // Saturday

  // Determine if this is a complete range (has both start and end)
  const isRangeStart = modifiers.range_start
  const isRangeEnd = modifiers.range_end
  const isRangeMiddle = modifiers.range_middle

  // For single selection (not part of a range)
  const isSingleSelection = modifiers.selected && !isRangeStart && !isRangeEnd && !isRangeMiddle

  // Calculate corner rounding for range
  // Range start: left rounded, right straight (unless also row end)
  // Range end: right rounded, left straight (unless also row start)
  // Range middle: based on row position
  let roundingClass = "rounded-xl" // default for single selection

  if (isRangeStart && isRangeEnd) {
    // Single day range
    roundingClass = "rounded-xl"
  } else if (isRangeStart) {
    roundingClass = isRowEnd ? "rounded-xl" : "rounded-l-xl rounded-r-none"
  } else if (isRangeEnd) {
    roundingClass = isRowStart ? "rounded-xl" : "rounded-r-xl rounded-l-none"
  } else if (isRangeMiddle) {
    if (isRowStart && isRowEnd) {
      roundingClass = "rounded-xl"
    } else if (isRowStart) {
      roundingClass = "rounded-l-xl rounded-r-none"
    } else if (isRowEnd) {
      roundingClass = "rounded-r-xl rounded-l-none"
    } else {
      roundingClass = "rounded-none"
    }
  }

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={isSingleSelection}
      data-range-start={isRangeStart}
      data-range-end={isRangeEnd}
      data-range-middle={isRangeMiddle}
      data-today={modifiers.today}
      className={cn(
        "flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal",
        "transition-all duration-200",
        "hover:bg-accent hover:text-foreground",
        roundingClass,
        // Single selection
        isSingleSelection && "bg-primary text-primary-foreground shadow-[0_1px_2px_rgba(15,23,42,0.18)]",
        // Range middle - light background with proper rounding
        isRangeMiddle && !isRangeStart && !isRangeEnd && "bg-primary/15 text-foreground",
        // Today in range middle needs slightly stronger background
        isRangeMiddle && modifiers.today && !isRangeStart && !isRangeEnd && "bg-primary/25",
        // Range start - dark background
        isRangeStart && "bg-primary text-primary-foreground",
        // Range end - dark background
        isRangeEnd && !isRangeStart && "bg-primary text-primary-foreground",
        // Focus styles
        "group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50",
        "group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px]",
        "[&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
