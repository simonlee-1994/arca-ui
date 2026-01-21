"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputOTPVariants = cva("flex items-center has-disabled:opacity-50", {
  variants: {
    variant: {
      default: "gap-2",
      capsule: "gap-3",
      tray: "gap-2 rounded-3xl bg-tray border border-border/40 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_8px_rgba(15,23,42,0.06)]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function InputOTP({
  className,
  containerClassName,
  variant = "default",
  ...props
}: React.ComponentProps<typeof OTPInput> &
  VariantProps<typeof inputOTPVariants> & {
    containerClassName?: string
  }) {
  return (
    <OTPInput
      data-slot="input-otp"
      data-variant={variant}
      containerClassName={cn(inputOTPVariants({ variant }), containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

const inputOTPGroupVariants = cva("flex items-center", {
  variants: {
    variant: {
      default: "",
      capsule: "gap-2",
      tray: "gap-1",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function InputOTPGroup({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputOTPGroupVariants>) {
  return (
    <div
      data-slot="input-otp-group"
      data-variant={variant}
      className={cn(inputOTPGroupVariants({ variant }), className)}
      {...props}
    />
  )
}

const inputOTPSlotVariants = cva(
  "relative flex items-center justify-center text-sm font-medium transition-all duration-200 outline-none",
  {
    variants: {
      variant: {
        default:
          "size-10 rounded-xl border border-border/60 bg-capsule shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)] first:rounded-l-xl last:rounded-r-xl data-[active=true]:border-primary data-[active=true]:ring-2 data-[active=true]:ring-primary/20 data-[active=true]:z-10 aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        capsule:
          "size-11 rounded-full border border-border/60 bg-capsule shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)] data-[active=true]:border-primary data-[active=true]:ring-2 data-[active=true]:ring-primary/20 data-[active=true]:z-10 aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        tray:
          "size-9 rounded-lg border border-border/60 bg-capsule shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)] data-[active=true]:border-primary data-[active=true]:ring-2 data-[active=true]:ring-primary/30 data-[active=true]:z-10 aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        connected:
          "size-10 border-y border-r border-border/60 bg-capsule shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85)] first:rounded-l-xl first:border-l last:rounded-r-xl data-[active=true]:border-primary data-[active=true]:ring-2 data-[active=true]:ring-primary/20 data-[active=true]:z-10 aria-invalid:border-destructive aria-invalid:ring-destructive/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function InputOTPSlot({
  index,
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof inputOTPSlotVariants> & {
    index: number
  }) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      data-variant={variant}
      className={cn(inputOTPSlotVariants({ variant }), className)}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-primary h-5 w-0.5 rounded-full duration-1000" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      className={cn("text-muted-foreground mx-1", className)}
      {...props}
    >
      <MinusIcon className="size-4" />
    </div>
  )
}

function InputOTPDot({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-dot"
      role="separator"
      className={cn("text-muted-foreground mx-2", className)}
      {...props}
    >
      <div className="size-1.5 rounded-full bg-current" />
    </div>
  )
}

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
  InputOTPDot,
}
