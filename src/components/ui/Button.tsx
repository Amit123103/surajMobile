import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-none text-sm font-bold uppercase tracking-wider font-heading ring-offset-background transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 brutalist-button",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-black",
        destructive: "bg-red-500 text-white",
        outline: "bg-white text-black",
        secondary: "bg-accent text-black",
        ghost: "hover:bg-zinc-200 text-black border-transparent shadow-none hover:shadow-none hover:-translate-x-0 hover:-translate-y-0",
        link: "text-primary-600 underline-offset-4 hover:underline border-transparent shadow-none hover:shadow-none hover:-translate-x-0 hover:-translate-y-0",
        gradient: "bg-primary-500 text-black", // Removed gradient for flat brutalism
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
