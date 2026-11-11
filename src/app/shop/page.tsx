import React, { Suspense } from 'react';
import prisma from '@/lib/prisma';
import ShopClient from './ShopClient';
import { FALLBACK_PRODUCTS, FALLBACK_CATEGORIES } from '@/lib/fallback-data';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Dynamic real-time data

export const metadata = {
  title: 'Shop Developmental Toys | Findo — Find Smart Play',
  description:
    'Explore the complete Findo catalog of screen-free developmental toys, routine planners, habit trackers, and STEM science kits.',
};

export default async function ShopPage() {
  let products: any[] = [];
  let categories: any[] = [];

  try {
    const fetchDb = Promise.all([
      prisma.product.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: 'desc' },
        include: { category: true },
      }),
      prisma.category.findMany({
        orderBy: { name: 'asc' },
      }),
    ]);

    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('DB Timeout')), 4000)
    );

    const [dbProducts, dbCategories] = await Promise.race([fetchDb, timeout]);
    products = dbProducts && dbProducts.length > 0 ? dbProducts : FALLBACK_PRODUCTS;
    categories = dbCategories && dbCategories.length > 0 ? dbCategories : FALLBACK_CATEGORIES;
  } catch (error) {
    console.warn('ShopPage database lookup fallback:', error);
    products = FALLBACK_PRODUCTS;
    categories = FALLBACK_CATEGORIES;
  }

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
