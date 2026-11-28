import type {
  Order,
  Product,
  ProductStockStatus,
  RestaurantData,
  TableStatus,
  Tab,
} from './types'

export const calculateOrderTotal = (order: Order): number => {
  if (order.status === 'Cancelado') {
    return 0
  }

  return order.items.reduce(
    (total, item) =>
      item.cancelled ? total : total + item.quantity * item.unitPrice,
    0
  )
}

export const calculateTabTotal = (
  tabId: string,
  orders: Order[]
): number =>
  orders
    .filter((order) => order.tabId === tabId)
    .reduce((total, order) => total + calculateOrderTotal(order), 0)

export const selectOrderTotal = (
  state: Pick<RestaurantData, 'orders'>,
  orderId: string
): number | undefined => {
  const order = state.orders.find((candidate) => candidate.id === orderId)
  return order ? calculateOrderTotal(order) : undefined
}

export const selectTabTotal = (
  state: Pick<RestaurantData, 'orders' | 'tabs'>,
  tabId: string
): number | undefined =>
  state.tabs.some((tab) => tab.id === tabId)
    ? calculateTabTotal(tabId, state.orders)
    : undefined

export const selectActiveTabCount = (
  state: Pick<RestaurantData, 'tabs'>
): number => state.tabs.filter((tab) => tab.status !== 'Fechada').length

export const selectOpenTabsTotal = (
  state: Pick<RestaurantData, 'orders' | 'tabs'>
): number =>
  state.tabs
    .filter((tab) => tab.status !== 'Fechada')
    .reduce(
      (total, tab) => total + calculateTabTotal(tab.id, state.orders),
      0
    )

export const selectActiveTabsForTable = (
  state: Pick<RestaurantData, 'tabs'>,
  tableId: string
): Tab[] =>
  state.tabs.filter(
    (tab) => tab.tableId === tableId && tab.status !== 'Fechada'
  )

export const selectTableStatus = (
  state: Pick<RestaurantData, 'tables' | 'tabs'>,
  tableId: string
): TableStatus | undefined => {
  if (!state.tables.some((table) => table.id === tableId)) {
    return undefined
  }

  const activeTabs = selectActiveTabsForTable(state, tableId)
  if (activeTabs.some((tab) => tab.status === 'Pedindo a conta')) {
    return 'Pedindo a conta'
  }

  return activeTabs.length > 0 ? 'Ocupada' : 'Livre'
}

export const selectProductStockStatus = (
  product: Product
): ProductStockStatus => {
  if (product.stockQuantity <= 0) {
    return 'Esgotado'
  }

  return product.stockQuantity <= product.lowStockThreshold
    ? 'Baixo'
    : 'Disponível'
}
