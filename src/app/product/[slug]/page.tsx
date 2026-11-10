import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import ProductDetailClient from '@/app/products/[slug]/ProductDetailClient';
import { getFallbackProductBySlug, FALLBACK_PRODUCTS } from '@/lib/fallback-data';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  let product: any = null;
  try {
    product = await prisma.product.findFirst({
      where: { OR: [{ slug: slug }, { id: slug }] },
      include: { category: true },
    });
  } catch {
    product = getFallbackProductBySlug(slug);
  }

  if (!product) {
    product = getFallbackProductBySlug(slug);
  }

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
  let product: any = null;
  let relatedProducts: any[] = [];

  try {
    product = await prisma.product.findFirst({
      where: { OR: [{ slug: slug }, { id: slug }] },
      include: {
        category: true,
        reviews: {
          where: { isApproved: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (product) {
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
    }
  } catch (error) {
    console.warn('ProductDetailPage DB error, falling back:', error);
    product = getFallbackProductBySlug(slug);
    relatedProducts = FALLBACK_PRODUCTS.filter((p) => p.slug !== slug).slice(0, 4);
  }

  if (!product) {
    product = getFallbackProductBySlug(slug);
    relatedProducts = FALLBACK_PRODUCTS.filter((p) => p.slug !== slug).slice(0, 4);
  }

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
