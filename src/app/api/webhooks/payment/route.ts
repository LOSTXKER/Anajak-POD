import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createHmac } from 'crypto'

function verifyWebhookSignature(body: string, signature: string | null, secret: string): boolean {
  if (!signature || !secret) return false
  const computed = createHmac('sha256', secret).update(body).digest('hex')
  return computed === signature
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.text()
    const webhookSecret = process.env.PAYMENT_WEBHOOK_SECRET

    if (webhookSecret) {
      const signature = request.headers.get('x-webhook-signature') ||
                       request.headers.get('x-signature') ||
                       request.headers.get('stripe-signature')

      if (!verifyWebhookSignature(rawBody, signature, webhookSecret)) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    const body = JSON.parse(rawBody)
    const { event, data } = body

    switch (event) {
      case 'charge.complete': {
        const orderId = data?.metadata?.orderId
        if (!orderId) break

        await prisma.order.update({
          where: { id: orderId },
          data: {
            paymentStatus: 'PAID',
            status: 'PROCESSING',
          },
        })
        break
      }

      case 'charge.failed': {
        const orderId = data?.metadata?.orderId
        if (!orderId) break

        await prisma.order.update({
          where: { id: orderId },
          data: { paymentStatus: 'FAILED' },
        })
        break
      }

      case 'refund.complete': {
        const orderId = data?.metadata?.orderId
        if (!orderId) break

        await prisma.order.update({
          where: { id: orderId },
          data: {
            paymentStatus: 'REFUNDED',
            status: 'CANCELLED',
          },
        })
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Payment webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
