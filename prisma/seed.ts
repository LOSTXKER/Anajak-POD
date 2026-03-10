import { PrismaClient } from '../src/generated/prisma/client.js'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: process.env.MIGRATION_URL || process.env.DATABASE_URL!,
})
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database...')

  // Create demo user profile
  const demoUser = await prisma.profile.upsert({
    where: { email: 'demo@anajak.com' },
    update: {},
    create: {
      id: 'user-001',
      email: 'demo@anajak.com',
      name: 'Anajak Demo User',
      role: 'SELLER',
    },
  })
  console.log(`Created profile: ${demoUser.name}`)

  // Create products
  const products = [
    {
      id: '0085c157-117d-46dc-b737-aa233c9ae86b',
      title: 'Anajak Semi 32',
      description: 'เสื้อยืดทรงปกติ ตัวเก่ง สีครบจบทุกงาน',
      price: 120.0,
      sku: 'TS-SEMI32',
      isPublished: true,
      imageUrl:
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop',
      fabricGrade: 'Semi',
      fiberType: 'ฝ้าย 100%',
      thickness: 'No. 32 / 155-165 gsm',
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
      colors: ['#FFFFFF', '#000000', '#1E3A8A', '#DC2626', '#FBBF24', '#10B981'],
      badge: 'ไม่มีขั้นต่ำ',
      suitableFor: 'ทำแบรนด์, เสื้อพนักงาน',
    },
    {
      id: '4f397390-53c6-4fb7-9f89-0c1b12c3ad85',
      title: 'Anajak Premium Comb 20',
      description: 'เสื้อยืดพรีเมียม ผ้าหนานุ่ม ไม่ย้วย ทรงสวย',
      price: 180.0,
      sku: 'TS-COMB20',
      isPublished: true,
      imageUrl:
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1887&auto=format&fit=crop',
      fabricGrade: 'Comb',
      fiberType: 'Cotton 100%',
      thickness: 'No. 20 / 210 gsm',
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
      colors: ['#000000', '#FFFFFF', '#374151', '#4B5563', '#9CA3AF'],
      badge: 'Premium',
      suitableFor: 'แบรนด์ Streetwear',
    },
    {
      id: '77505c6d-833a-47e9-8843-f29a2072c109',
      title: 'Anajak Oversize Street',
      description: 'ทรงหลวม ไหล่ตก สไตล์สตรีท ผ้าหนาอยู่ทรง',
      price: 250.0,
      sku: 'TS-OVER',
      isPublished: true,
      imageUrl:
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop',
      fabricGrade: 'Super Soft',
      fiberType: 'Cotton 100%',
      thickness: 'No. 20 / 220 gsm',
      sizes: ['M', 'L', 'XL', '2XL'],
      colors: ['#000000', '#FFFFFF', '#BEF264', '#A855F7', '#EC4899'],
      badge: 'ขายดี 🔥',
      suitableFor: 'วัยรุ่น, แฟชั่น',
    },
    {
      id: '92beb2fe-b22b-4631-a863-8d5418da9d31',
      title: 'Anajak Canvas Tote',
      description: 'กระเป๋าผ้าดิบ ทนทาน รับน้ำหนักได้ดี',
      price: 89.0,
      sku: 'BAG-CV',
      isPublished: true,
      imageUrl:
        'https://images.unsplash.com/photo-1597484662317-c931d96f52f0?q=80&w=1935&auto=format&fit=crop',
      fabricGrade: 'Canvas',
      fiberType: 'Cotton Canvas',
      thickness: '12 oz',
      sizes: ['12x14"', '14x16"', '16x18"'],
      colors: ['#E5E5E5', '#171717', '#F59E0B'],
      badge: 'รักษ์โลก 🌱',
      suitableFor: 'แจก, ของชำร่วย',
    },
    {
      id: 'ab58f9d7-cf76-443f-9076-157e9dfa1067',
      title: 'Anajak Polo Classic',
      description: 'โปโลทรงสวย ผ้า Kaneko ระบายอากาศดี ไม่ขึ้นขน',
      price: 220.0,
      sku: 'PL-CLS',
      isPublished: true,
      imageUrl:
        'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=2071&auto=format&fit=crop',
      fabricGrade: 'Kaneko',
      fiberType: 'TC',
      thickness: '300 gsm',
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      colors: ['#FFFFFF', '#000000', '#1E3A8A', '#065F46'],
      badge: 'Uniform',
      suitableFor: 'ชุดยูนิฟอร์ม, ทางการ',
    },
    {
      id: 'aeb8b736-7412-4dd0-a15b-3164c7ee6348',
      title: 'Anajak Hoodie Heavy',
      description: 'ฮู้ดดี้ผ้าสำลี หนา นุ่ม กันหนาวได้จริง',
      price: 450.0,
      sku: 'HD-HV',
      isPublished: true,
      imageUrl:
        'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop',
      fabricGrade: 'Fleece',
      fiberType: 'Cotton/Poly',
      thickness: '350 gsm',
      sizes: ['Free Size', 'Oversize'],
      colors: ['#000000', '#9CA3AF', '#6366F1'],
      badge: 'Winter',
      suitableFor: 'กันหนาว, แฟชั่น',
    },
    {
      id: 'affa5026-2c8a-445d-85d9-07aedfad5da5',
      title: 'Anajak Kids Tee',
      description: 'เสื้อยืดเด็ก ผ้านุ่มพิเศษ ไม่ระคายเคืองผิว',
      price: 90.0,
      sku: 'TS-KIDS',
      isPublished: true,
      imageUrl:
        'https://images.unsplash.com/photo-1519238263496-63439708dc80?q=80&w=2060&auto=format&fit=crop',
      fabricGrade: 'Soft',
      fiberType: 'Cotton 100%',
      thickness: 'No. 32 / 150 gsm',
      sizes: ['24"', '26"', '28"', '30"'],
      colors: ['#FFFFFF', '#FCA5A5', '#93C5FD', '#FDE047'],
      badge: 'Kids',
      suitableFor: 'เด็กเล็ก, โรงเรียน',
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: product,
      create: product,
    })
  }
  console.log(`Seeded ${products.length} products`)

  // Create wallet for demo user
  const wallet = await prisma.wallet.upsert({
    where: { profileId: demoUser.id },
    update: {},
    create: {
      profileId: demoUser.id,
      balance: 4500.0,
    },
  })
  console.log(`Created wallet with balance: ${wallet.balance}`)

  // Create sample orders
  const orders = [
    {
      id: 'order-001',
      orderNumber: 'ORD-0081',
      profileId: demoUser.id,
      totalAmount: 360.0,
      status: 'DELIVERED' as const,
      paymentStatus: 'PAID' as const,
      items: [
        {
          productId: '0085c157-117d-46dc-b737-aa233c9ae86b',
          size: 'M',
          color: '#000000',
          quantity: 3,
          unitPrice: 120.0,
        },
      ],
    },
    {
      id: 'order-002',
      orderNumber: 'ORD-0082',
      profileId: demoUser.id,
      totalAmount: 540.0,
      status: 'SHIPPED' as const,
      paymentStatus: 'PAID' as const,
      items: [
        {
          productId: '4f397390-53c6-4fb7-9f89-0c1b12c3ad85',
          size: 'L',
          color: '#000000',
          quantity: 3,
          unitPrice: 180.0,
        },
      ],
    },
    {
      id: 'order-003',
      orderNumber: 'ORD-0083',
      profileId: demoUser.id,
      totalAmount: 500.0,
      status: 'PROCESSING' as const,
      paymentStatus: 'PAID' as const,
      items: [
        {
          productId: '77505c6d-833a-47e9-8843-f29a2072c109',
          size: 'L',
          color: '#000000',
          quantity: 2,
          unitPrice: 250.0,
        },
      ],
    },
    {
      id: 'order-004',
      orderNumber: 'ORD-0084',
      profileId: demoUser.id,
      totalAmount: 267.0,
      status: 'PENDING' as const,
      paymentStatus: 'PENDING' as const,
      items: [
        {
          productId: '92beb2fe-b22b-4631-a863-8d5418da9d31',
          size: '14x16"',
          color: '#E5E5E5',
          quantity: 3,
          unitPrice: 89.0,
        },
      ],
    },
  ]

  for (const { items, ...orderData } of orders) {
    await prisma.order.upsert({
      where: { id: orderData.id },
      update: {},
      create: {
        ...orderData,
        items: {
          create: items,
        },
      },
    })
  }
  console.log(`Seeded ${orders.length} orders`)

  // Create sample transactions
  const transactions = [
    { amount: 360.0, type: 'SALE' as const },
    { amount: 540.0, type: 'SALE' as const },
    { amount: -500.0, type: 'WITHDRAWAL' as const },
    { amount: 900.0, type: 'SALE' as const },
    { amount: 1000.0, type: 'DEPOSIT' as const },
  ]

  for (const txn of transactions) {
    await prisma.transaction.create({
      data: {
        walletId: wallet.id,
        ...txn,
      },
    })
  }
  console.log(`Seeded ${transactions.length} transactions`)

  // Create sample integrations
  const integrations = [
    { platform: 'SHOPEE', shopName: 'Anajak Store Official', isConnected: true },
    { platform: 'LAZADA', shopName: 'Anajak Lazada Shop', isConnected: true },
    { platform: 'LINE', shopName: '@anajakshop', isConnected: false },
  ]

  for (const integration of integrations) {
    await prisma.integration.create({
      data: {
        profileId: demoUser.id,
        ...integration,
      },
    })
  }
  console.log(`Seeded ${integrations.length} integrations`)

  console.log('Seeding complete!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
