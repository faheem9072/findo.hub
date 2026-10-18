'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, X, ChevronDown, SlidersHorizontal } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

interface ShopClientProps {
  initialProducts: any[];
  categories: any[];
}

export default function ShopClient({ initialProducts, categories }: ShopClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('q') || searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedPurpose, setSelectedPurpose] = useState(searchParams.get('purpose') || '');
  const [selectedAge, setSelectedAge] = useState(searchParams.get('age') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [inStockOnly, setInStockOnly] = useState(searchParams.get('inStock') === 'true');
  const [sort, setSort] = useState(searchParams.get('sort') || 'featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const purposes = ['PLAY', 'LEARN', 'CREATE', 'EXPLORE', 'BUILD HABITS'];
  const ageRanges = ['0-2 Years', '3-6 Years', '6-9 Years', '9+ Years'];

  const applyFilters = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.push(`/shop?${params.toString()}`);
  };

  const clearAllFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSelectedPurpose('');
    setSelectedAge('');
    setMaxPrice('');
    setInStockOnly(false);
    setSort('featured');
    router.push('/shop');
  };

  // Filter products locally or on server
  let filteredProducts = [...initialProducts];

  if (search.trim()) {
    const q = search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter((p) => p.category?.slug === selectedCategory);
  }

  if (selectedPurpose) {
    filteredProducts = filteredProducts.filter(
      (p) => p.purpose?.toUpperCase() === selectedPurpose.toUpperCase()
    );
  }

  if (selectedAge) {
    filteredProducts = filteredProducts.filter(
      (p) => p.ageRange?.toLowerCase().includes(selectedAge.toLowerCase().split(' ')[0])
    );
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter((p) => p.price <= Number(maxPrice));
  }

  if (inStockOnly) {
    filteredProducts = filteredProducts.filter((p) => p.stock > 0);
  }

  // Sorting
  if (sort === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sort === 'newest') {
    filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (sort === 'featured') {
    filteredProducts.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0d1b1e]">
          Shop Findo
        </h1>
        <p className="text-sm text-slate-500">
          Thoughtfully chosen, screen-free products for curious young minds.
        </p>
      </div>

      {/* Filter & Search Bar Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-xs space-y-4">
        
        {/* Top Row: Search input + Mobile Filter Trigger + Sort dropdown */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                applyFilters({ q: e.target.value });
              }}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-[#fafbf8] text-sm text-[#0d1b1e] placeholder-slate-400 focus:outline-none focus:border-[#5a9e2f]"
            />
            {search && (
              <button
                onClick={() => {
                  setSearch('');
                  applyFilters({ q: '' });
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex-1 sm:flex-none py-2.5 px-4 rounded-lg border border-slate-200 bg-white font-semibold text-xs text-[#0d1b1e] flex items-center justify-center gap-2 hover:bg-slate-50"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#5a9e2f]" />
              <span>Filters</span>
            </button>

            {/* Sort Select */}
            <div className="relative flex-1 sm:flex-none min-w-[160px]">
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  applyFilters({ sort: e.target.value });
                }}
                className="w-full appearance-none bg-white border border-slate-200 rounded-lg py-2.5 px-3.5 pr-8 text-xs font-semibold text-[#0d1b1e] focus:outline-none focus:border-[#5a9e2f]"
              >
                <option value="featured">Sort: Featured</option>
                <option value="newest">Sort: Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Desktop Filter Options Bar */}
        <div className="hidden lg:grid grid-cols-5 gap-3 pt-3 border-t border-slate-100 text-xs">
          
          {/* Category */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                applyFilters({ category: e.target.value });
              }}
              className="w-full bg-white border border-slate-200 rounded-lg py-2 px-2.5 text-xs text-[#0d1b1e]"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Purpose */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Purpose
            </label>
            <select
              value={selectedPurpose}
              onChange={(e) => {
                setSelectedPurpose(e.target.value);
                applyFilters({ purpose: e.target.value });
              }}
              className="w-full bg-white border border-slate-200 rounded-lg py-2 px-2.5 text-xs text-[#0d1b1e]"
            >
              <option value="">All Purposes</option>
              {purposes.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Age Range */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Age Range
            </label>
            <select
              value={selectedAge}
              onChange={(e) => {
                setSelectedAge(e.target.value);
                applyFilters({ age: e.target.value });
              }}
              className="w-full bg-white border border-slate-200 rounded-lg py-2 px-2.5 text-xs text-[#0d1b1e]"
            >
              <option value="">All Ages</option>
              {ageRanges.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          {/* Max Price */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Max Price (₹)
            </label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
                applyFilters({ maxPrice: e.target.value });
              }}
              placeholder="e.g. 1000"
              className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs text-[#0d1b1e]"
            />
          </div>

          {/* Availability Toggle / Reset */}
          <div className="flex items-end gap-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#0d1b1e] cursor-pointer pb-2">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => {
                  setInStockOnly(e.target.checked);
                  applyFilters({ inStock: e.target.checked ? 'true' : '' });
                }}
                className="rounded text-[#5a9e2f] focus:ring-[#5a9e2f]"
              />
              <span>In Stock Only</span>
            </label>
            {(selectedCategory || selectedPurpose || selectedAge || maxPrice || inStockOnly || search) && (
              <button
                onClick={clearAllFilters}
                className="pb-2 text-xs font-semibold text-[#5a9e2f] underline hover:text-[#488224]"
              >
                Reset
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Product Grid: Desktop 4-col, Tablet 2-3 col, Mobile 2-col */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Showing <strong className="text-[#0d1b1e]">{filteredProducts.length}</strong> products
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200 p-8 space-y-4">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
              ?
            </div>
            <h3 className="text-lg font-bold text-[#0d1b1e]">We couldn’t find what you’re looking for.</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search terms or clearing your selected filters.
            </p>
            <button
              onClick={clearAllFilters}
              className="py-2.5 px-6 rounded-lg bg-[#5a9e2f] text-white text-xs font-bold hover:bg-[#488224] transition-colors"
            >
              Browse All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Mobile Filter Modal / Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="fixed inset-0 bg-[#0d1b1e]/60 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setMobileFilterOpen(false)}
          />

          <div className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-white rounded-t-3xl shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-300">
            {/* Modal Header */}
            <div className="p-4 px-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-[#5a9e2f]" />
                <h3 className="text-base font-bold text-[#0d1b1e]">Filter Products</h3>
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 overflow-y-auto space-y-5 custom-scrollbar text-xs">
              {/* Category */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setSelectedCategory('');
                      applyFilters({ category: '' });
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      !selectedCategory
                        ? 'bg-[#5a9e2f] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedCategory(c.slug);
                        applyFilters({ category: c.slug });
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                        selectedCategory === c.slug
                          ? 'bg-[#5a9e2f] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Purpose */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Purpose
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setSelectedPurpose('');
                      applyFilters({ purpose: '' });
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      !selectedPurpose
                        ? 'bg-[#0d1b1e] text-[#5a9e2f]'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    All Purposes
                  </button>
                  {purposes.map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        setSelectedPurpose(p);
                        applyFilters({ purpose: p });
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                        selectedPurpose === p
                          ? 'bg-[#0d1b1e] text-[#5a9e2f]'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age Range */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Age Range
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setSelectedAge('');
                      applyFilters({ age: '' });
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      !selectedAge
                        ? 'bg-[#5a9e2f] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    All Ages
                  </button>
                  {ageRanges.map((a) => (
                    <button
                      key={a}
                      onClick={() => {
                        setSelectedAge(a);
                        applyFilters({ age: a });
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                        selectedAge === a
                          ? 'bg-[#5a9e2f] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Price */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Max Price: {maxPrice ? `₹${maxPrice}` : 'Any'}
                </label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(e.target.value);
                    applyFilters({ maxPrice: e.target.value });
                  }}
                  placeholder="e.g. 1000"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-[#0d1b1e]"
                />
              </div>

              {/* In Stock Only */}
              <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-[#0d1b1e] cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => {
                    setInStockOnly(e.target.checked);
                    applyFilters({ inStock: e.target.checked ? 'true' : '' });
                  }}
                  className="rounded text-[#5a9e2f] focus:ring-[#5a9e2f] w-4 h-4"
                />
                <span>Show In-Stock Products Only</span>
              </label>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center gap-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <button
                onClick={() => {
                  clearAllFilters();
                  setMobileFilterOpen(false);
                }}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-300 font-bold text-xs text-slate-700 bg-white"
              >
                Reset All
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 px-4 rounded-xl bg-[#5a9e2f] hover:bg-[#488224] font-bold text-xs text-white shadow-md"
              >
                View {filteredProducts.length} Results
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
