import React from 'react';
import Link from 'next/link';
import { Search as SearchIcon, ArrowLeft } from 'lucide-react';
import prisma from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';

export const revalidate = 0;

interface SearchPageProps {
  searchParams: Promise<{ q?: string; category?: string; sort?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  return {
    title: q ? `Search results for "${q}" — FINDO` : 'Search Products — FINDO',
    description: 'Search thoughtfully chosen kids products, habit trackers, puzzle boxes, and STEM sets.',
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = '', category, sort } = await searchParams;
  const query = q.trim();

  let orderBy: any = { createdAt: 'desc' };
  if (sort === 'price_asc') orderBy = { price: 'asc' };
  if (sort === 'price_desc') orderBy = { price: 'desc' };

  const whereClause: any = {
    isPublished: true,
  };

  if (query) {
    whereClause.OR = [
      { name: { contains: query } },
      { shortDesc: { contains: query } },
      { description: { contains: query } },
      { purpose: { contains: query } },
      { badges: { contains: query } },
    ];
  }

  if (category) {
    whereClause.category = { slug: category };
  }

  const products = await prisma.product.findMany({
    where: whereClause,
    orderBy,
    include: { category: true },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Search Header */}
      <div className="space-y-4">
        <Link href="/shop" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-[#5a9e2f]">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Shop</span>
        </Link>

        <form action="/search" method="GET" className="relative max-w-xl">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search products (e.g. Habit Tracker, Wooden Puzzle, STEM)..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-300 rounded-xl shadow-xs text-sm font-medium text-[#0d1b1e] focus:outline-none focus:ring-2 focus:ring-[#5a9e2f]"
          />
          <SearchIcon className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
        </form>

        {query ? (
          <h1 className="text-2xl font-extrabold text-[#0d1b1e]">
            Search results for “<span className="text-[#5a9e2f]">{query}</span>”
          </h1>
        ) : (
          <h1 className="text-2xl font-extrabold text-[#0d1b1e]">Search All Products</h1>
        )}
      </div>

      {/* Results or Empty State */}
      {products.length > 0 ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-xs text-slate-500 font-semibold">
            <span>Found {products.length} product{products.length !== 1 ? 's' : ''}</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 space-y-4 bg-white rounded-2xl border border-slate-200 p-8">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <SearchIcon className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#0d1b1e]">We couldn’t find what you’re looking for.</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try searching for general keywords like “puzzles”, “habit board”, or “stem blocks”.
          </p>
          <div>
            <Link
              href="/shop"
              className="inline-block py-3 px-6 rounded-lg bg-[#5a9e2f] hover:bg-[#488224] text-white font-bold text-xs transition-colors shadow-xs"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
