import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { Customer, DiningTable } from '@/data/mock'
import { Button } from '@/presentation/components/ui'
import { cn } from '@/shared/utils/cn'

export interface NovaComandaModalProps {
  isOpen: boolean
  table: DiningTable
  customers: Customer[]
  onClose: () => void
  onConfirm: (customerId: string) => void
}

const DEFAULT_CUSTOMER_ID = 'customer-final'

function NovaComandaModalContent({
  table,
  customers,
  onClose,
  onConfirm,
}: Omit<NovaComandaModalProps, 'isOpen'>) {
  const titleId = useId()
  const searchInputId = useId()
  const searchRef = useRef<HTMLInputElement>(null)

  const defaultCustomer = useMemo(
    () =>
      customers.find((customer) => customer.id === DEFAULT_CUSTOMER_ID)?.id ??
      customers[0]?.id ??
      '',
    [customers]
  )

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCustomerId, setSelectedCustomerId] = useState(defaultCustomer)
  const [validationError, setValidationError] = useState<string | null>(null)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      searchRef.current?.focus()
    })

    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const filteredCustomers = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase()
    if (!normalized) {
      return customers
    }

    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(normalized) ||
        customer.phone.toLowerCase().includes(normalized)
    )
  }, [customers, searchTerm])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!selectedCustomerId) {
      setValidationError('Selecione um cliente responsável para abrir a comanda.')
      return
    }

    const customerExists = customers.some(
      (customer) => customer.id === selectedCustomerId
    )
    if (!customerExists) {
      setValidationError('Cliente selecionado não foi encontrado nos registros.')
      return
    }

    setValidationError(null)
    onConfirm(selectedCustomerId)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md rounded-lg border border-background-tertiary bg-background-secondary p-6 shadow-xl space-y-5"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h2 id={titleId} className="text-heading-lg text-text-primary">
              Nova comanda
            </h2>
            <p className="text-body-sm text-text-secondary">
              Mesa vinculada:{' '}
              <strong className="text-text-primary">{table.name}</strong> (
              {table.seats} lugares)
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Fechar janela de nova comanda"
            className="min-h-[44px] min-w-[44px] focus-visible:ring-offset-background"
          >
            ✕
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-1.5">
            <label
              htmlFor={searchInputId}
              className="block text-body-sm font-medium text-text-secondary"
            >
              Buscar cliente (nome ou telefone)
            </label>
            <input
              ref={searchRef}
              id={searchInputId}
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Ex.: Clara, Ana ou (11)..."
              className="w-full min-h-[44px] rounded-md border border-background-tertiary bg-background px-3 py-2 text-body-sm text-text-primary placeholder:text-text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background-secondary"
            />
          </div>

          <fieldset className="space-y-2">
            <legend className="text-body-sm font-medium text-text-secondary">
              Responsável pela comanda
            </legend>

            {filteredCustomers.length === 0 ? (
              <p
                role="status"
                className="rounded-md border border-dashed border-background-tertiary bg-background px-3 py-4 text-center text-body-sm text-text-muted"
              >
                Nenhum cliente encontrado para &ldquo;{searchTerm}&rdquo;.
              </p>
            ) : (
              <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                {filteredCustomers.map((customer) => {
                  const isChecked = selectedCustomerId === customer.id

                  return (
                    <label
                      key={customer.id}
                      className={cn(
                        'flex cursor-pointer items-center justify-between gap-3 rounded-md border px-3 py-2.5 min-h-[44px] transition-colors',
                        isChecked
                          ? 'border-primary-500 bg-primary-500/10'
                          : 'border-background-tertiary bg-background hover:bg-background-tertiary/50'
                      )}
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        <input
                          type="radio"
                          name="comanda-customer"
                          value={customer.id}
                          checked={isChecked}
                          onChange={() => {
                            setSelectedCustomerId(customer.id)
                            setValidationError(null)
                          }}
                          className="h-4 w-4 text-primary-500 focus:ring-primary-500"
                        />
                        <span className="truncate text-body-sm font-medium text-text-primary">
                          {customer.name}
                        </span>
                      </span>
                      {customer.phone && (
                        <span className="text-caption text-text-muted shrink-0">
                          {customer.phone}
                        </span>
                      )}
                    </label>
                  )
                })}
              </div>
            )}
          </fieldset>

          {validationError && (
            <p
              role="alert"
              className="rounded-md border border-error/40 bg-error/10 px-3 py-2 text-body-sm text-error"
            >
              {validationError}
            </p>
          )}

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={onClose}
              className="min-h-[44px] focus-visible:ring-offset-background"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="min-h-[44px] focus-visible:ring-offset-background"
            >
              Criar comanda
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function NovaComandaModal({
  isOpen,
  table,
  customers,
  onClose,
  onConfirm,
}: NovaComandaModalProps) {
  if (!isOpen) {
    return null
  }

  return (
    <NovaComandaModalContent
      table={table}
      customers={customers}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  )
}
