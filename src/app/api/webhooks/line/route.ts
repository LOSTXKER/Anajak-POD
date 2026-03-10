import { NextResponse } from 'next/server'
import { createHmac } from 'crypto'

function verifyLineSignature(body: string, signature: string | null, secret: string): boolean {
  if (!signature || !secret) return false
  const computed = createHmac('sha256', secret).update(body).digest('base64')
  return computed === signature
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.text()
    const lineSecret = process.env.LINE_CHANNEL_SECRET

    if (lineSecret) {
      const signature = request.headers.get('x-line-signature')
      if (!verifyLineSignature(rawBody, signature, lineSecret)) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    const body = JSON.parse(rawBody)
    const events = body.events ?? []

    for (const event of events) {
      switch (event.type) {
        case 'message':
          break
        case 'follow':
          break
        case 'unfollow':
          break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('LINE webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
