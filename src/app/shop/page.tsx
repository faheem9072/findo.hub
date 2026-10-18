import React from 'react';
import prisma from '@/lib/prisma';
import ShopClient from './ShopClient';

export const revalidate = 0; // Dynamic data

export const metadata = {
  title: 'Shop All Products — FINDO Kids Brand',
  description: 'Explore the complete FINDO catalog of habit trackers, puzzle boxes, balance towers, map pads, routine planners, and STEM building blocks.',
};

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'desc' },
    include: { category: true },
  });

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });

  return <ShopClient initialProducts={products} categories={categories} />;
}
