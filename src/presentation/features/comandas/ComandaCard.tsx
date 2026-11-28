import {
  calculateTabTotal,
  type Customer,
  type Order,
  type Product,
  type Tab,
} from '@/data/mock'
import {
  StatusBadge,
  getTabStatusTone,
} from '@/presentation/components/data-display'
import { Button } from '@/presentation/components/ui'
import { cn } from '@/shared/utils/cn'
import { formatCurrency, formatTime } from '@/shared/utils/formatters'
import { ComandaOrdersSummary } from './ComandaOrdersSummary'

export interface ComandaCardProps {
  tab: Tab
  tabNumber: string
  customer?: Customer
  orders: Order[]
  products: Product[]
  isSelected: boolean
  onSelect: (tabId: string) => void
  onAddOrder: (tabId: string) => void
}

export function ComandaCard({
  tab,
  tabNumber,
  customer,
  orders,
  products,
  isSelected,
  onSelect,
  onAddOrder,
}: ComandaCardProps) {
  const isFinalized = tab.status === 'Fechada'
  const customerName = customer?.name ?? 'Consumidor Final'
  const tabOrders = orders.filter((order) => order.tabId === tab.id)
  const total = calculateTabTotal(tab.id, tabOrders)

  return (
    <article
      aria-label={`Comanda ${tabNumber} - ${customerName}`}
      className={cn(
        'flex flex-col justify-between rounded-lg border bg-background-secondary p-5 shadow-sm transition-colors space-y-4',
        isSelected && !isFinalized
          ? 'border-secondary-500 ring-2 ring-secondary-500/40'
          : 'border-background-tertiary'
      )}
    >
      <div className="space-y-4">
        <header className="flex flex-wrap items-start justify-between gap-3 border-b border-background-tertiary pb-3">
          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-caption font-medium text-secondary-400 bg-secondary-500/10 border border-secondary-500/30 rounded px-2 py-0.5">
                Comanda {tabNumber}
              </span>
              <StatusBadge
                label={tab.status}
                tone={getTabStatusTone(tab.status)}
              />
            </div>
            <h3 className="text-heading-md text-text-primary break-words">
              {customerName}
            </h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-caption text-text-muted">
              <span>Aberta às {formatTime(tab.openedAt)}</span>
              {customer?.phone && <span>Tel.: {customer.phone}</span>}
            </div>
          </div>

          {!isFinalized && (
            <Button
              type="button"
              variant={isSelected ? 'secondary' : 'ghost'}
              size="sm"
              aria-pressed={isSelected}
              onClick={() => onSelect(tab.id)}
              className="min-h-[44px] shrink-0 border border-background-tertiary focus-visible:ring-offset-background"
            >
              {isSelected ? 'Comanda selecionada' : 'Selecionar comanda'}
            </Button>
          )}
        </header>

        <ComandaOrdersSummary orders={tabOrders} products={products} />
      </div>

      <footer className="space-y-3 border-t border-background-tertiary pt-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-body-sm font-medium text-text-secondary">
            Total da comanda
          </span>
          <output
            aria-label={`Total da comanda ${tabNumber}: ${formatCurrency(total)}`}
            className="font-mono text-heading-lg font-semibold text-text-primary"
          >
            {formatCurrency(total)}
          </output>
        </div>

        {isFinalized ? (
          <p className="rounded-md bg-background px-3 py-2 text-caption text-text-muted border border-background-tertiary">
            Comanda finalizada. Não é possível editar ou lançar novos pedidos
            nesta tela.
          </p>
        ) : (
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={() => onAddOrder(tab.id)}
            aria-label={`Adicionar novo pedido na Comanda ${tabNumber} de ${customerName}`}
            className="w-full min-h-[48px] text-body-md font-semibold focus-visible:ring-offset-background"
          >
            + Adicionar Novo Pedido
          </Button>
        )}
      </footer>
    </article>
  )
}
