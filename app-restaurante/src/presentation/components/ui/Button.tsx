import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/shared/utils/cn'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary: 'bg-primary-500 text-text-inverse hover:bg-primary-600 focus-visible:ring-primary-500',
      secondary: 'bg-secondary-500 text-background hover:bg-secondary-600 focus-visible:ring-secondary-500',
      outline: 'border-2 border-primary-500 text-primary-500 bg-transparent hover:bg-primary-500 hover:text-text-inverse focus-visible:ring-primary-500',
      ghost: 'text-text-secondary hover:text-text-primary hover:bg-background-tertiary focus-visible:ring-text-muted',
      danger: 'bg-error text-text-inverse hover:opacity-90 focus-visible:ring-error',
      success: 'bg-success text-text-inverse hover:opacity-90 focus-visible:ring-success',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-body-sm gap-1.5',
      md: 'px-4 py-2 text-body-md gap-2',
      lg: 'px-6 py-3 text-body-lg gap-2.5',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'