import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/shared/utils/cn'
import LoadingIcon from '@/shared/components/icons/LoadingIcon'

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
          <LoadingIcon />
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'