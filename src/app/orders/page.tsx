import { getOrders as getOrdersMock } from '@/lib/mockData';
import { getOrders as getOrdersFromDB } from '@/lib/db/orders';
import { createClient } from '@/lib/supabase/server';
import OrdersClient from './OrdersClient';

export default async function OrdersPage() {
  let orders;

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const dbOrders = await getOrdersFromDB(user.id);
      orders = dbOrders.map((o) => ({
        ...o,
        totalAmount: Number(o.totalAmount),
        items: o.items.map((i) => ({
          ...i,
          price: Number(i.unitPrice),
          orderId: o.id,
          productId: i.productId,
          product: i.product,
        })),
      }));
    }
  } catch {
    // Database not available
  }

  if (!orders) {
    orders = getOrdersMock();
  }

  return <OrdersClient initialOrders={orders} />;
}
