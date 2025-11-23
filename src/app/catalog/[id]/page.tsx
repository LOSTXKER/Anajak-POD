import prisma from '@/lib/prisma';
import ProductDetailClient from './ProductDetailClient';
import { notFound } from 'next/navigation';

// Force dynamic rendering since we are fetching based on ID
export const dynamic = 'auto';

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: { id: true },
  });
  return products.map((product) => ({
    id: product.id,
  }));
}

interface PageProps {
  params: {
    id: string;
  };
}

async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
  });
  return product;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  // Convert Decimal to number for Client Component
  const serializedProduct = {
    ...product,
    price: Number(product.price),
  };

  return <ProductDetailClient product={serializedProduct} />;
}

