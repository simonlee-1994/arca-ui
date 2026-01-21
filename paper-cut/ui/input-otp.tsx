"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { cva, type VariantProps } from "class-variance-authority"
import { MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-1.5", className)}
      {...props}
    />
  )
}

const inputOTPSlotVariants = cva(
  "relative flex items-center justify-center font-medium transition-all duration-paper ease-paper outline-none",
  {
    variants: {
      variant: {
        default: "border border-paper-edge",
        circle:
          "rounded-full border border-paper-edge",
        underline:
          "rounded-none border-0 border-b-2 border-paper-edge bg-transparent data-[active=true]:border-ring",
      },
      elevation: {
        inset:
          "bg-secondary/60 shadow-none data-[active=true]:bg-card data-[active=true]:border-ring",
        elevated:
          "bg-card shadow-paper-sm data-[active=true]:-translate-x-[var(--paper-lift-sm)] data-[active=true]:-translate-y-[var(--paper-lift-sm)] data-[active=true]:shadow-paper-md data-[active=true]:border-ring data-[active=true]:z-10",
      },
      size: {
        default: "h-10 w-10 text-sm",
        sm: "h-8 w-8 text-xs",
        lg: "h-12 w-12 text-base",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        size: "sm",
        className: "rounded-[10px]",
      },
      {
        variant: "default",
        size: "default",
        className: "rounded-[12px]",
      },
      {
        variant: "default",
        size: "lg",
        className: "rounded-[14px]",
      },
      {
        variant: "underline",
        elevation: "inset",
        className:
          "bg-transparent shadow-none data-[active=true]:bg-transparent data-[active=true]:shadow-none data-[active=true]:-translate-x-0 data-[active=true]:-translate-y-0",
      },
      {
        variant: "underline",
        elevation: "elevated",
        className:
          "bg-transparent shadow-none data-[active=true]:bg-transparent data-[active=true]:shadow-none data-[active=true]:-translate-x-0 data-[active=true]:-translate-y-0",
      },
    ],
    defaultVariants: {
      variant: "default",
      elevation: "inset",
      size: "default",
    },
  }
)

function InputOTPSlot({
  index,
  className,
  variant = "default",
  size = "default",
  elevation = "inset",
  masked = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof inputOTPSlotVariants> & {
    index: number
    masked?: boolean
  }) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  const displayChar = masked && char ? "●" : char

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        inputOTPSlotVariants({ variant, size, elevation }),
        "aria-invalid:border-destructive aria-invalid:bg-destructive/5",
        "data-[active=true]:aria-invalid:border-destructive",
        className
      )}
      {...props}
    >
      {displayChar}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-5 w-px duration-1000" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      className="text-muted-foreground"
      {...props}
    >
      <MinusIcon className="size-4" />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
