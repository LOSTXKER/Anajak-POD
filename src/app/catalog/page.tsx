import DashboardLayout from '@/components/DashboardLayout';
import { getProducts as getProductsFromDB } from '@/lib/db/products';
import { getProducts as getProductsMock } from '@/lib/mockData';
import CatalogClient from './CatalogClient';

async function getProducts() {
  try {
    const products = await getProductsFromDB()
    if (products.length > 0) return products.map(p => ({ ...p, price: Number(p.price) }))
  } catch {
    // Database not available, fall through to mock
  }
  return getProductsMock()
}

export default async function CatalogPage() {
  const products = await getProducts();

  return (
    <DashboardLayout title="สินค้าทั้งหมด" showCreateButton={false}>
      <CatalogClient products={products} />
    </DashboardLayout>
  );
}
