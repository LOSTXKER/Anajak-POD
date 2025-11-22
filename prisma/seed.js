const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding ...')

  // 1. Clean up existing data
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.transaction.deleteMany()
  await prisma.integration.deleteMany()
  await prisma.wallet.deleteMany()
  await prisma.user.deleteMany()

  // 2. Create User (Seller)
  const user = await prisma.user.create({
    data: {
      email: 'demo@anajak.com',
      name: 'Anajak Demo User',
      role: 'SELLER',
      wallet: {
        create: {
          balance: 4500.00
        }
      }
    },
    include: {
      wallet: true
    }
  })

  console.log(`Created user: ${user.email}`)

  // 3. Create Products with Detailed Info (Ensuring all have colors & sizes)
  const productData = [
    { 
      title: 'Anajak Semi 32', 
      description: 'เสื้อยืดทรงปกติ ตัวเก่ง สีครบจบทุกงาน', 
      price: 120.00, 
      sku: 'TS-SEMI32', 
      isPublished: true, 
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop',
      fabricGrade: 'Semi',
      fiberType: 'ฝ้าย 100%',
      thickness: 'No. 32 / 155-165 gsm',
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
      colors: ['#FFFFFF', '#000000', '#1E3A8A', '#DC2626', '#FBBF24', '#10B981'], // ขาว, ดำ, กรม, แดง, เหลือง, เขียว
      badge: 'ไม่มีขั้นต่ำ',
      suitableFor: 'ทำแบรนด์, เสื้อพนักงาน'
    },
    { 
      title: 'Anajak Premium Comb 20', 
      description: 'เสื้อยืดพรีเมียม ผ้าหนานุ่ม ไม่ย้วย ทรงสวย', 
      price: 180.00, 
      sku: 'TS-COMB20', 
      isPublished: true, 
      imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1887&auto=format&fit=crop',
      fabricGrade: 'Comb',
      fiberType: 'Cotton 100%',
      thickness: 'No. 20 / 210 gsm',
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
      colors: ['#000000', '#FFFFFF', '#374151', '#4B5563', '#9CA3AF'], // ดำ, ขาว, เทาเข้ม, เทากลาง, เทาอ่อน
      badge: 'Premium',
      suitableFor: 'แบรนด์ Streetwear'
    },
    { 
      title: 'Anajak Oversize Street', 
      description: 'ทรงหลวม ไหล่ตก สไตล์สตรีท ผ้าหนาอยู่ทรง', 
      price: 250.00, 
      sku: 'TS-OVER', 
      isPublished: true, 
      imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop',
      fabricGrade: 'Super Soft',
      fiberType: 'Cotton 100%',
      thickness: 'No. 20 / 220 gsm',
      sizes: ['M', 'L', 'XL', '2XL'],
      colors: ['#000000', '#FFFFFF', '#BEF264', '#A855F7', '#EC4899'], // ดำ, ขาว, เขียวนีออน, ม่วง, ชมพู
      badge: 'ขายดี 🔥',
      suitableFor: 'วัยรุ่น, แฟชั่น'
    },
    { 
      title: 'Anajak Canvas Tote', 
      description: 'กระเป๋าผ้าดิบ ทนทาน รับน้ำหนักได้ดี', 
      price: 89.00, 
      sku: 'BAG-CV', 
      isPublished: true, 
      imageUrl: 'https://images.unsplash.com/photo-1597484662317-c931d96f52f0?q=80&w=1935&auto=format&fit=crop',
      fabricGrade: 'Canvas',
      fiberType: 'Cotton Canvas',
      thickness: '12 oz',
      sizes: ['12x14"', '14x16"', '16x18"'],
      colors: ['#E5E5E5', '#171717', '#F59E0B'], // ดิบ, ดำ, เหลือง
      badge: 'รักษ์โลก 🌱',
      suitableFor: 'แจก, ของชำร่วย'
    },
    { 
      title: 'Anajak Polo Classic', 
      description: 'โปโลทรงสวย ผ้า Kaneko ระบายอากาศดี ไม่ขึ้นขน', 
      price: 220.00, 
      sku: 'PL-CLS', 
      isPublished: true, 
      imageUrl: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=2071&auto=format&fit=crop',
      fabricGrade: 'Kaneko',
      fiberType: 'TC',
      thickness: '300 gsm',
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      colors: ['#FFFFFF', '#000000', '#1E3A8A', '#065F46'], // ขาว, ดำ, กรม, เขียวเข้ม
      badge: 'Uniform',
      suitableFor: 'ชุดยูนิฟอร์ม, ทางการ'
    },
    { 
      title: 'Anajak Hoodie Heavy', 
      description: 'ฮู้ดดี้ผ้าสำลี หนา นุ่ม กันหนาวได้จริง', 
      price: 450.00, 
      sku: 'HD-HV', 
      isPublished: true, 
      imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop',
      fabricGrade: 'Fleece',
      fiberType: 'Cotton/Poly',
      thickness: '350 gsm',
      sizes: ['Free Size', 'Oversize'],
      colors: ['#000000', '#9CA3AF', '#6366F1'], // ดำ, เทา, ม่วง
      badge: 'Winter',
      suitableFor: 'กันหนาว, แฟชั่น'
    },
     { 
      title: 'Anajak Kids Tee', 
      description: 'เสื้อยืดเด็ก ผ้านุ่มพิเศษ ไม่ระคายเคืองผิว', 
      price: 90.00, 
      sku: 'TS-KIDS', 
      isPublished: true, 
      imageUrl: 'https://images.unsplash.com/photo-1519238263496-63439708dc80?q=80&w=2060&auto=format&fit=crop',
      fabricGrade: 'Soft',
      fiberType: 'Cotton 100%',
      thickness: 'No. 32 / 150 gsm',
      sizes: ['24"', '26"', '28"', '30"'],
      colors: ['#FFFFFF', '#FCA5A5', '#93C5FD', '#FDE047'], // ขาว, ชมพูอ่อน, ฟ้าอ่อน, เหลืองอ่อน
      badge: 'Kids',
      suitableFor: 'เด็กเล็ก, โรงเรียน'
    },
  ]

  const products = []
  for (const p of productData) {
    const product = await prisma.product.create({
      data: {
        ...p,
        userId: user.id
      }
    })
    products.push(product)
  }
  console.log(`Created ${products.length} products`)

  // 4. Create Orders
  const orderStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']
  
  for (let i = 1; i <= 8; i++) {
    const randomProduct = products[Math.floor(Math.random() * products.length)]
    const quantity = Math.floor(Math.random() * 5) + 1
    const total = Number(randomProduct.price) * quantity
    
    await prisma.order.create({
      data: {
        orderNumber: `ORD-00${80 + i}`,
        totalAmount: total,
        status: orderStatuses[Math.floor(Math.random() * orderStatuses.length)],
        userId: user.id,
        items: {
          create: {
            productId: randomProduct.id,
            quantity: quantity,
            price: randomProduct.price
          }
        }
      }
    })
  }
  console.log('Created orders')

  // 5. Create Transactions (Mock)
  await prisma.transaction.createMany({
    data: [
      { walletId: user.wallet.id, amount: 270.00, type: 'SALE', createdAt: new Date('2025-11-12T14:32:00Z') },
      { walletId: user.wallet.id, amount: -180.00, type: 'WITHDRAWAL', createdAt: new Date('2025-11-11T09:15:00Z') },
    ]
  })

  // 6. Create Integrations
  await prisma.integration.createMany({
    data: [
      { userId: user.id, platform: 'SHOPEE', shopName: 'Anajak Store Official', isConnected: true },
    ]
  })
  
  console.log('Seeding finished.')
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
