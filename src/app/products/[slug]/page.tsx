import React, { cache } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import ProductDetailClient from './ProductDetailClient';
import { getFallbackProductBySlug, FALLBACK_PRODUCTS } from '@/lib/fallback-data';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// Incremental Static Regeneration (1 hour ISR + on-demand instant purge via revalidatePath)
export const revalidate = 3600;

// Deduplicated cached data fetcher shared between generateMetadata and ProductDetailPage
const getCachedProduct = cache(async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      where: { OR: [{ slug: slug }, { id: slug }] },
      include: {
        category: true,
        reviews: {
          where: { isApproved: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    if (product) return product;
  } catch (error) {
    console.warn('Product query fallback:', error);
  }
  return getFallbackProductBySlug(slug);
});

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getCachedProduct(slug);

  if (!product) {
    return { title: 'Product Not Found — FINDO' };
  }

  let images: string[] = [];
  try {
    images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
  } catch {}
  const mainImage = images[0] || '/logo.jpeg';

  return {
    title: product.seoTitle || `${product.name} — FINDO`,
    description: product.seoDescription || product.shortDesc || product.description?.substring(0, 150) || '',
    openGraph: {
      title: product.name,
      description: product.shortDesc,
      images: [{ url: mainImage, alt: product.name }],
      type: 'website',
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getCachedProduct(slug);

  if (!product) {
    notFound();
  }

  let relatedProducts: any[] = [];
  try {
    relatedProducts = await prisma.product.findMany({
      where: {
        isPublished: true,
        id: { not: product.id },
        OR: [
          { categoryId: product.categoryId },
          { purpose: product.purpose },
        ],
      },
      take: 4,
      include: { category: true },
    });
  } catch {
    relatedProducts = FALLBACK_PRODUCTS.filter((p) => p.slug !== slug).slice(0, 4);
  }

  if (relatedProducts.length === 0) {
    relatedProducts = FALLBACK_PRODUCTS.filter((p) => p.slug !== slug).slice(0, 4);
  }

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
