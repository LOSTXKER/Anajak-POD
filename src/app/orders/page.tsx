import prisma from '@/lib/prisma';
import OrdersClient from './OrdersClient';

// Server Component: Fetch data directly from DB
export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      items: {
        include: {
          product: true
        }
      },
      user: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Convert Decimal and Date objects to plain JS objects for Client Component
  // Next.js Server Components cannot pass complex objects like Decimal directly to Client Components
  const serializedOrders = orders.map(order => ({
    ...order,
    totalAmount: Number(order.totalAmount),
    createdAt: order.createdAt, // Dates are fine in recent Next.js versions if passed as props to Client Components? Actually better to be safe or let Next serialize it. 
    // Wait, Date objects are serializable by Next.js crossing the boundary, but Decimal is not.
    items: order.items.map(item => ({
      ...item,
      quantity: item.quantity,
      price: Number(item.price),
      product: {
        title: item.product.title
      }
    }))
  }));

  return <OrdersClient initialOrders={serializedOrders} />;
}
