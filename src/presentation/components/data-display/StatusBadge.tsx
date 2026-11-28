import { cn } from '@/shared/utils/cn'
import type { BadgeTone } from './statusTones'

export interface StatusBadgeProps {
  label: string
  tone?: BadgeTone
  className?: string
}

const toneStyles: Record<BadgeTone, string> = {
  livre: 'bg-status-livre/20 text-status-livre border-status-livre/40',
  ocupada: 'bg-status-ocupada/20 text-status-ocupada border-status-ocupada/40',
  conta: 'bg-status-conta/20 text-status-conta border-status-conta/40',
  info: 'bg-info/20 text-info border-info/40',
  warning: 'bg-warning/20 text-warning border-warning/40',
  success: 'bg-success/20 text-success border-success/40',
  danger: 'bg-error/20 text-error border-error/40',
  neutral: 'bg-background-tertiary text-text-secondary border-background-hover',
}

export function StatusBadge({
  label,
  tone = 'neutral',
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-caption font-medium whitespace-nowrap',
        toneStyles[tone],
        className
      )}
    >
      {label}
    </span>
  )
}
