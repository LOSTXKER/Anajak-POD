import { getProducts as getProductsFromDB } from '@/lib/db/products';
import { getProducts as getProductsMock } from '@/lib/mockData';
import DesignerClient from './DesignerClient';

export const metadata = {
  title: 'Product Designer - Anajak POD',
  description: 'ออกแบบสินค้าของคุณเองง่ายๆ เหมือนใช้ Canva',
};

export default async function DesignerPage() {
  let products;
  try {
    const dbProducts = await getProductsFromDB();
    if (dbProducts.length > 0) {
      products = dbProducts.map((p) => ({ ...p, price: Number(p.price) }));
    }
  } catch {
    // Database not available
  }

  if (!products) {
    products = getProductsMock();
  }

  return <DesignerClient initialProducts={products} />;
}
