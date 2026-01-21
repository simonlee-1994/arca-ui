"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/themes/orbit-capsule/button"

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

  // Check if range is complete and spans more than one day
  const isRangeComplete = Boolean(
    props.mode === "range" &&
    props.selected &&
    typeof props.selected === "object" &&
    "from" in props.selected &&
    "to" in props.selected &&
    props.selected.from &&
    props.selected.to &&
    props.selected.from.getTime() !== props.selected.to.getTime()
  )

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-background p-4 rounded-lg border border-foreground [--cell-size:--spacing(9)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=card-content]_&]:border-0 [[data-slot=popover-content]_&]:bg-transparent [[data-slot=popover-content]_&]:border-0",
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
          "flex gap-6 flex-col md:flex-row relative",
          defaultClassNames.months
        ),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none rounded-full",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none rounded-full",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-semibold justify-center h-(--cell-size) gap-2",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative has-focus:border-foreground border border-foreground shadow-none has-focus:ring-0 rounded-full overflow-hidden",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute bg-popover inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-semibold",
          captionLayout === "label"
            ? "text-base"
            : "rounded-full pl-3 pr-2 flex items-center gap-1 text-sm h-9 [&>svg]:text-foreground [&>svg]:size-4",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground rounded-full flex-1 font-semibold text-xs select-none uppercase",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full mt-1", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-(--cell-size)",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-xs select-none text-muted-foreground font-medium",
          defaultClassNames.week_number
        ),
        day: cn(
          "relative w-full h-full p-0 text-center group/day aspect-square select-none",
          defaultClassNames.day
        ),
        range_start: cn(
          isRangeComplete && "bg-gradient-to-r from-transparent from-50% to-accent/20 to-50%",
          defaultClassNames.range_start
        ),
        range_middle: cn("bg-accent/20", defaultClassNames.range_middle),
        range_end: cn(
          isRangeComplete && "bg-gradient-to-l from-transparent from-50% to-accent/20 to-50%",
          defaultClassNames.range_end
        ),
        today: cn(
          "text-accent font-bold",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground/40 aria-selected:text-muted-foreground/60",
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
        Root: ({ className, rootRef, ...rootProps }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={className}
              {...rootProps}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-5", className)} strokeWidth={2.5} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-5", className)}
                strokeWidth={2.5}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} strokeWidth={2.5} {...props} />
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

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[selected-single=true]:border data-[selected-single=true]:border-foreground data-[range-middle=true]:text-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:hover:bg-transparent data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-start=true]:border data-[range-start=true]:border-foreground data-[range-start=true]:rounded-full data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-end=true]:border data-[range-end=true]:border-foreground data-[range-end=true]:rounded-full group-data-[focused=true]/day:border-foreground group-data-[focused=true]/day:ring-0 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-medium group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 [&>span]:text-xs [&>span]:opacity-70 rounded-full",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
