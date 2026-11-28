import { calculateOrderTotal, type Order, type OrderStatus, type Product } from '@/data/mock'
import {
  StatusBadge,
  getOrderStatusTone,
} from '@/presentation/components/data-display'
import { formatCurrency, formatTime } from '@/shared/utils/formatters'

const ORDER_STATUS_ORDER: OrderStatus[] = [
  'Em Andamento',
  'Pendente',
  'Entregue',
  'Cancelado',
]

export interface ComandaOrdersSummaryProps {
  orders: Order[]
  products: Product[]
}

export function ComandaOrdersSummary({
  orders,
  products,
}: ComandaOrdersSummaryProps) {
  if (orders.length === 0) {
    return (
      <p className="rounded-md border border-dashed border-background-tertiary bg-background px-4 py-3 text-body-sm text-text-muted">
        Nenhum pedido lançado nesta comanda até o momento.
      </p>
    )
  }

  const productMap = new Map(products.map((product) => [product.id, product]))

  const groupedOrders = ORDER_STATUS_ORDER.map((status) => ({
    status,
    orders: orders.filter((order) => order.status === status),
  })).filter((group) => group.orders.length > 0)

  return (
    <div className="space-y-3">
      {groupedOrders.map((group) => (
        <section
          key={group.status}
          aria-label={`Pedidos com status ${group.status}`}
          className="rounded-md border border-background-tertiary bg-background p-3 space-y-2.5"
        >
          <div className="flex items-center justify-between gap-2">
            <StatusBadge
              label={group.status}
              tone={getOrderStatusTone(group.status)}
            />
            <span className="text-caption text-text-muted">
              {group.orders.length}{' '}
              {group.orders.length === 1 ? 'pedido' : 'pedidos'}
            </span>
          </div>

          <ul className="space-y-2">
            {group.orders.map((order) => {
              const orderTotal = calculateOrderTotal(order)
              const isOrderCancelled = order.status === 'Cancelado'

              return (
                <li
                  key={order.id}
                  className="rounded-sm bg-background-secondary/80 px-3 py-2 space-y-1.5 border border-background-tertiary/70"
                >
                  <div className="flex items-center justify-between gap-2 text-caption text-text-secondary">
                    <span>Pedido às {formatTime(order.createdAt)}</span>
                    <span className="font-mono font-medium text-text-primary">
                      {formatCurrency(orderTotal)}
                    </span>
                  </div>

                  <ul className="space-y-1">
                    {order.items.map((item) => {
                      const productName =
                        productMap.get(item.productId)?.name ??
                        'Produto não identificado'
                      const lineTotal = item.cancelled
                        ? 0
                        : item.quantity * item.unitPrice

                      return (
                        <li
                          key={item.id}
                          className="flex flex-col gap-0.5 text-body-sm"
                        >
                          <div className="flex items-baseline justify-between gap-2">
                            <span
                              className={
                                item.cancelled || isOrderCancelled
                                  ? 'line-through text-text-muted'
                                  : 'text-text-primary'
                              }
                            >
                              <span className="font-mono font-medium">
                                {item.quantity}x
                              </span>{' '}
                              {productName}
                              {item.cancelled ? ' (Item cancelado)' : ''}
                            </span>
                            <span className="font-mono text-caption text-text-secondary shrink-0">
                              {formatCurrency(lineTotal)}
                            </span>
                          </div>
                          {item.notes && (
                            <p className="text-caption text-text-muted pl-5">
                              Obs.: {item.notes}
                            </p>
                          )}
                        </li>
                      )
                    })}
                  </ul>

                  {order.notes && (
                    <p className="text-caption text-secondary-400 border-t border-background-tertiary pt-1.5">
                      Observação do pedido: {order.notes}
                    </p>
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}
