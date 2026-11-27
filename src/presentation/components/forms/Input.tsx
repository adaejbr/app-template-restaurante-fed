import { cn } from '@/shared/utils/cn';
import { forwardRef, type InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 1 | 2 | 3 | undefined;
  loading?: boolean;
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'primary', size = 2, loading, error, disabled, children, ...props }, ref) => {
    
    const baseStyles = 'inline-flex my-2 mx-2 items-center justify-center font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const inputVariants = {
      primary: 'bg-gray-300 text-text-inverse hover:bg-primary-600 focus-visible:ring-primary-500',
      secondary: 'bg-secondary-500 text-background hover:bg-secondary-600 focus-visible:ring-secondary-500',
      outline: 'border-2 border-primary-500 text-primary-500 bg-transparent hover:bg-primary-500 hover:text-text-inverse focus-visible:ring-primary-500',
      ghost: 'text-text-secondary hover:text-text-primary hover:bg-background-tertiary focus-visible:ring-text-muted',
      danger: 'bg-error text-text-inverse hover:opacity-90 focus-visible:ring-error',
      success: 'bg-success text-text-inverse hover:opacity-90 focus-visible:ring-success',
    }

    const inputSizes = {
      1: 'px-3 py-1.5 text-body-sm gap-1.5',
      2: 'px-4 py-2 text-body-md gap-2',
      3: 'px-6 py-3 text-body-lg gap-2.5',
    }

    return (
      <input
        ref={ref}
        className={cn(baseStyles, inputVariants[variant], inputSizes[size], className)}
        disabled={disabled || loading}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

