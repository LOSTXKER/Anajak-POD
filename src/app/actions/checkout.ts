'use server'

import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const CheckoutSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().uuid(),
      designId: z.string().uuid().optional(),
      size: z.string(),
      color: z.string(),
      quantity: z.number().min(1),
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
  paymentMethod: z.enum(['promptpay', 'credit_card', 'bank_transfer']),
  guestEmail: z.string().email().optional(),
})

export type CheckoutState = {
  error?: string
  orderId?: string
  success?: boolean
} | null

export async function processCheckout(
  _prevState: CheckoutState,
  formData: FormData,
): Promise<CheckoutState> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const rawItems = JSON.parse(formData.get('items') as string)

    const parsed = CheckoutSchema.safeParse({
      items: rawItems,
      shippingAddress: {
        name: formData.get('name'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        district: formData.get('district'),
        province: formData.get('province'),
        postalCode: formData.get('postalCode'),
      },
      paymentMethod: formData.get('paymentMethod'),
      guestEmail: formData.get('guestEmail'),
    })

    if (!parsed.success) {
      return { error: parsed.error.errors[0].message }
    }

    const { items, shippingAddress, paymentMethod, guestEmail } = parsed.data

    // Look up product prices from DB to prevent tampering
    const productIds = [...new Set(items.map((i) => i.productId))]
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    })

    const productMap = new Map(products.map((p) => [p.id, p]))

    const orderItems = items.map((item) => {
      const product = productMap.get(item.productId)
      if (!product) throw new Error(`Product not found: ${item.productId}`)

      return {
        productId: item.productId,
        designId: item.designId,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        unitPrice: Number(product.price),
      }
    })

    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0,
    )

    const prefix = 'ORD'
    const timestamp = Date.now().toString(36).toUpperCase()
    const random = Math.random().toString(36).substring(2, 6).toUpperCase()
    const orderNumber = `${prefix}-${timestamp}${random}`

    const order = await prisma.order.create({
      data: {
        orderNumber,
        profileId: user?.id ?? null,
        guestEmail: !user ? guestEmail : null,
        totalAmount,
        shippingAddress,
        paymentMethod,
        items: { create: orderItems },
      },
    })

    revalidatePath('/orders')
    revalidatePath('/dashboard')

    return { success: true, orderId: order.id }
  } catch (err) {
    console.error('Checkout error:', err)
    return { error: 'เกิดข้อผิดพลาดในการสั่งซื้อ กรุณาลองใหม่' }
  }
}
