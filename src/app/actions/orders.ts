'use server'

import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const CreateOrderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().uuid(),
      designId: z.string().uuid().optional(),
      size: z.string(),
      color: z.string(),
      quantity: z.number().min(1),
      unitPrice: z.number().min(0),
    }),
  ),
  shippingAddress: z.object({
    name: z.string().min(1),
    phone: z.string().min(9),
    address: z.string().min(1),
    district: z.string().min(1),
    province: z.string().min(1),
    postalCode: z.string().min(5),
  }),
  guestEmail: z.string().email().optional(),
  paymentMethod: z.string().optional(),
})

function generateOrderNumber(): string {
  const prefix = 'ORD'
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}-${timestamp}${random}`
}

export async function createOrder(data: z.infer<typeof CreateOrderSchema>) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const validated = CreateOrderSchema.parse(data)

  const totalAmount = validated.items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  )

  const order = await prisma.order.create({
    data: {
      orderNumber: generateOrderNumber(),
      profileId: user?.id ?? null,
      guestEmail: !user ? validated.guestEmail : null,
      totalAmount,
      shippingAddress: validated.shippingAddress,
      paymentMethod: validated.paymentMethod,
      items: {
        create: validated.items.map((item) => ({
          productId: item.productId,
          designId: item.designId,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
      },
    },
    include: { items: true },
  })

  revalidatePath('/orders')
  revalidatePath('/dashboard')
  return { success: true, order }
}

export async function cancelOrder(orderId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'กรุณาเข้าสู่ระบบ' }
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
  })

  if (!order || order.profileId !== user.id) {
    return { error: 'ไม่พบคำสั่งซื้อ' }
  }

  if (order.status !== 'PENDING') {
    return { error: 'ไม่สามารถยกเลิกคำสั่งซื้อที่กำลังดำเนินการได้' }
  }

  await prisma.order.update({
    where: { id: orderId },
    data: { status: 'CANCELLED' },
  })

  revalidatePath('/orders')
  revalidatePath('/dashboard')
  return { success: true }
}
