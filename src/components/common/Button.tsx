
import React from 'react';
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:brightness-105 shadow-sm",
        destructive: "bg-destructive text-destructive-foreground hover:brightness-105 shadow-sm",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-balance-blue to-balance-indigo text-white hover:brightness-105 shadow-sm",
        glass: "bg-white/20 backdrop-blur-lg border border-white/30 text-white hover:bg-white/30 shadow-sm",
        soft: "bg-balance-blue/10 text-balance-blue hover:bg-balance-blue/20",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-6 text-base",
        icon: "h-9 w-9",
      },
      rounded: {
        default: "rounded-lg",
        full: "rounded-full",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, ...props }, ref) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, size, rounded, className }),
          "relative overflow-hidden group"
        )}
        ref={ref}
        {...props}
      >
        <span className="relative z-10">{props.children}</span>
        <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-active:opacity-20 transition-opacity duration-200 pointer-events-none"></span>
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
