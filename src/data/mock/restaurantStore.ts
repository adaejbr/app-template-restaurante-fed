import create from 'zustand'

import { createInitialRestaurantData } from './fixtures'
import type {
  ActiveOrderStatus,
  NewOrderInput,
  NewOrderItem,
  OpenTabInput,
  Order,
  OrderItem,
  RestaurantData,
  Tab,
} from './types'

export interface RestaurantActions {
  openTab: (input: OpenTabInput) => Tab
  requestBill: (tabId: string) => void
  createOrder: (input: NewOrderInput) => Order
  editOrder: (
    orderId: string,
    changes: Partial<Pick<NewOrderInput, 'items' | 'notes'>>
  ) => void
  updateOrderStatus: (orderId: string, status: ActiveOrderStatus) => void
  cancelOrderItem: (orderId: string, itemId: string) => void
  cancelOrder: (orderId: string) => void
  closeTab: (tabId: string, paymentMethodId: string) => void
  resetDemoData: () => void
}

export type RestaurantStore = RestaurantData & RestaurantActions

const defaultCustomerId = 'customer-final'
let nextGeneratedId = 0

const createId = (prefix: string): string =>
  `${prefix}-${Date.now()}-${++nextGeneratedId}`

const createItems = (
  items: NewOrderItem[],
  products: RestaurantData['products']
): OrderItem[] =>
  items.map((item) => {
    if (!Number.isFinite(item.quantity) || item.quantity <= 0) {
      throw new Error('A quantidade do item deve ser maior que zero.')
    }

    const product = products.find(
      (candidate) => candidate.id === item.productId
    )
    if (!product) {
      throw new Error(`Produto não encontrado: ${item.productId}`)
    }

    return {
      id: createId('item'),
      productId: product.id,
      quantity: item.quantity,
      unitPrice: product.price,
      notes: item.notes ?? '',
      cancelled: false,
    }
  })

export const useRestaurantStore = create<RestaurantStore>()((set, get) => ({
  ...createInitialRestaurantData(),

  openTab: ({ tableId, customerId = defaultCustomerId }) => {
    const state = get()
    if (!state.tables.some((table) => table.id === tableId)) {
      throw new Error(`Mesa não encontrada: ${tableId}`)
    }
    if (!state.customers.some((customer) => customer.id === customerId)) {
      throw new Error(`Cliente não encontrado: ${customerId}`)
    }

    const tab: Tab = {
      id: createId('tab'),
      tableId,
      customerId,
      status: 'Aberta',
      paymentMethodId: null,
      openedAt: new Date().toISOString(),
      closedAt: null,
    }

    set((current) => ({ tabs: [...current.tabs, tab] }))
    return tab
  },

  requestBill: (tabId) => {
    const tab = get().tabs.find((candidate) => candidate.id === tabId)
    if (!tab || tab.status === 'Fechada') {
      throw new Error(`Comanda ativa não encontrada: ${tabId}`)
    }

    set((state) => ({
      tabs: state.tabs.map((candidate) =>
        candidate.id === tabId
          ? { ...candidate, status: 'Pedindo a conta' }
          : candidate
      ),
    }))
  },

  createOrder: ({ tabId, items, notes = '' }) => {
    const state = get()
    const tab = state.tabs.find((candidate) => candidate.id === tabId)
    if (!tab || tab.status === 'Fechada') {
      throw new Error(`Comanda ativa não encontrada: ${tabId}`)
    }
    if (items.length === 0) {
      throw new Error('O pedido precisa ter pelo menos um item.')
    }

    const order: Order = {
      id: createId('order'),
      tabId,
      items: createItems(items, state.products),
      notes,
      status: 'Pendente',
      createdAt: new Date().toISOString(),
    }

    set((current) => ({ orders: [...current.orders, order] }))
    return order
  },

  editOrder: (orderId, changes) => {
    const state = get()
    const order = state.orders.find((candidate) => candidate.id === orderId)
    if (!order || order.status === 'Cancelado' || order.status === 'Entregue') {
      throw new Error(`Pedido editável não encontrado: ${orderId}`)
    }
    if (changes.items && changes.items.length === 0) {
      throw new Error('O pedido precisa ter pelo menos um item.')
    }

    const items = changes.items
      ? createItems(changes.items, state.products)
      : order.items

    set((current) => ({
      orders: current.orders.map((candidate) =>
        candidate.id === orderId
          ? {
              ...candidate,
              items,
              notes: changes.notes ?? candidate.notes,
            }
          : candidate
      ),
    }))
  },

  updateOrderStatus: (orderId, status) => {
    const order = get().orders.find((candidate) => candidate.id === orderId)
    if (!order || order.status === 'Cancelado') {
      throw new Error(`Pedido ativo não encontrado: ${orderId}`)
    }

    set((state) => ({
      orders: state.orders.map((candidate) =>
        candidate.id === orderId ? { ...candidate, status } : candidate
      ),
    }))
  },

  cancelOrderItem: (orderId, itemId) => {
    const order = get().orders.find((candidate) => candidate.id === orderId)
    if (!order || order.status === 'Cancelado') {
      throw new Error(`Pedido ativo não encontrado: ${orderId}`)
    }
    if (!order.items.some((item) => item.id === itemId)) {
      throw new Error(`Item não encontrado no pedido: ${itemId}`)
    }

    set((state) => ({
      orders: state.orders.map((candidate) => {
        if (candidate.id !== orderId) {
          return candidate
        }

        const items = candidate.items.map((item) =>
          item.id === itemId ? { ...item, cancelled: true } : item
        )
        return {
          ...candidate,
          items,
          status: items.every((item) => item.cancelled)
            ? 'Cancelado'
            : candidate.status,
        }
      }),
    }))
  },

  cancelOrder: (orderId) => {
    if (!get().orders.some((order) => order.id === orderId)) {
      throw new Error(`Pedido não encontrado: ${orderId}`)
    }

    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, status: 'Cancelado' } : order
      ),
    }))
  },

  closeTab: (tabId, paymentMethodId) => {
    const state = get()
    const tab = state.tabs.find((candidate) => candidate.id === tabId)
    if (!tab || tab.status === 'Fechada') {
      throw new Error(`Comanda ativa não encontrada: ${tabId}`)
    }
    if (
      !state.paymentMethods.some(
        (method) => method.id === paymentMethodId
      )
    ) {
      throw new Error(`Forma de pagamento não encontrada: ${paymentMethodId}`)
    }

    set((current) => ({
      tabs: current.tabs.map((candidate) =>
        candidate.id === tabId
          ? {
              ...candidate,
              status: 'Fechada',
              paymentMethodId,
              closedAt: new Date().toISOString(),
            }
          : candidate
      ),
    }))
  },

  resetDemoData: () => set(createInitialRestaurantData()),
}))
