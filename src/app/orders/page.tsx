import { getOrders } from '@/lib/mockData';
import OrdersClient from './OrdersClient';

export default function OrdersPage() {
  const orders = getOrders();

  return <OrdersClient initialOrders={orders} />;
}
