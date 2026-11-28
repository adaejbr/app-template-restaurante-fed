import { beforeEach, describe, expect, it } from 'vitest'

import {
  mockCategories,
  mockProducts,
  useRestaurantStore,
} from './index'
import {
  selectActiveTabCount,
  selectActiveTabsForTable,
  selectOpenTabsTotal,
  selectProductStockStatus,
  selectTabTotal,
  selectTableStatus,
} from './selectors'

describe('mock local do restaurante', () => {
  beforeEach(() => {
    useRestaurantStore.getState().resetDemoData()
  })

  it('cobre categorias, estoque, estados de mesa e comandas múltiplas', () => {
    const state = useRestaurantStore.getState()

    expect(mockCategories.length).toBeGreaterThan(0)
    expect(
      mockProducts.every((product) =>
        mockCategories.some((category) => category.id === product.categoryId)
      )
    ).toBe(true)
    expect(mockProducts.map(selectProductStockStatus)).toEqual([
      'Disponível',
      'Baixo',
      'Esgotado',
      'Disponível',
      'Disponível',
      'Baixo',
    ])
    expect(selectTableStatus(state, 'table-1')).toBe('Livre')
    expect(selectTableStatus(state, 'table-2')).toBe('Ocupada')
    expect(selectTableStatus(state, 'table-3')).toBe('Pedindo a conta')
    expect(selectActiveTabsForTable(state, 'table-4')).toHaveLength(2)
    expect(
      state.orders.some((order) => order.status === 'Pendente')
    ).toBe(true)
    expect(
      state.orders.some((order) => order.status === 'Em Andamento')
    ).toBe(true)
    expect(state.orders.some((order) => order.status === 'Entregue')).toBe(true)
    expect(
      state.customers.some((customer) => customer.name === 'Consumidor Final')
    ).toBe(true)
    expect(
      state.orders.some(
        (order) =>
          order.items.length > 1 &&
          order.items.some((item) => item.notes.length > 0)
      )
    ).toBe(true)
    expect(state.paymentMethods.length).toBeGreaterThan(0)
  })

  it('compartilha operações, cancelamentos, totais e fechamento', () => {
    const tab = useRestaurantStore.getState().openTab({ tableId: 'table-1' })
    expect(selectTableStatus(useRestaurantStore.getState(), 'table-1')).toBe(
      'Ocupada'
    )

    const order = useRestaurantStore.getState().createOrder({
      tabId: tab.id,
      notes: 'Levar guardanapos.',
      items: [
        { productId: 'product-burger', quantity: 1 },
        { productId: 'product-soda', quantity: 2 },
      ],
    })
    expect(order.status).toBe('Pendente')
    expect(selectTabTotal(useRestaurantStore.getState(), tab.id)).toBe(45.5)
    useRestaurantStore.getState().updateOrderStatus(order.id, 'Em Andamento')

    useRestaurantStore.getState().editOrder(order.id, {
      notes: 'Sem guardanapos.',
      items: [
        { productId: 'product-brownie', quantity: 2 },
        { productId: 'product-soda', quantity: 1 },
      ],
    })
    expect(selectTabTotal(useRestaurantStore.getState(), tab.id)).toBe(42.5)
    expect(
      useRestaurantStore.getState().orders.find((candidate) => candidate.id === order.id)
        ?.notes
    ).toBe('Sem guardanapos.')

    const editedOrder = useRestaurantStore
      .getState()
      .orders.find((candidate) => candidate.id === order.id)!
    useRestaurantStore
      .getState()
      .cancelOrderItem(order.id, editedOrder.items[0].id)
    expect(selectTabTotal(useRestaurantStore.getState(), tab.id)).toBe(6.5)
    useRestaurantStore.getState().cancelOrder(order.id)
    expect(selectTabTotal(useRestaurantStore.getState(), tab.id)).toBe(0)

    useRestaurantStore.getState().requestBill(tab.id)
    expect(selectTableStatus(useRestaurantStore.getState(), 'table-1')).toBe(
      'Pedindo a conta'
    )
    useRestaurantStore.getState().closeTab(tab.id, 'payment-pix')
    expect(selectTableStatus(useRestaurantStore.getState(), 'table-1')).toBe(
      'Livre'
    )
    expect(selectActiveTabCount(useRestaurantStore.getState())).toBe(4)
  })

  it('cancela pedidos e restaura fixtures e totais iniciais', () => {
    const store = useRestaurantStore.getState()
    store.cancelOrder('order-demo-402')
    expect(
      selectTabTotal(useRestaurantStore.getState(), 'tab-demo-402')
    ).toBe(0)

    store.resetDemoData()
    expect(
      selectTabTotal(useRestaurantStore.getState(), 'tab-demo-402')
    ).toBe(68.5)
    expect(selectOpenTabsTotal(useRestaurantStore.getState())).toBeGreaterThan(
      0
    )
  })
})
