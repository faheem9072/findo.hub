'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface FilterProps {
  categories: { id: string; name: string; slug: string }[];
  currentCategory?: string;
  currentAge?: string;
  currentSort?: string;
  currentSearch?: string;
}

export default function ProductFilterBar({
  categories,
  currentCategory,
  currentAge,
  currentSort,
  currentSearch,
}: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push('/products');
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
        <button
          onClick={() => updateFilter('category', '')}
          className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
            !currentCategory
              ? 'bg-[#0d1b1e] text-[#5a9e2f] shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-[#eef8ea] hover:text-[#5a9e2f]'
          }`}
        >
          All Categories
        </button>

        {categories.map((cat) => {
          const isActive = currentCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => updateFilter('category', cat.slug)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#0d1b1e] text-[#5a9e2f] shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-[#eef8ea] hover:text-[#5a9e2f]'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Secondary Controls (Search, Age Group, Sort, Reset) */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-slate-100">
        {/* Search Input */}
        <div className="sm:col-span-5 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            defaultValue={currentSearch || ''}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                updateFilter('search', (e.target as HTMLInputElement).value);
              }
            }}
            placeholder="Search catalog... (Press Enter)"
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-[#0d1b1e] focus:outline-none focus:border-[#5a9e2f]"
          />
        </div>

        {/* Age Group Filter */}
        <div className="sm:col-span-3">
          <select
            value={currentAge || 'all'}
            onChange={(e) => updateFilter('age', e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#0d1b1e] focus:outline-none focus:border-[#5a9e2f]"
          >
            <option value="all">Age: All Ages</option>
            <option value="0-2">0 - 2 Years</option>
            <option value="1-5">1 - 5 Years</option>
            <option value="2-6">2 - 6 Years</option>
            <option value="3-8">3 - 8 Years</option>
            <option value="0-10">0 - 10 Years</option>
          </select>
        </div>

        {/* Sorting Filter */}
        <div className="sm:col-span-3">
          <select
            value={currentSort || 'newest'}
            onChange={(e) => updateFilter('sort', e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#0d1b1e] focus:outline-none focus:border-[#5a9e2f]"
          >
            <option value="newest">Sort: Newest Arrival</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Clear Button */}
        <div className="sm:col-span-1 flex items-center justify-end">
          <button
            onClick={clearFilters}
            className="p-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-500 transition-colors w-full sm:w-auto flex items-center justify-center"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
