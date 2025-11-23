import prisma from '@/lib/prisma';
import ProductDetailClient from './ProductDetailClient';
import { notFound } from 'next/navigation';

// Force dynamic rendering since we are fetching based on ID
export const dynamic = 'auto';

// This function is required for static export, but since we don't have a build-time DB,
// we return an empty array. This means no pages will be pre-rendered at build time,
// but they will be generated on-demand (SSR) or handle the fallback if using 'output: export'
export async function generateStaticParams() {
  // Try to fetch if DB is available, otherwise return empty
  try {
    if (!process.env.DATABASE_URL) return [];
    
    const products = await prisma.product.findMany({
      select: { id: true },
    });
    return products.map((product) => ({
      id: product.id,
    }));
  } catch (error) {
    console.warn('Database not available during build, skipping static param generation.');
    return [];
  }
}

interface PageProps {
  params: {
    id: string;
  };
}

async function getProduct(id: string) {
  try {
    // If no DB URL, return null immediately
    if (!process.env.DATABASE_URL) return null;

    const product = await prisma.product.findUnique({
      where: { id },
    });
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await getProduct(params.id);

  if (!product) {
    // If running locally or without DB, show a mock product or notFound
    // For now, to avoid breaking the deployment completely, we can show notFound
    // OR create a mock product for demonstration if desired.
    // Let's stick to standard behavior:
    notFound();
  }

  // Convert Decimal to number for Client Component
  const serializedProduct = {
    ...product,
    price: Number(product.price),
  };

  return <ProductDetailClient product={serializedProduct} />;
}
