import { useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
import {
  ComandaCard,
  NovaComandaModal,
} from '@/presentation/features/comandas/comanda'
import { formatTabNumber } from '@/shared/utils/formatters'

export default function MesaDetailPage() {
  const { mesaId = '' } = useParams<{ mesaId: string }>()
  const navigate = useNavigate()

  const tables = useRestaurantStore((state) => state.tables)
  const tabs = useRestaurantStore((state) => state.tabs)
  const orders = useRestaurantStore((state) => state.orders)
  const customers = useRestaurantStore((state) => state.customers)
  const products = useRestaurantStore((state) => state.products)
  const openTab = useRestaurantStore((state) => state.openTab)

  const [selectedTabId, setSelectedTabId] = useState<string | null>(null)
  const [isNovaComandaOpen, setIsNovaComandaOpen] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
  const [localError, setLocalError] = useState<string | null>(null)

  const novaComandaButtonRef = useRef<HTMLButtonElement>(null)

  const table = useMemo(
    () => tables.find((candidate) => candidate.id === mesaId),
    [tables, mesaId]
  )

  const activeTabs = useMemo(
    () => (table ? selectActiveTabsForTable({ tabs }, table.id) : []),
    [table, tabs]
  )

  const tableStatus = useMemo(
    () => (table ? selectTableStatus({ tables, tabs }, table.id) : undefined),
    [table, tables, tabs]
  )

  const customerMap = useMemo(
    () => new Map(customers.map((customer) => [customer.id, customer])),
    [customers]
  )

  const selectedTabIndex = activeTabs.findIndex(
    (tab) => tab.id === selectedTabId
  )
  const selectedTab = selectedTabIndex >= 0 ? activeTabs[selectedTabIndex] : null
  const selectedCustomerName = selectedTab
    ? (customerMap.get(selectedTab.customerId)?.name ?? 'Consumidor Final')
    : null

  const handleOpenNovaComanda = () => {
    setLocalError(null)
    setIsNovaComandaOpen(true)
  }

  const handleCloseNovaComanda = () => {
    setIsNovaComandaOpen(false)
    window.requestAnimationFrame(() => {
      novaComandaButtonRef.current?.focus()
    })
  }

  const handleCreateComanda = (customerId: string) => {
    if (!table) {
      setLocalError('Não foi possível abrir comanda: mesa inválida.')
      return
    }

    try {
      const createdTab = openTab({ tableId: table.id, customerId })
      const customerName =
        customerMap.get(createdTab.customerId)?.name ?? 'Consumidor Final'
      setSelectedTabId(createdTab.id)
      setFeedbackMessage(`Comanda criada para ${customerName}.`)
      setLocalError(null)
      handleCloseNovaComanda()
    } catch (error) {
      setLocalError(
        error instanceof Error
          ? error.message
          : 'Não foi possível criar a comanda.'
      )
    }
  }

  const handleSelectTab = (tabId: string) => {
    setSelectedTabId((current) => (current === tabId ? null : tabId))
  }

  const handleProceedToOrder = (tabId: string) => {
    const targetTab = activeTabs.find((tab) => tab.id === tabId)
    if (!targetTab) {
      setLocalError(
        'Selecione uma comanda ativa válida para seguir para o pedido.'
      )
      return
    }

    navigate(`/pedido/novo/${targetTab.id}`, {
      state: { tableId: table?.id, tabId: targetTab.id },
    })
  }

  if (!table || !tableStatus) {
    return (
      <main className="space-y-6">
        <nav aria-label="Navegação de retorno">
          <Link
            to="/mesas"
            className="inline-flex items-center gap-2 min-h-[44px] text-body-sm font-medium text-text-secondary hover:text-text-primary rounded-md px-2 focus-ring"
          >
            &larr; Voltar para mesas
          </Link>
        </nav>

        <EmptyState
          title="Mesa não encontrada"
          description="A mesa selecionada não existe nos registros atuais. Volte ao mapa de mesas para escolher outra mesa."
          action={
            <Link
              to="/mesas"
              className="inline-flex items-center justify-center min-h-[44px] rounded-md bg-primary-500 px-4 py-2 text-body-md font-medium text-text-inverse hover:bg-primary-600 transition-colors focus-ring"
            >
              Ir para mapa de mesas
            </Link>
          }
        />
      </main>
    )
  }

  const openTabsLabel =
    activeTabs.length === 1
      ? '1 comanda aberta'
      : `${activeTabs.length} comandas abertas`

  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <Link
          to="/mesas"
          className="inline-flex items-center gap-2 min-h-[44px] text-body-sm font-medium text-text-secondary hover:text-text-primary rounded-md px-2 focus-ring"
        >
          &larr; Voltar para mesas
        </Link>
      </div>

      <header className="rounded-lg border border-background-tertiary bg-background-secondary p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-heading-xl text-text-primary">
                {table.name}
              </h1>
              <StatusBadge
                label={tableStatus}
                tone={getTableStatusTone(tableStatus)}
              />
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-body-sm text-text-secondary">
              <span>{table.seats} lugares</span>
              <span aria-hidden="true">&bull;</span>
              <span className="font-medium text-text-primary">
                {openTabsLabel}
              </span>
            </div>
          </div>

          <Button
            ref={novaComandaButtonRef}
            type="button"
            variant="secondary"
            size="md"
            onClick={handleOpenNovaComanda}
            className="min-h-[44px] w-full sm:w-auto font-semibold focus-visible:ring-offset-background"
          >
            + Nova comanda
          </Button>
        </div>
      </header>

      {feedbackMessage && (
        <div
          role="status"
          className="flex items-center justify-between gap-3 rounded-md border border-success/40 bg-success/10 px-4 py-3 text-body-sm text-success"
        >
          <span>{feedbackMessage}</span>
          <button
            type="button"
            onClick={() => setFeedbackMessage(null)}
            aria-label="Dispensar aviso"
            className="min-h-[36px] min-w-[36px] rounded px-2 text-caption font-medium hover:bg-success/20 focus-ring"
          >
            Fechar
          </button>
        </div>
      )}

      {localError && (
        <div
          role="alert"
          className="rounded-md border border-error/40 bg-error/10 px-4 py-3 text-body-sm text-error"
        >
          {localError}
        </div>
      )}

      {selectedTab && (
        <section
          aria-label="Comanda selecionada"
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-secondary-500/60 bg-secondary-500/10 px-4 py-3"
        >
          <div className="space-y-0.5">
            <p className="text-caption font-medium uppercase tracking-wide text-secondary-400">
              Comanda selecionada para lançamento
            </p>
            <p className="text-body-md font-semibold text-text-primary">
              Comanda {formatTabNumber(selectedTabIndex)} &bull;{' '}
              {selectedCustomerName}
            </p>
          </div>

          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => handleProceedToOrder(selectedTab.id)}
            className="min-h-[44px] w-full sm:w-auto focus-visible:ring-offset-background"
          >
            Seguir para montagem do pedido
          </Button>
        </section>
      )}

      <section aria-label={`Comandas ativas da ${table.name}`} className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-heading-md text-text-primary">
            Comandas da mesa
          </h2>
          <span className="text-body-sm text-text-muted">
            {openTabsLabel}
          </span>
        </div>

        {activeTabs.length === 0 ? (
          <EmptyState
            title="Nenhuma comanda aberta nesta mesa"
            description="Abra uma comanda para vincular um cliente ou Consumidor Final e iniciar o lançamento de pedidos."
            action={
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleOpenNovaComanda}
                className="min-h-[44px] focus-visible:ring-offset-background"
              >
                + Nova comanda
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {activeTabs.map((tab, index) => (
              <ComandaCard
                key={tab.id}
                tab={tab}
                tabNumber={formatTabNumber(index)}
                customer={customerMap.get(tab.customerId)}
                orders={orders}
                products={products}
                isSelected={selectedTabId === tab.id}
                onSelect={handleSelectTab}
                onAddOrder={handleProceedToOrder}
              />
            ))}
          </div>
        )}
      </section>

      <NovaComandaModal
        isOpen={isNovaComandaOpen}
        table={table}
        customers={customers}
        onClose={handleCloseNovaComanda}
        onConfirm={handleCreateComanda}
      />
    </main>
  )
}
