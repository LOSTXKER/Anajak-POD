// Mock Data for POD Application
// ใช้แทน Prisma ในการพัฒนาและทดสอบ

export interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  sku: string | null;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  fabricGrade: string | null;
  fiberType: string | null;
  thickness: string | null;
  sizes: string[];
  colors: string[];
  badge: string | null;
  suitableFor: string | null;
  userId: string;
}

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  orderId: string;
  productId: string;
  product: {
    title: string;
  };
}

export interface Order {
  id: string;
  orderNumber: string;
  totalAmount: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  items: OrderItem[];
  user?: {
    name: string;
    email: string;
  };
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'SALE' | 'WITHDRAWAL' | 'DEPOSIT';
  createdAt: Date;
  walletId: string;
}

export interface Wallet {
  id: string;
  balance: number;
  updatedAt: Date;
  userId: string;
}

export interface Integration {
  id: string;
  platform: string;
  apiKey: string | null;
  shopName: string | null;
  isConnected: boolean;
  createdAt: Date;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: 'USER' | 'ADMIN' | 'SELLER';
  createdAt: Date;
  updatedAt: Date;
}

// ========== Mock Users ==========
export const mockUsers: User[] = [
  {
    id: 'user-001',
    email: 'demo@anajak.com',
    name: 'Anajak Demo User',
    role: 'SELLER',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  },
];

// ========== Mock Products ==========
export const mockProducts: Product[] = [
  {
    id: '0085c157-117d-46dc-b737-aa233c9ae86b',
    title: 'Anajak Semi 32',
    description: 'เสื้อยืดทรงปกติ ตัวเก่ง สีครบจบทุกงาน',
    price: 120.0,
    sku: 'TS-SEMI32',
    isPublished: true,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop',
    fabricGrade: 'Semi',
    fiberType: 'ฝ้าย 100%',
    thickness: 'No. 32 / 155-165 gsm',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
    colors: ['#FFFFFF', '#000000', '#1E3A8A', '#DC2626', '#FBBF24', '#10B981'],
    badge: 'ไม่มีขั้นต่ำ',
    suitableFor: 'ทำแบรนด์, เสื้อพนักงาน',
    userId: 'user-001',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  },
  {
    id: '4f397390-53c6-4fb7-9f89-0c1b12c3ad85',
    title: 'Anajak Premium Comb 20',
    description: 'เสื้อยืดพรีเมียม ผ้าหนานุ่ม ไม่ย้วย ทรงสวย',
    price: 180.0,
    sku: 'TS-COMB20',
    isPublished: true,
    imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1887&auto=format&fit=crop',
    fabricGrade: 'Comb',
    fiberType: 'Cotton 100%',
    thickness: 'No. 20 / 210 gsm',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['#000000', '#FFFFFF', '#374151', '#4B5563', '#9CA3AF'],
    badge: 'Premium',
    suitableFor: 'แบรนด์ Streetwear',
    userId: 'user-001',
    createdAt: new Date('2025-01-02'),
    updatedAt: new Date('2025-01-02'),
  },
  {
    id: '77505c6d-833a-47e9-8843-f29a2072c109',
    title: 'Anajak Oversize Street',
    description: 'ทรงหลวม ไหล่ตก สไตล์สตรีท ผ้าหนาอยู่ทรง',
    price: 250.0,
    sku: 'TS-OVER',
    isPublished: true,
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop',
    fabricGrade: 'Super Soft',
    fiberType: 'Cotton 100%',
    thickness: 'No. 20 / 220 gsm',
    sizes: ['M', 'L', 'XL', '2XL'],
    colors: ['#000000', '#FFFFFF', '#BEF264', '#A855F7', '#EC4899'],
    badge: 'ขายดี 🔥',
    suitableFor: 'วัยรุ่น, แฟชั่น',
    userId: 'user-001',
    createdAt: new Date('2025-01-03'),
    updatedAt: new Date('2025-01-03'),
  },
  {
    id: '92beb2fe-b22b-4631-a863-8d5418da9d31',
    title: 'Anajak Canvas Tote',
    description: 'กระเป๋าผ้าดิบ ทนทาน รับน้ำหนักได้ดี',
    price: 89.0,
    sku: 'BAG-CV',
    isPublished: true,
    imageUrl: 'https://images.unsplash.com/photo-1597484662317-c931d96f52f0?q=80&w=1935&auto=format&fit=crop',
    fabricGrade: 'Canvas',
    fiberType: 'Cotton Canvas',
    thickness: '12 oz',
    sizes: ['12x14"', '14x16"', '16x18"'],
    colors: ['#E5E5E5', '#171717', '#F59E0B'],
    badge: 'รักษ์โลก 🌱',
    suitableFor: 'แจก, ของชำร่วย',
    userId: 'user-001',
    createdAt: new Date('2025-01-04'),
    updatedAt: new Date('2025-01-04'),
  },
  {
    id: 'ab58f9d7-cf76-443f-9076-157e9dfa1067',
    title: 'Anajak Polo Classic',
    description: 'โปโลทรงสวย ผ้า Kaneko ระบายอากาศดี ไม่ขึ้นขน',
    price: 220.0,
    sku: 'PL-CLS',
    isPublished: true,
    imageUrl: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=2071&auto=format&fit=crop',
    fabricGrade: 'Kaneko',
    fiberType: 'TC',
    thickness: '300 gsm',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['#FFFFFF', '#000000', '#1E3A8A', '#065F46'],
    badge: 'Uniform',
    suitableFor: 'ชุดยูนิฟอร์ม, ทางการ',
    userId: 'user-001',
    createdAt: new Date('2025-01-05'),
    updatedAt: new Date('2025-01-05'),
  },
  {
    id: 'aeb8b736-7412-4dd0-a15b-3164c7ee6348',
    title: 'Anajak Hoodie Heavy',
    description: 'ฮู้ดดี้ผ้าสำลี หนา นุ่ม กันหนาวได้จริง',
    price: 450.0,
    sku: 'HD-HV',
    isPublished: true,
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop',
    fabricGrade: 'Fleece',
    fiberType: 'Cotton/Poly',
    thickness: '350 gsm',
    sizes: ['Free Size', 'Oversize'],
    colors: ['#000000', '#9CA3AF', '#6366F1'],
    badge: 'Winter',
    suitableFor: 'กันหนาว, แฟชั่น',
    userId: 'user-001',
    createdAt: new Date('2025-01-06'),
    updatedAt: new Date('2025-01-06'),
  },
  {
    id: 'affa5026-2c8a-445d-85d9-07aedfad5da5',
    title: 'Anajak Kids Tee',
    description: 'เสื้อยืดเด็ก ผ้านุ่มพิเศษ ไม่ระคายเคืองผิว',
    price: 90.0,
    sku: 'TS-KIDS',
    isPublished: true,
    imageUrl: 'https://images.unsplash.com/photo-1519238263496-63439708dc80?q=80&w=2060&auto=format&fit=crop',
    fabricGrade: 'Soft',
    fiberType: 'Cotton 100%',
    thickness: 'No. 32 / 150 gsm',
    sizes: ['24"', '26"', '28"', '30"'],
    colors: ['#FFFFFF', '#FCA5A5', '#93C5FD', '#FDE047'],
    badge: 'Kids',
    suitableFor: 'เด็กเล็ก, โรงเรียน',
    userId: 'user-001',
    createdAt: new Date('2025-01-07'),
    updatedAt: new Date('2025-01-07'),
  },
];

// ========== Mock Orders ==========
export const mockOrders: Order[] = [
  {
    id: 'order-001',
    orderNumber: 'ORD-0081',
    totalAmount: 360.0,
    status: 'DELIVERED',
    createdAt: new Date('2025-12-01T10:30:00'),
    updatedAt: new Date('2025-12-05T14:00:00'),
    userId: 'user-001',
    user: { name: 'Anajak Demo User', email: 'demo@anajak.com' },
    items: [
      {
        id: 'item-001',
        quantity: 3,
        price: 120.0,
        orderId: 'order-001',
        productId: '0085c157-117d-46dc-b737-aa233c9ae86b',
        product: { title: 'Anajak Semi 32' },
      },
    ],
  },
  {
    id: 'order-002',
    orderNumber: 'ORD-0082',
    totalAmount: 540.0,
    status: 'SHIPPED',
    createdAt: new Date('2025-12-02T14:20:00'),
    updatedAt: new Date('2025-12-04T09:00:00'),
    userId: 'user-001',
    user: { name: 'Anajak Demo User', email: 'demo@anajak.com' },
    items: [
      {
        id: 'item-002',
        quantity: 3,
        price: 180.0,
        orderId: 'order-002',
        productId: '4f397390-53c6-4fb7-9f89-0c1b12c3ad85',
        product: { title: 'Anajak Premium Comb 20' },
      },
    ],
  },
  {
    id: 'order-003',
    orderNumber: 'ORD-0083',
    totalAmount: 500.0,
    status: 'PROCESSING',
    createdAt: new Date('2025-12-03T09:15:00'),
    updatedAt: new Date('2025-12-03T11:00:00'),
    userId: 'user-001',
    user: { name: 'Anajak Demo User', email: 'demo@anajak.com' },
    items: [
      {
        id: 'item-003',
        quantity: 2,
        price: 250.0,
        orderId: 'order-003',
        productId: '77505c6d-833a-47e9-8843-f29a2072c109',
        product: { title: 'Anajak Oversize Street' },
      },
    ],
  },
  {
    id: 'order-004',
    orderNumber: 'ORD-0084',
    totalAmount: 267.0,
    status: 'PENDING',
    createdAt: new Date('2025-12-04T16:45:00'),
    updatedAt: new Date('2025-12-04T16:45:00'),
    userId: 'user-001',
    user: { name: 'Anajak Demo User', email: 'demo@anajak.com' },
    items: [
      {
        id: 'item-004',
        quantity: 3,
        price: 89.0,
        orderId: 'order-004',
        productId: '92beb2fe-b22b-4631-a863-8d5418da9d31',
        product: { title: 'Anajak Canvas Tote' },
      },
    ],
  },
  {
    id: 'order-005',
    orderNumber: 'ORD-0085',
    totalAmount: 660.0,
    status: 'PENDING',
    createdAt: new Date('2025-12-05T11:30:00'),
    updatedAt: new Date('2025-12-05T11:30:00'),
    userId: 'user-001',
    user: { name: 'Anajak Demo User', email: 'demo@anajak.com' },
    items: [
      {
        id: 'item-005',
        quantity: 3,
        price: 220.0,
        orderId: 'order-005',
        productId: 'ab58f9d7-cf76-443f-9076-157e9dfa1067',
        product: { title: 'Anajak Polo Classic' },
      },
    ],
  },
  {
    id: 'order-006',
    orderNumber: 'ORD-0086',
    totalAmount: 900.0,
    status: 'DELIVERED',
    createdAt: new Date('2025-11-28T08:00:00'),
    updatedAt: new Date('2025-12-02T10:00:00'),
    userId: 'user-001',
    user: { name: 'Anajak Demo User', email: 'demo@anajak.com' },
    items: [
      {
        id: 'item-006',
        quantity: 2,
        price: 450.0,
        orderId: 'order-006',
        productId: 'aeb8b736-7412-4dd0-a15b-3164c7ee6348',
        product: { title: 'Anajak Hoodie Heavy' },
      },
    ],
  },
  {
    id: 'order-007',
    orderNumber: 'ORD-0087',
    totalAmount: 450.0,
    status: 'CANCELLED',
    createdAt: new Date('2025-11-25T13:20:00'),
    updatedAt: new Date('2025-11-26T09:00:00'),
    userId: 'user-001',
    user: { name: 'Anajak Demo User', email: 'demo@anajak.com' },
    items: [
      {
        id: 'item-007',
        quantity: 5,
        price: 90.0,
        orderId: 'order-007',
        productId: 'affa5026-2c8a-445d-85d9-07aedfad5da5',
        product: { title: 'Anajak Kids Tee' },
      },
    ],
  },
  {
    id: 'order-008',
    orderNumber: 'ORD-0088',
    totalAmount: 720.0,
    status: 'PROCESSING',
    createdAt: new Date('2025-12-06T10:00:00'),
    updatedAt: new Date('2025-12-06T12:00:00'),
    userId: 'user-001',
    user: { name: 'Anajak Demo User', email: 'demo@anajak.com' },
    items: [
      {
        id: 'item-008',
        quantity: 6,
        price: 120.0,
        orderId: 'order-008',
        productId: '0085c157-117d-46dc-b737-aa233c9ae86b',
        product: { title: 'Anajak Semi 32' },
      },
    ],
  },
];

// ========== Mock Wallet ==========
export const mockWallet: Wallet = {
  id: 'wallet-001',
  balance: 4500.0,
  updatedAt: new Date('2025-12-01'),
  userId: 'user-001',
};

// ========== Mock Transactions ==========
export const mockTransactions: Transaction[] = [
  {
    id: 'txn-001',
    amount: 360.0,
    type: 'SALE',
    createdAt: new Date('2025-12-05T14:00:00'),
    walletId: 'wallet-001',
  },
  {
    id: 'txn-002',
    amount: 540.0,
    type: 'SALE',
    createdAt: new Date('2025-12-04T09:00:00'),
    walletId: 'wallet-001',
  },
  {
    id: 'txn-003',
    amount: -500.0,
    type: 'WITHDRAWAL',
    createdAt: new Date('2025-12-03T18:00:00'),
    walletId: 'wallet-001',
  },
  {
    id: 'txn-004',
    amount: 900.0,
    type: 'SALE',
    createdAt: new Date('2025-12-02T10:00:00'),
    walletId: 'wallet-001',
  },
  {
    id: 'txn-005',
    amount: 1000.0,
    type: 'DEPOSIT',
    createdAt: new Date('2025-11-30T12:00:00'),
    walletId: 'wallet-001',
  },
  {
    id: 'txn-006',
    amount: 270.0,
    type: 'SALE',
    createdAt: new Date('2025-11-28T14:32:00'),
    walletId: 'wallet-001',
  },
  {
    id: 'txn-007',
    amount: -180.0,
    type: 'WITHDRAWAL',
    createdAt: new Date('2025-11-27T09:15:00'),
    walletId: 'wallet-001',
  },
];

// ========== Mock Integrations ==========
export const mockIntegrations: Integration[] = [
  {
    id: 'int-001',
    platform: 'SHOPEE',
    apiKey: null,
    shopName: 'Anajak Store Official',
    isConnected: true,
    createdAt: new Date('2025-01-15'),
    userId: 'user-001',
  },
  {
    id: 'int-002',
    platform: 'LAZADA',
    apiKey: null,
    shopName: 'Anajak Lazada Shop',
    isConnected: true,
    createdAt: new Date('2025-02-20'),
    userId: 'user-001',
  },
  {
    id: 'int-003',
    platform: 'LINE',
    apiKey: null,
    shopName: '@anajakshop',
    isConnected: false,
    createdAt: new Date('2025-03-10'),
    userId: 'user-001',
  },
];

// ========== Helper Functions ==========

// Get all published products
export function getProducts(): Product[] {
  return mockProducts.filter((p) => p.isPublished).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
}

// Get product by ID
export function getProductById(id: string): Product | undefined {
  return mockProducts.find((p) => p.id === id);
}

// Get all orders
export function getOrders(): Order[] {
  return [...mockOrders].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

// Get order by ID
export function getOrderById(id: string): Order | undefined {
  return mockOrders.find((o) => o.id === id);
}

// Get wallet data
export function getWallet(): Wallet {
  return mockWallet;
}

// Get transactions
export function getTransactions(): Transaction[] {
  return [...mockTransactions].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

// Get integrations
export function getIntegrations(): Integration[] {
  return mockIntegrations;
}

// Get dashboard stats
export function getDashboardStats() {
  const orders = getOrders();
  const totalOrders = orders.length;
  const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingOrders = orders.filter((o) => o.status === 'PENDING').length;
  const processingOrders = orders.filter((o) => o.status === 'PROCESSING').length;

  // Recent orders (last 7 days)
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const recentOrders = orders.filter((o) => new Date(o.createdAt) >= oneWeekAgo).length;

  const topProducts = [
    { title: 'Anajak Semi 32', sales: 48 },
    { title: 'Anajak Oversize Street', sales: 35 },
    { title: 'Anajak Premium Comb 20', sales: 28 },
    { title: 'Anajak Canvas Tote', sales: 22 },
    { title: 'Anajak Polo Classic', sales: 18 },
  ];

  return {
    stats: {
      totalSales,
      totalOrders,
      pendingOrders,
      processingOrders,
      recentOrders,
    },
    topProducts,
  };
}

