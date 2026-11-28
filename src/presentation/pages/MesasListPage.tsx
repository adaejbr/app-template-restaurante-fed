import { Link } from 'react-router-dom'
import {
  selectActiveTabsForTable,
  selectTableStatus,
  useRestaurantStore,
} from '@/data/mock'
import {
  StatusBadge,
  getTableStatusTone,
} from '@/presentation/components/data-display'
import { EmptyState } from '@/presentation/components/feedback'
import { Button } from '@/presentation/components/ui'

export default function MesasListPage() {
  const tables = useRestaurantStore((state) => state.tables)
  const tabs = useRestaurantStore((state) => state.tabs)
  const resetDemoData = useRestaurantStore((state) => state.resetDemoData)

  return (
    <main className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-heading-xl text-text-primary">Mesas</h1>
          <p className="text-body-sm text-text-secondary">
            Selecione uma mesa para visualizar e gerenciar suas comandas ativas.
          </p>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={resetDemoData}
          className="min-h-[44px] border border-background-tertiary self-start sm:self-auto focus-visible:ring-offset-background"
        >
          Restaurar dados de demonstração
        </Button>
      </header>

      {tables.length === 0 ? (
        <EmptyState
          title="Nenhuma mesa cadastrada"
          description="Não há mesas disponíveis nos dados de demonstração."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tables.map((table) => {
            const status = selectTableStatus({ tables, tabs }, table.id) ?? 'Livre'
            const activeCount = selectActiveTabsForTable(
              { tabs },
              table.id
            ).length

            return (
              <Link
                key={table.id}
                to={`/mesas/${table.id}`}
                className="block rounded-lg border border-background-tertiary bg-background-secondary p-5 shadow-sm transition-colors hover:bg-background-hover focus-ring"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <h2 className="text-heading-md text-text-primary">
                      {table.name}
                    </h2>
                    <p className="text-caption text-text-muted">
                      {table.seats} lugares
                    </p>
                  </div>
                  <StatusBadge
                    label={status}
                    tone={getTableStatusTone(status)}
                  />
                </div>

                <p className="mt-4 text-body-sm text-text-secondary">
                  {activeCount === 1
                    ? '1 comanda aberta'
                    : `${activeCount} comandas abertas`}
                </p>
              </Link>
            )
          })}
        </div>
      )}
    </main>
  )
}
