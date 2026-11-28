import type { ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

export interface EmptyStateProps {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className={cn(
        'flex flex-col items-center justify-center text-center rounded-lg border border-dashed border-background-tertiary bg-background-secondary px-6 py-10 space-y-4',
        className
      )}
    >
      {icon && (
        <div
          aria-hidden="true"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-background-tertiary text-text-secondary"
        >
          {icon}
        </div>
      )}
      <div className="space-y-1.5 max-w-md">
        <h2 className="text-heading-md text-text-primary">{title}</h2>
        {description && (
          <p className="text-body-sm text-text-secondary">{description}</p>
        )}
      </div>
      {action && <div className="pt-1">{action}</div>}
    </div>
  )
}
