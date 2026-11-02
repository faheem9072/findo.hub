import React, { Suspense } from 'react';
import prisma from '@/lib/prisma';
import ShopClient from './ShopClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Dynamic real-time data

export const metadata = {
  title: 'Shop All Products — FINDO Kids Brand',
  description:
    'Explore the complete FINDO catalog of habit trackers, puzzle boxes, balance towers, map pads, routine planners, and STEM building blocks.',
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

  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-3">
          <div className="w-10 h-10 border-3 border-[#5a9e2f] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-500">Loading Findo catalog...</p>
        </div>
      }
    >
      <ShopClient initialProducts={products} categories={categories} />
    </Suspense>
  );
}
