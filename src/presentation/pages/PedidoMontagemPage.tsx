import { Link, useParams } from 'react-router-dom'
import {
  calculateTabTotal,
  selectActiveTabsForTable,
  useRestaurantStore,
} from '@/data/mock'
import { EmptyState } from '@/presentation/components/feedback'
import { formatCurrency, formatTabNumber } from '@/shared/utils/formatters'

export default function PedidoMontagemPage() {
  const { comandaId = '' } = useParams<{ comandaId: string }>()

  const tabs = useRestaurantStore((state) => state.tabs)
  const tables = useRestaurantStore((state) => state.tables)
  const customers = useRestaurantStore((state) => state.customers)
  const orders = useRestaurantStore((state) => state.orders)

  const tab = tabs.find((candidate) => candidate.id === comandaId)
  const table = tab
    ? tables.find((candidate) => candidate.id === tab.tableId)
    : undefined
  const customer = tab
    ? customers.find((candidate) => candidate.id === tab.customerId)
    : undefined

  if (!tab || !table) {
    return (
      <main className="space-y-6">
        <EmptyState
          title="Comanda não encontrada"
          description="Não foi possível localizar a comanda selecionada para montagem do pedido."
          action={
            <Link
              to="/mesas"
              className="inline-flex items-center justify-center min-h-[44px] rounded-md bg-primary-500 px-4 py-2 text-body-md font-medium text-text-inverse hover:bg-primary-600 transition-colors focus-ring"
            >
              Voltar para mesas
            </Link>
          }
        />
      </main>
    )
  }

  const activeTabs = selectActiveTabsForTable({ tabs }, table.id)
  const tabIndex = activeTabs.findIndex((candidate) => candidate.id === tab.id)
  const tabNumber = tabIndex >= 0 ? formatTabNumber(tabIndex) : '#--'
  const total = calculateTabTotal(tab.id, orders)

  return (
    <main className="space-y-6">
      <Link
        to={`/mesas/${table.id}`}
        className="inline-flex items-center gap-2 min-h-[44px] text-body-sm font-medium text-text-secondary hover:text-text-primary rounded-md px-2 focus-ring"
      >
        &larr; Voltar para {table.name}
      </Link>

      <section className="rounded-lg border border-background-tertiary bg-background-secondary p-6 space-y-4">
        <div className="space-y-1">
          <p className="text-caption uppercase tracking-wide text-secondary-400 font-medium">
            Montagem do pedido
          </p>
          <h1 className="text-heading-xl text-text-primary">
            {table.name} &bull; Comanda {tabNumber}
          </h1>
          <p className="text-body-md text-text-secondary">
            Responsável:{' '}
            <strong className="text-text-primary">
              {customer?.name ?? 'Consumidor Final'}
            </strong>
          </p>
        </div>

        <div className="rounded-md border border-background-tertiary bg-background p-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-body-sm text-text-secondary">
            Total acumulado da comanda
          </span>
          <span className="font-mono text-heading-md font-semibold text-text-primary">
            {formatCurrency(total)}
          </span>
        </div>

        <p className="text-body-sm text-text-muted">
          Comanda <code className="text-text-secondary">{tab.id}</code>{' '}
          selecionada corretamente para o fluxo de montagem de pedido.
        </p>
      </section>
    </main>
  )
}
