import { getProductById, getProducts } from '@/lib/mockData';
import ProductDetailClient from './ProductDetailClient';
import { notFound } from 'next/navigation';

// Generate static params from mock data
export function generateStaticParams() {
  const products = getProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
