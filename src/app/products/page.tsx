import React from 'react';
import prisma from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import ProductFilterBar from '@/components/ProductFilterBar';

export const revalidate = 0; // Dynamic route for filters

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    age?: string;
    search?: string;
    sort?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedParams = await searchParams;
  const categorySlug = resolvedParams.category;
  const age = resolvedParams.age;
  const search = resolvedParams.search;
  const sort = resolvedParams.sort;

  const where: any = {};

  if (categorySlug) {
    where.category = { slug: categorySlug };
  }

  if (age && age !== 'all') {
    where.ageRange = { contains: age };
  }

  if (search) {
    where.OR = [
      { name: { contains: search } },
      { description: { contains: search } },
      { shortDesc: { contains: search } },
    ];
  }

  let orderBy: any = { createdAt: 'desc' };
  if (sort === 'price-asc') orderBy = { price: 'asc' };
  if (sort === 'price-desc') orderBy = { price: 'desc' };

  const products = await prisma.product.findMany({
    where,
    orderBy,
    include: { category: true },
  });

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0d1b1e] via-[#152e33] to-[#0d1b1e] text-white p-8 rounded-3xl relative overflow-hidden shadow-lg border border-emerald-950/40">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[#5a9e2f]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <span className="text-xs font-bold text-[#5a9e2f] uppercase tracking-widest bg-[#5a9e2f]/20 px-3 py-1 rounded-full border border-[#5a9e2f]/30">
            Findo Store Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Explore All Unique Kids Products
          </h1>
          <p className="text-sm text-slate-300 max-w-xl">
            Browse our complete collection of functional, child-safe, and screen-free products designed for young explorers.
          </p>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <ProductFilterBar
        categories={categories}
        currentCategory={categorySlug}
        currentAge={age}
        currentSort={sort}
        currentSearch={search}
      />

      {/* Catalog Results Grid */}
      <div>
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
          <span className="text-xs font-bold text-[#0d1b1e] uppercase tracking-wider">
            Showing <strong className="text-[#5a9e2f] text-sm">{products.length}</strong> Products
          </span>
          {search && (
            <span className="text-xs text-slate-500">
              Filtered by: &quot;{search}&quot;
            </span>
          )}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
            <div className="w-16 h-16 bg-[#eef8ea] text-[#5a9e2f] rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              🔍
            </div>
            <h3 className="text-xl font-bold text-[#0d1b1e]">No matching products found</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              We couldn&apos;t find any items matching your selected category or search filters. Try clearing your filters!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
