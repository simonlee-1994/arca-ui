"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"
import { Moon, Sun, Volume2, VolumeX } from "lucide-react"

import { cn } from "@/lib/utils"

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-inner transition-all duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-accent/60",
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        default: "h-7 w-12",
        lg: "h-8 w-14",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const thumbVariants = cva(
  "pointer-events-none block rounded-full bg-background shadow-md ring-0 transition-all duration-300 ease-out",
  {
    variants: {
      size: {
        sm: "size-3.5 data-[state=checked]:translate-x-[calc(100%+2px)] data-[state=unchecked]:translate-x-0.5 data-[state=checked]:shadow-lg",
        default: "size-5 data-[state=checked]:translate-x-[calc(100%+2px)] data-[state=unchecked]:translate-x-0.5 data-[state=checked]:shadow-lg",
        lg: "size-6 data-[state=checked]:translate-x-[calc(100%+2px)] data-[state=unchecked]:translate-x-0.5 data-[state=checked]:shadow-lg",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function Switch({
  className,
  size,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> &
  VariantProps<typeof switchVariants>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(switchVariants({ size, className }))}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(thumbVariants({ size }))}
      />
    </SwitchPrimitive.Root>
  )
}

// Icon Switch with customizable icons
interface IconSwitchProps extends Omit<React.ComponentProps<typeof SwitchPrimitive.Root>, "children"> {
  size?: "sm" | "default" | "lg"
  checkedIcon?: React.ReactNode
  uncheckedIcon?: React.ReactNode
}

function IconSwitch({
  className,
  size = "default",
  checkedIcon,
  uncheckedIcon,
  ...props
}: IconSwitchProps) {
  const iconSwitchVariants = {
    sm: "h-6 w-11",
    default: "h-8 w-14",
    lg: "h-9 w-16",
  }

  const thumbIconVariants = {
    sm: "size-4",
    default: "size-6",
    lg: "size-7",
  }

  const iconSizes = {
    sm: "size-3",
    default: "size-4",
    lg: "size-4.5",
  }

  return (
    <SwitchPrimitive.Root
      data-slot="icon-switch"
      className={cn(
        "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-inner transition-all duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-accent/60",
        iconSwitchVariants[size],
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="icon-switch-thumb"
        className={cn(
          "pointer-events-none flex items-center justify-center rounded-full bg-background shadow-md ring-0 transition-all duration-300 ease-out",
          thumbIconVariants[size],
          "data-[state=checked]:translate-x-[calc(100%+2px)] data-[state=unchecked]:translate-x-0.5 data-[state=checked]:shadow-lg"
        )}
      >
        <span className={cn("transition-all duration-200 data-[state=checked]:rotate-0 data-[state=unchecked]:-rotate-90", iconSizes[size])}>
          {props.checked || props.defaultChecked ? checkedIcon : uncheckedIcon}
        </span>
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )
}

// Theme Switch - specifically for light/dark mode
interface ThemeSwitchProps extends Omit<React.ComponentProps<typeof SwitchPrimitive.Root>, "children"> {
  size?: "sm" | "default" | "lg"
}

function ThemeSwitch({ className, size = "default", ...props }: ThemeSwitchProps) {
  const containerSizes = {
    sm: "h-6 w-11",
    default: "h-8 w-14",
    lg: "h-9 w-16",
  }

  const thumbSizes = {
    sm: "size-4",
    default: "size-6",
    lg: "size-7",
  }

  const iconSizes = {
    sm: "size-2.5",
    default: "size-3.5",
    lg: "size-4",
  }

  return (
    <SwitchPrimitive.Root
      data-slot="theme-switch"
      className={cn(
        "group peer relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-inner transition-all duration-500 ease-out outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=unchecked]:bg-amber-100 data-[state=checked]:bg-slate-800",
        containerSizes[size],
        className
      )}
      {...props}
    >
      {/* Background icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5">
        <Sun className={cn(
          iconSizes[size],
          "text-amber-500 transition-all duration-300",
          "group-data-[state=checked]:opacity-0 group-data-[state=unchecked]:opacity-100"
        )} />
        <Moon className={cn(
          iconSizes[size],
          "text-slate-300 transition-all duration-300",
          "group-data-[state=unchecked]:opacity-0 group-data-[state=checked]:opacity-100"
        )} />
      </div>
      <SwitchPrimitive.Thumb
        data-slot="theme-switch-thumb"
        className={cn(
          "pointer-events-none flex items-center justify-center rounded-full shadow-md ring-0 transition-all duration-500 ease-out z-10",
          "data-[state=unchecked]:bg-amber-400 data-[state=checked]:bg-slate-200",
          "data-[state=checked]:translate-x-[calc(100%+2px)] data-[state=unchecked]:translate-x-0.5",
          thumbSizes[size]
        )}
      >
        <Sun className={cn(
          iconSizes[size],
          "absolute text-amber-600 transition-all duration-300",
          "group-data-[state=checked]:opacity-0 group-data-[state=checked]:rotate-90 group-data-[state=unchecked]:opacity-100 group-data-[state=unchecked]:rotate-0"
        )} />
        <Moon className={cn(
          iconSizes[size],
          "absolute text-slate-600 transition-all duration-300",
          "group-data-[state=unchecked]:opacity-0 group-data-[state=unchecked]:-rotate-90 group-data-[state=checked]:opacity-100 group-data-[state=checked]:rotate-0"
        )} />
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )
}

// Sound Switch
interface SoundSwitchProps extends Omit<React.ComponentProps<typeof SwitchPrimitive.Root>, "children"> {
  size?: "sm" | "default" | "lg"
}

function SoundSwitch({ className, size = "default", ...props }: SoundSwitchProps) {
  const containerSizes = {
    sm: "h-6 w-11",
    default: "h-8 w-14",
    lg: "h-9 w-16",
  }

  const thumbSizes = {
    sm: "size-4",
    default: "size-6",
    lg: "size-7",
  }

  const iconSizes = {
    sm: "size-2.5",
    default: "size-3.5",
    lg: "size-4",
  }

  return (
    <SwitchPrimitive.Root
      data-slot="sound-switch"
      className={cn(
        "group peer relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-inner transition-all duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-accent/60",
        containerSizes[size],
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="sound-switch-thumb"
        className={cn(
          "pointer-events-none flex items-center justify-center rounded-full bg-background shadow-md ring-0 transition-all duration-300 ease-out",
          "data-[state=checked]:translate-x-[calc(100%+2px)] data-[state=unchecked]:translate-x-0.5 data-[state=checked]:shadow-lg",
          thumbSizes[size]
        )}
      >
        <Volume2 className={cn(
          iconSizes[size],
          "absolute text-primary transition-all duration-200",
          "group-data-[state=checked]:opacity-100 group-data-[state=checked]:scale-100 group-data-[state=unchecked]:opacity-0 group-data-[state=unchecked]:scale-75"
        )} />
        <VolumeX className={cn(
          iconSizes[size],
          "absolute text-muted-foreground transition-all duration-200",
          "group-data-[state=unchecked]:opacity-100 group-data-[state=unchecked]:scale-100 group-data-[state=checked]:opacity-0 group-data-[state=checked]:scale-75"
        )} />
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )
}

// Labeled Switch with on/off text
interface LabeledSwitchProps extends Omit<React.ComponentProps<typeof SwitchPrimitive.Root>, "children"> {
  size?: "sm" | "default" | "lg"
  onLabel?: string
  offLabel?: string
}

function LabeledSwitch({
  className,
  size = "default",
  onLabel = "ON",
  offLabel = "OFF",
  ...props
}: LabeledSwitchProps) {
  const containerSizes = {
    sm: "h-6 w-14",
    default: "h-8 w-[72px]",
    lg: "h-9 w-20",
  }

  const thumbSizes = {
    sm: "size-4",
    default: "size-6",
    lg: "size-7",
  }

  const textSizes = {
    sm: "text-[9px]",
    default: "text-[10px]",
    lg: "text-xs",
  }

  return (
    <SwitchPrimitive.Root
      data-slot="labeled-switch"
      className={cn(
        "group peer relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-inner transition-all duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-accent/60",
        containerSizes[size],
        className
      )}
      {...props}
    >
      {/* Labels */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <span className={cn(
          "font-semibold uppercase tracking-wider text-primary-foreground transition-opacity duration-200",
          textSizes[size],
          "group-data-[state=checked]:opacity-100 group-data-[state=unchecked]:opacity-0"
        )}>
          {onLabel}
        </span>
        <span className={cn(
          "font-semibold uppercase tracking-wider text-muted-foreground transition-opacity duration-200",
          textSizes[size],
          "group-data-[state=unchecked]:opacity-100 group-data-[state=checked]:opacity-0"
        )}>
          {offLabel}
        </span>
      </div>
      <SwitchPrimitive.Thumb
        data-slot="labeled-switch-thumb"
        className={cn(
          "pointer-events-none flex items-center justify-center rounded-full bg-background shadow-md ring-0 transition-all duration-300 ease-out z-10",
          "data-[state=checked]:translate-x-[calc(100%+18px)] data-[state=unchecked]:translate-x-0.5 data-[state=checked]:shadow-lg",
          thumbSizes[size]
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export {
  Switch,
  IconSwitch,
  ThemeSwitch,
  SoundSwitch,
  LabeledSwitch,
  switchVariants
}
