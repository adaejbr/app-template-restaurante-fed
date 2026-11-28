import type {
  Category,
  Customer,
  DiningTable,
  Order,
  PaymentMethod,
  Product,
  RestaurantData,
  Tab,
} from './types'

const productImage = '/images/mock/product-placeholder.svg'

export const mockCategories: Category[] = [
  {
    id: 'category-starters',
    name: 'Entradas',
    description: 'Para começar a refeição.',
    imageUrl: productImage,
  },
  {
    id: 'category-mains',
    name: 'Pratos principais',
    description: 'Pratos feitos na hora.',
    imageUrl: productImage,
  },
  {
    id: 'category-drinks',
    name: 'Bebidas',
    description: 'Bebidas geladas e quentes.',
    imageUrl: productImage,
  },
  {
    id: 'category-desserts',
    name: 'Sobremesas',
    description: 'Uma opção para fechar a refeição.',
    imageUrl: productImage,
  },
]

export const mockProducts: Product[] = [
  {
    id: 'product-burger',
    name: 'Hambúrguer da casa',
    description: 'Hambúrguer artesanal, queijo, alface e molho da casa.',
    imageUrl: productImage,
    price: 32.5,
    categoryId: 'category-mains',
    unit: 'unidade',
    stockQuantity: 12,
    lowStockThreshold: 4,
  },
  {
    id: 'product-pizza',
    name: 'Pizza margherita',
    description: 'Molho de tomate, muçarela, tomate e manjericão.',
    imageUrl: productImage,
    price: 46,
    categoryId: 'category-mains',
    unit: 'unidade',
    stockQuantity: 2,
    lowStockThreshold: 4,
  },
  {
    id: 'product-salad',
    name: 'Salada da estação',
    description: 'Folhas frescas, tomate e molho cítrico.',
    imageUrl: productImage,
    price: 24,
    categoryId: 'category-starters',
    unit: 'porção',
    stockQuantity: 0,
    lowStockThreshold: 3,
  },
  {
    id: 'product-soda',
    name: 'Refrigerante',
    description: 'Lata de refrigerante, servida gelada.',
    imageUrl: productImage,
    price: 6.5,
    categoryId: 'category-drinks',
    unit: 'lata',
    stockQuantity: 30,
    lowStockThreshold: 8,
  },
  {
    id: 'product-brownie',
    name: 'Brownie com sorvete',
    description: 'Brownie de chocolate servido com sorvete.',
    imageUrl: productImage,
    price: 18,
    categoryId: 'category-desserts',
    unit: 'porção',
    stockQuantity: 6,
    lowStockThreshold: 2,
  },
  {
    id: 'product-pasta',
    name: 'Penne ao molho',
    description: 'Penne com molho de tomate e parmesão.',
    imageUrl: productImage,
    price: 29,
    categoryId: 'category-mains',
    unit: 'porção',
    stockQuantity: 3,
    lowStockThreshold: 4,
  },
]

export const mockTables: DiningTable[] = [
  { id: 'table-1', name: 'Mesa 1', seats: 2 },
  { id: 'table-2', name: 'Mesa 2', seats: 4 },
  { id: 'table-3', name: 'Mesa 3', seats: 4 },
  { id: 'table-4', name: 'Mesa 4', seats: 6 },
  { id: 'table-5', name: 'Mesa 5', seats: 2 },
]

export const mockCustomers: Customer[] = [
  {
    id: 'customer-final',
    name: 'Consumidor Final',
    phone: '',
  },
  {
    id: 'customer-ana',
    name: 'Ana Ribeiro',
    phone: '(11) 99999-1001',
  },
  {
    id: 'customer-bruno',
    name: 'Bruno Costa',
    phone: '(11) 99999-1002',
  },
  {
    id: 'customer-clara',
    name: 'Clara Martins',
    phone: '(11) 99999-1003',
  },
]

export const mockPaymentMethods: PaymentMethod[] = [
  { id: 'payment-pix', name: 'Pix' },
  { id: 'payment-card', name: 'Cartão' },
  { id: 'payment-cash', name: 'Dinheiro' },
]

export const mockTabs: Tab[] = [
  {
    id: 'tab-demo-201',
    tableId: 'table-2',
    customerId: 'customer-clara',
    status: 'Aberta',
    paymentMethodId: null,
    openedAt: '2026-11-28T11:30:00.000Z',
    closedAt: null,
  },
  {
    id: 'tab-demo-301',
    tableId: 'table-3',
    customerId: 'customer-ana',
    status: 'Pedindo a conta',
    paymentMethodId: null,
    openedAt: '2026-11-28T11:45:00.000Z',
    closedAt: null,
  },
  {
    id: 'tab-demo-401',
    tableId: 'table-4',
    customerId: 'customer-final',
    status: 'Aberta',
    paymentMethodId: null,
    openedAt: '2026-11-28T12:00:00.000Z',
    closedAt: null,
  },
  {
    id: 'tab-demo-402',
    tableId: 'table-4',
    customerId: 'customer-bruno',
    status: 'Aberta',
    paymentMethodId: null,
    openedAt: '2026-11-28T12:05:00.000Z',
    closedAt: null,
  },
  {
    id: 'tab-demo-501',
    tableId: 'table-5',
    customerId: 'customer-final',
    status: 'Fechada',
    paymentMethodId: 'payment-pix',
    openedAt: '2026-11-28T10:00:00.000Z',
    closedAt: '2026-11-28T10:40:00.000Z',
  },
]

export const mockOrders: Order[] = [
  {
    id: 'order-demo-201a',
    tabId: 'tab-demo-201',
    status: 'Em Andamento',
    notes: 'Servir as bebidas primeiro.',
    createdAt: '2026-11-28T11:35:00.000Z',
    items: [
      {
        id: 'item-demo-201a-1',
        productId: 'product-burger',
        quantity: 2,
        unitPrice: 32.5,
        notes: 'Um sem cebola.',
        cancelled: false,
      },
      {
        id: 'item-demo-201a-2',
        productId: 'product-soda',
        quantity: 2,
        unitPrice: 6.5,
        notes: '',
        cancelled: false,
      },
    ],
  },
  {
    id: 'order-demo-201b',
    tabId: 'tab-demo-201',
    status: 'Pendente',
    notes: '',
    createdAt: '2026-11-28T11:50:00.000Z',
    items: [
      {
        id: 'item-demo-201b-1',
        productId: 'product-brownie',
        quantity: 1,
        unitPrice: 18,
        notes: 'Sem calda.',
        cancelled: false,
      },
    ],
  },
  {
    id: 'order-demo-301',
    tabId: 'tab-demo-301',
    status: 'Em Andamento',
    notes: 'Alergia a amendoim.',
    createdAt: '2026-11-28T11:55:00.000Z',
    items: [
      {
        id: 'item-demo-301-1',
        productId: 'product-burger',
        quantity: 1,
        unitPrice: 32.5,
        notes: 'Pão bem tostado.',
        cancelled: false,
      },
      {
        id: 'item-demo-301-2',
        productId: 'product-soda',
        quantity: 1,
        unitPrice: 6.5,
        notes: '',
        cancelled: false,
      },
    ],
  },
  {
    id: 'order-demo-401',
    tabId: 'tab-demo-401',
    status: 'Entregue',
    notes: '',
    createdAt: '2026-11-28T12:10:00.000Z',
    items: [
      {
        id: 'item-demo-401-1',
        productId: 'product-pizza',
        quantity: 1,
        unitPrice: 46,
        notes: 'Cortar em oito pedaços.',
        cancelled: false,
      },
      {
        id: 'item-demo-401-2',
        productId: 'product-soda',
        quantity: 1,
        unitPrice: 6.5,
        notes: '',
        cancelled: false,
      },
    ],
  },
  {
    id: 'order-demo-402',
    tabId: 'tab-demo-402',
    status: 'Pendente',
    notes: 'Verificar ponto antes de enviar.',
    createdAt: '2026-11-28T12:12:00.000Z',
    items: [
      {
        id: 'item-demo-402-1',
        productId: 'product-burger',
        quantity: 1,
        unitPrice: 32.5,
        notes: 'Bem passado.',
        cancelled: false,
      },
      {
        id: 'item-demo-402-2',
        productId: 'product-brownie',
        quantity: 2,
        unitPrice: 18,
        notes: '',
        cancelled: false,
      },
    ],
  },
  {
    id: 'order-demo-501',
    tabId: 'tab-demo-501',
    status: 'Entregue',
    notes: '',
    createdAt: '2026-11-28T10:10:00.000Z',
    items: [
      {
        id: 'item-demo-501-1',
        productId: 'product-pasta',
        quantity: 1,
        unitPrice: 29,
        notes: '',
        cancelled: false,
      },
    ],
  },
]

export const createInitialRestaurantData = (): RestaurantData => ({
  categories: mockCategories.map((category) => ({ ...category })),
  products: mockProducts.map((product) => ({ ...product })),
  tables: mockTables.map((table) => ({ ...table })),
  customers: mockCustomers.map((customer) => ({ ...customer })),
  paymentMethods: mockPaymentMethods.map((method) => ({ ...method })),
  tabs: mockTabs.map((tab) => ({ ...tab })),
  orders: mockOrders.map((order) => ({
    ...order,
    items: order.items.map((item) => ({ ...item })),
  })),
})
