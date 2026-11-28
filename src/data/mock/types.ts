export type TableStatus = 'Livre' | 'Ocupada' | 'Pedindo a conta'

export type TabStatus = 'Aberta' | 'Pedindo a conta' | 'Fechada'

export type OrderStatus =
  | 'Em Andamento'
  | 'Pendente'
  | 'Entregue'
  | 'Cancelado'

export type ActiveOrderStatus = Exclude<OrderStatus, 'Cancelado'>

export type ProductStockStatus = 'Disponível' | 'Baixo' | 'Esgotado'

export interface Category {
  id: string
  name: string
  description: string
  imageUrl: string
}

export interface Product {
  id: string
  name: string
  description: string
  imageUrl: string
  price: number
  categoryId: string
  unit: string
  stockQuantity: number
  lowStockThreshold: number
}

export interface DiningTable {
  id: string
  name: string
  seats: number
}

export interface Customer {
  id: string
  name: string
  phone: string
}

export interface PaymentMethod {
  id: string
  name: string
}

export interface Tab {
  id: string
  tableId: string
  customerId: string
  status: TabStatus
  paymentMethodId: string | null
  openedAt: string
  closedAt: string | null
}

export interface OrderItem {
  id: string
  productId: string
  quantity: number
  unitPrice: number
  notes: string
  cancelled: boolean
}

export interface Order {
  id: string
  tabId: string
  items: OrderItem[]
  notes: string
  status: OrderStatus
  createdAt: string
}

export interface RestaurantData {
  categories: Category[]
  products: Product[]
  tables: DiningTable[]
  customers: Customer[]
  paymentMethods: PaymentMethod[]
  tabs: Tab[]
  orders: Order[]
}

export interface NewOrderItem {
  productId: string
  quantity: number
  notes?: string
}

export interface NewOrderInput {
  tabId: string
  items: NewOrderItem[]
  notes?: string
}

export interface OpenTabInput {
  tableId: string
  customerId?: string
}
