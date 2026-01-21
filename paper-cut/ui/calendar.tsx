"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/themes/paper-cut/button"

type CalendarVariant = "elevated" | "default" | "outlined"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  variant = "default",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
  variant?: CalendarVariant
}) {
  const defaultClassNames = getDefaultClassNames()
  const shellShadow =
    variant === "elevated"
      ? "shadow-paper-md"
      : variant === "outlined"
        ? "shadow-none"
        : "shadow-paper-sm"

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-card group/calendar p-4 border border-paper-edge rounded-[24px] transition-all duration-paper ease-paper [--cell-size:--spacing(9)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=card-content]_&]:shadow-none [[data-slot=card-content]_&]:border-0 [[data-slot=popover-content]_&]:bg-transparent [[data-slot=popover-content]_&]:shadow-none [[data-slot=popover-content]_&]:border-0",
        shellShadow,
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
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none rounded-[16px] shadow-none hover:shadow-none hover:translate-x-0 hover:translate-y-0 hover:bg-accent",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none rounded-[16px] shadow-none hover:shadow-none hover:translate-x-0 hover:translate-y-0 hover:bg-accent",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-semibold justify-center h-(--cell-size) gap-1.5",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative has-focus:border-ring border border-paper-edge bg-secondary/60 shadow-none has-focus:ring-ring/50 has-focus:ring-[3px] rounded-[16px]",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute bg-popover inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-semibold",
          captionLayout === "label"
            ? "text-sm"
            : "rounded-[16px] pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground rounded-[16px] flex-1 font-medium text-[0.8rem] select-none",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-(--cell-size)",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.8rem] select-none text-muted-foreground",
          defaultClassNames.week_number
        ),
        day: cn(
          "relative w-full h-full p-0 text-center [&:last-child[data-selected=true]_button]:rounded-r-[16px] group/day aspect-square select-none",
          props.showWeekNumber
            ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-[16px]"
            : "[&:first-child[data-selected=true]_button]:rounded-l-[16px]",
          defaultClassNames.day
        ),
        range_start: cn(
          "rounded-l-[16px] bg-accent",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-[16px] bg-accent", defaultClassNames.range_end),
        today: cn(
          "font-semibold",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
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

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-today={modifiers.today}
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
        // Base today styling (background only, no border)
        "data-[today=true]:bg-primary/15 data-[today=true]:text-foreground data-[today=true]:font-semibold",
        // Single selection overrides today
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[selected-single=true]:border-0",
        // Range middle - override today
        "data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[today=true]:data-[range-middle=true]:bg-accent data-[today=true]:data-[range-middle=true]:text-accent-foreground",
        // Range start/end - override today
        "data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-start=true]:border-0 data-[today=true]:data-[range-start=true]:bg-primary data-[today=true]:data-[range-start=true]:text-primary-foreground",
        "data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-end=true]:border-0 data-[today=true]:data-[range-end=true]:bg-primary data-[today=true]:data-[range-end=true]:text-primary-foreground",
        // Focus states
        "group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px]",
        // Layout and base styling
        "flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal",
        // Range rounding
        "data-[range-end=true]:rounded-[16px] data-[range-end=true]:rounded-r-[16px] data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-[16px] data-[range-start=true]:rounded-l-[16px]",
        // Other styling
        "[&>span]:text-xs [&>span]:opacity-70 rounded-[16px] shadow-none hover:shadow-none hover:translate-x-0 hover:translate-y-0 transition-all duration-paper ease-paper dark:hover:text-accent-foreground",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
