import { getProductById as getProductByIdFromDB } from '@/lib/db/products';
import { getProductById as getProductByIdMock, getProducts as getProductsMock } from '@/lib/mockData';
import ProductDetailClient from './ProductDetailClient';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  const products = getProductsMock();
  return products.map((product) => ({
    id: product.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;

  let product;
  try {
    const dbProduct = await getProductByIdFromDB(id);
    if (dbProduct) {
      product = { ...dbProduct, price: Number(dbProduct.price) };
    }
  } catch {
    // Database not available
  }

  if (!product) {
    const mockProduct = getProductByIdMock(id);
    if (!mockProduct) notFound();
    product = mockProduct;
  }

  return <ProductDetailClient product={product} />;
}
