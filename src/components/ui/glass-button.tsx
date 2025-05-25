
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const glassButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 touch-target touch-feedback",
  {
    variants: {
      variant: {
        default: "glass-strong text-foreground hover:glass-strong hover:scale-105 hover:shadow-lg",
        primary: "gradient-primary text-primary-foreground hover:scale-105 hover:shadow-xl hover-glow",
        secondary: "gradient-secondary text-secondary-foreground hover:scale-105 hover:shadow-lg",
        ghost: "glass-subtle hover:glass hover:scale-105",
        outline: "border-2 border-primary/20 glass-subtle hover:glass hover:border-primary/40 hover:scale-105",
        destructive: "bg-destructive/80 text-destructive-foreground hover:bg-destructive/90 hover:scale-105",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-11 w-11",
      },
      glow: {
        none: "",
        primary: "hover-glow",
        secondary: "hover:shadow-[0_0_20px_hsl(var(--secondary)/0.4)]",
        accent: "hover:shadow-[0_0_20px_hsl(var(--accent)/0.6)]",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      glow: "none",
    },
  }
)

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glassButtonVariants> {
  asChild?: boolean
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant, size, glow, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(glassButtonVariants({ variant, size, glow, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
GlassButton.displayName = "GlassButton"

export { GlassButton, glassButtonVariants }
