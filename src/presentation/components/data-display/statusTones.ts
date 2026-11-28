import type { OrderStatus, TabStatus, TableStatus } from '@/data/mock'

export type BadgeTone =
  | 'livre'
  | 'ocupada'
  | 'conta'
  | 'info'
  | 'warning'
  | 'success'
  | 'danger'
  | 'neutral'

export function getTableStatusTone(status: TableStatus): BadgeTone {
  switch (status) {
    case 'Livre':
      return 'livre'
    case 'Ocupada':
      return 'ocupada'
    case 'Pedindo a conta':
      return 'conta'
  }
}

export function getTabStatusTone(status: TabStatus): BadgeTone {
  switch (status) {
    case 'Aberta':
      return 'ocupada'
    case 'Pedindo a conta':
      return 'conta'
    case 'Fechada':
      return 'neutral'
  }
}

export function getOrderStatusTone(status: OrderStatus): BadgeTone {
  switch (status) {
    case 'Em Andamento':
      return 'info'
    case 'Pendente':
      return 'warning'
    case 'Entregue':
      return 'success'
    case 'Cancelado':
      return 'danger'
  }
}
