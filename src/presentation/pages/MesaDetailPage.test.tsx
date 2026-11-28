import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useRestaurantStore } from '@/data/mock'
import { ComandaCard } from '@/presentation/features/comandas/comanda'
import MesaDetailPage from './MesaDetailPage'
import PedidoMontagemPage from './PedidoMontagemPage'

function renderMesaRoute(initialEntry: string) {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/mesas/:mesaId" element={<MesaDetailPage />} />
        <Route
          path="/pedido/novo/:comandaId"
          element={<PedidoMontagemPage />}
        />
      </Routes>
    </MemoryRouter>
  )
}

describe('MesaDetailPage — Visão da mesa e divisão de comandas', () => {
  beforeEach(() => {
    useRestaurantStore.getState().resetDemoData()
  })

  it('exibe identificação da mesa, contagem de comandas abertas, responsáveis, pedidos agrupados por status e total não editável', () => {
    renderMesaRoute('/mesas/table-4')

    expect(
      screen.getByRole('heading', { name: 'Mesa 4', level: 1 })
    ).toBeTruthy()
    expect(screen.getAllByText('2 comandas abertas').length).toBeGreaterThan(0)

    const comandasSection = screen.getByRole('region', {
      name: 'Comandas ativas da Mesa 4',
    })
    const articles = within(comandasSection).getAllByRole('article')
    expect(articles).toHaveLength(2)

    const primeiraComanda = articles[0]
    expect(within(primeiraComanda).getByText('Comanda #01')).toBeTruthy()
    expect(within(primeiraComanda).getByText('Consumidor Final')).toBeTruthy()
    expect(within(primeiraComanda).getByText('Entregue')).toBeTruthy()
    expect(within(primeiraComanda).getByText(/Pizza margherita/)).toBeTruthy()
    const total1 = within(primeiraComanda).getByLabelText(
      /Total da comanda #01/i
    )
    expect(total1.textContent).toMatch(/R\$\s*52,50/)

    const segundaComanda = articles[1]
    expect(within(segundaComanda).getByText('Comanda #02')).toBeTruthy()
    expect(within(segundaComanda).getByText('Bruno Costa')).toBeTruthy()
    expect(within(segundaComanda).getByText('Pendente')).toBeTruthy()
    const total2 = within(segundaComanda).getByLabelText(
      /Total da comanda #02/i
    )
    expect(total2.textContent).toMatch(/R\$\s*68,50/)

    expect(screen.queryByRole('spinbutton')).toBeNull()
    expect(screen.queryByRole('textbox')).toBeNull()
  })

  it('agrupa pedidos por status dentro da mesma comanda', () => {
    renderMesaRoute('/mesas/table-2')

    expect(
      screen.getByRole('heading', { name: 'Mesa 2', level: 1 })
    ).toBeTruthy()
    expect(screen.getAllByText('1 comanda aberta').length).toBeGreaterThan(0)
    expect(screen.getByText('Clara Martins')).toBeTruthy()

    expect(
      screen.getByRole('region', { name: 'Pedidos com status Em Andamento' })
    ).toBeTruthy()
    expect(
      screen.getByRole('region', { name: 'Pedidos com status Pendente' })
    ).toBeTruthy()

    expect(
      screen.getByLabelText(/Total da comanda #01/i).textContent
    ).toMatch(/R\$\s*96,00/)
  })

  it('exibe EmptyState quando a mesa não possui comandas ativas ou quando só há comandas finalizadas', () => {
    const firstRender = renderMesaRoute('/mesas/table-1')

    expect(
      screen.getByRole('heading', { name: 'Mesa 1', level: 1 })
    ).toBeTruthy()
    expect(screen.getAllByText('0 comandas abertas').length).toBeGreaterThan(0)
    expect(
      screen.getByText('Nenhuma comanda aberta nesta mesa')
    ).toBeTruthy()
    firstRender.unmount()

    renderMesaRoute('/mesas/table-5')
    expect(
      screen.getByRole('heading', { name: 'Mesa 5', level: 1 })
    ).toBeTruthy()
    expect(
      screen.getByText('Nenhuma comanda aberta nesta mesa')
    ).toBeTruthy()
  })

  it('exibe validação local quando a mesa informada não existe', () => {
    renderMesaRoute('/mesas/mesa-inexistente')

    expect(screen.getByText('Mesa não encontrada')).toBeTruthy()
    expect(
      screen
        .getByRole('link', { name: 'Ir para mapa de mesas' })
        .getAttribute('href')
    ).toBe('/mesas')
  })

  it('impede edição ou lançamento de pedidos em comandas finalizadas', () => {
    const state = useRestaurantStore.getState()
    const finalizedTab = state.tabs.find((tab) => tab.status === 'Fechada')!
    const onSelect = vi.fn()
    const onAddOrder = vi.fn()

    render(
      <ComandaCard
        tab={finalizedTab}
        tabNumber="#01"
        customer={state.customers.find(
          (customer) => customer.id === finalizedTab.customerId
        )}
        orders={state.orders}
        products={state.products}
        isSelected={false}
        onSelect={onSelect}
        onAddOrder={onAddOrder}
      />
    )

    expect(screen.getByText('Fechada')).toBeTruthy()
    expect(
      screen.getByText(
        /Comanda finalizada\. Não é possível editar ou lançar novos pedidos nesta tela\./i
      )
    ).toBeTruthy()
    expect(
      screen.queryByRole('button', { name: /Adicionar novo pedido/i })
    ).toBeNull()
    expect(
      screen.queryByRole('button', { name: /Selecionar comanda/i })
    ).toBeNull()
  })

  it('permite selecionar a comanda correta e seguir para a montagem do pedido', async () => {
    const user = userEvent.setup()
    renderMesaRoute('/mesas/table-4')

    await user.click(
      screen.getByRole('button', {
        name: 'Adicionar novo pedido na Comanda #02 de Bruno Costa',
      })
    )

    expect(
      screen.getByRole('heading', { name: /Mesa 4 .* Comanda #02/i })
    ).toBeTruthy()
    expect(screen.getByText('Bruno Costa')).toBeTruthy()
    expect(screen.getByText('tab-demo-402')).toBeTruthy()
  })

  it('permite marcar uma comanda como selecionada e prosseguir pela barra de seleção', async () => {
    const user = userEvent.setup()
    renderMesaRoute('/mesas/table-4')

    const selectButtons = screen.getAllByRole('button', {
      name: 'Selecionar comanda',
    })
    await user.click(selectButtons[0])

    const selectionRegion = screen.getByRole('region', {
      name: 'Comanda selecionada',
    })
    expect(selectionRegion.textContent).toContain('Comanda #01')
    expect(selectionRegion.textContent).toContain('Consumidor Final')

    await user.click(
      within(selectionRegion).getByRole('button', {
        name: 'Seguir para montagem do pedido',
      })
    )

    expect(
      screen.getByRole('heading', { name: /Mesa 4 .* Comanda #01/i })
    ).toBeTruthy()
    expect(screen.getByText('tab-demo-401')).toBeTruthy()
  })

  it('cria nova comanda adicional na mesma mesa sem modificar as existentes e suporta teclado/Escape', async () => {
    const user = userEvent.setup()
    renderMesaRoute('/mesas/table-4')

    const triggerButton = screen.getByRole('button', {
      name: '+ Nova comanda',
    })
    await user.click(triggerButton)

    const dialog = screen.getByRole('dialog', { name: 'Nova comanda' })
    expect(dialog).toBeTruthy()

    const searchInput = within(dialog).getByLabelText(
      'Buscar cliente (nome ou telefone)'
    )
    await waitFor(() => expect(document.activeElement).toBe(searchInput))

    await user.type(searchInput, 'inexistente')
    expect(
      within(dialog).getByText(/Nenhum cliente encontrado/i)
    ).toBeTruthy()

    await user.clear(searchInput)
    await user.click(within(dialog).getByLabelText(/Ana Ribeiro/))
    await user.click(
      within(dialog).getByRole('button', { name: 'Criar comanda' })
    )

    expect(screen.queryByRole('dialog')).toBeNull()
    expect(screen.getByText('Comanda criada para Ana Ribeiro.')).toBeTruthy()
    expect(screen.getAllByText('3 comandas abertas').length).toBeGreaterThan(0)

    const comandasSection = screen.getByRole('region', {
      name: 'Comandas ativas da Mesa 4',
    })
    const articles = within(comandasSection).getAllByRole('article')
    expect(articles).toHaveLength(3)
    expect(within(articles[0]).getByText('Consumidor Final')).toBeTruthy()
    expect(within(articles[1]).getByText('Bruno Costa')).toBeTruthy()
    expect(within(articles[2]).getByText('Ana Ribeiro')).toBeTruthy()
    expect(
      within(articles[2]).getByLabelText(/Total da comanda #03/i).textContent
    ).toMatch(/R\$\s*0,00/)

    await user.click(triggerButton)
    expect(screen.getByRole('dialog', { name: 'Nova comanda' })).toBeTruthy()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).toBeNull()
    await waitFor(() => expect(document.activeElement).toBe(triggerButton))
  })
})
