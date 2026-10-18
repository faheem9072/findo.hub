import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import ProductDetailClient from '@/app/products/[slug]/ProductDetailClient';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findFirst({
    where: { OR: [{ slug: slug }, { id: slug }] },
    include: { category: true },
  });

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
    description: product.seoDescription || product.shortDesc || product.description.substring(0, 150),
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

  if (!product) {
    notFound();
  }

  // Get related products in same category or featured
  const relatedProducts = await prisma.product.findMany({
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

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
