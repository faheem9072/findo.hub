import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import ProductDetailClient from './ProductDetailClient';

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
    return {
      title: 'Product Not Found — Findo',
    };
  }

  let images: string[] = [];
  try {
    images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
  } catch {}
  const mainImage = images[0] || '/logo.jpeg';

  return {
    title: `${product.name} — Findo Kids Store`,
    description: product.shortDesc || product.description.substring(0, 150),
    openGraph: {
      title: product.name,
      description: product.shortDesc,
      images: [{ url: mainImage, alt: product.name }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.shortDesc,
      images: [mainImage],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await prisma.product.findFirst({
    where: { OR: [{ slug: slug }, { id: slug }] },
    include: { category: true },
  });

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
