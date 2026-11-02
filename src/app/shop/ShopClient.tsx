'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, X, ChevronDown, SlidersHorizontal, Check } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

interface ShopClientProps {
  initialProducts: any[];
  categories: any[];
}

export default function ShopClient({ initialProducts, categories }: ShopClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryQ = searchParams.get('q') || searchParams.get('search') || '';
  const queryCat = searchParams.get('category') || '';
  const queryPurpose = searchParams.get('purpose') || '';
  const queryAge = searchParams.get('age') || '';
  const queryMaxPrice = searchParams.get('maxPrice') || '';
  const queryInStock = searchParams.get('inStock') === 'true';
  const querySort = searchParams.get('sort') || 'featured';

  const [search, setSearch] = useState(queryQ);
  const [selectedCategory, setSelectedCategory] = useState(queryCat);
  const [selectedPurpose, setSelectedPurpose] = useState(queryPurpose);
  const [selectedAge, setSelectedAge] = useState(queryAge);
  const [maxPrice, setMaxPrice] = useState(queryMaxPrice);
  const [inStockOnly, setInStockOnly] = useState(queryInStock);
  const [sort, setSort] = useState(querySort);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state with URL search parameters on every navigation
  useEffect(() => {
    setSearch(queryQ);
    setSelectedCategory(queryCat);
    setSelectedPurpose(queryPurpose);
    setSelectedAge(queryAge);
    setMaxPrice(queryMaxPrice);
    setInStockOnly(queryInStock);
    setSort(querySort);
  }, [queryQ, queryCat, queryPurpose, queryAge, queryMaxPrice, queryInStock, querySort]);

  const purposes = ['PLAY', 'LEARN', 'CREATE', 'EXPLORE', 'BUILD HABITS'];
  const ageRanges = [
    { label: 'All Ages', value: '' },
    { label: '0 - 3 Years', value: '0-3 Years', desc: 'Toddlers & Sensory' },
    { label: '3 - 5 Years', value: '3-5 Years', desc: 'Preschool & Routine' },
    { label: '6 - 8 Years', value: '6-8 Years', desc: 'Puzzles & Construction' },
    { label: '8+ Years', value: '8+ Years', desc: 'STEM & Science Labs' },
  ];

  function matchAgeRange(productAge: string | undefined | null, filterAge: string): boolean {
    if (!filterAge || filterAge === 'All Ages' || filterAge === '' || filterAge === 'all') return true;
    if (!productAge) return false;

    const f = filterAge.toLowerCase().replace(/[\s\-_]+/g, '');
    const p = productAge.toLowerCase().replace(/[\s\-_]+/g, '');

    // Exact or substring match
    if (p.includes(f) || f.includes(p)) return true;

    // 0 - 3 Years (Toddlers & Sensory)
    if (f.includes('03') || f.includes('02') || f.includes('toddler')) {
      return (
        p.includes('03') ||
        p.includes('02') ||
        p.includes('13') ||
        p.includes('24') ||
        p.includes('25') ||
        p.includes('26') ||
        p.startsWith('0') ||
        p.startsWith('1') ||
        p.startsWith('2')
      );
    }

    // 3 - 5 Years (Preschool & Routine)
    if (f.includes('35') || f.includes('36') || f.includes('preschool')) {
      return (
        p.includes('36') ||
        p.includes('38') ||
        p.includes('48') ||
        p.includes('35') ||
        p.includes('25') ||
        p.includes('26') ||
        p.includes('410')
      );
    }

    // 6 - 8 Years (Growing Explorers & Active Play)
    if (f.includes('68')) {
      return (
        p.includes('38') ||
        p.includes('48') ||
        p.includes('510') ||
        p.includes('410') ||
        p.includes('612') ||
        p.includes('714') ||
        p.includes('7+') ||
        p.includes('6+')
      );
    }

    // 8+ Years (Science & STEM Labs, handles "8+", "8plus", "8years" if + was decoded as space)
    if (f.includes('8+') || f.includes('8plus') || f.includes('8years') || f.startsWith('8')) {
      return (
        p.includes('8+') ||
        p.includes('714') ||
        p.includes('612') ||
        p.includes('7+') ||
        p.includes('510') ||
        p.includes('410')
      );
    }

    return p.includes(f);
  }

  const isAgeActive = (val: string, label: string) => {
    if (!val && !selectedAge) return true;
    if (!selectedAge) return false;
    const cleanSel = selectedAge.toLowerCase().replace(/[\s\-_+]+/g, '');
    const cleanVal = val.toLowerCase().replace(/[\s\-_+]+/g, '');
    const cleanLab = label.toLowerCase().replace(/[\s\-_+]+/g, '');
    return cleanSel === cleanVal || cleanSel === cleanLab || cleanSel.includes(cleanVal);
  };

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
        p.shortDesc?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
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
    filteredProducts = filteredProducts.filter((p) => matchAgeRange(p.ageRange, selectedAge));
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0d1b1e]">
          Shop Findo
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Thoughtfully chosen, screen-free products for curious young minds.
        </p>
      </div>

      {/* Filter & Search Bar Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3.5">
        
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
              placeholder="Search products by name, kit, or topic..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-[#fafbf8] text-xs sm:text-sm text-[#0d1b1e] placeholder-slate-400 focus:outline-none focus:border-[#5a9e2f]"
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
              className="lg:hidden flex-1 sm:flex-none py-2.5 px-4 rounded-xl border border-slate-200 bg-white font-semibold text-xs text-[#0d1b1e] flex items-center justify-center gap-2 hover:bg-slate-50"
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
                className="w-full appearance-none bg-white border border-slate-200 rounded-xl py-2.5 px-3.5 pr-8 text-xs font-semibold text-[#0d1b1e] focus:outline-none focus:border-[#5a9e2f]"
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

        {/* Quick Age Segment Selector */}
        <div className="pt-2 flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            Shop by Age:
          </span>
          {ageRanges.map((a) => {
            const active = isAgeActive(a.value, a.label);
            return (
              <button
                key={a.label}
                onClick={() => {
                  setSelectedAge(a.value);
                  applyFilters({ age: a.value });
                }}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  active
                    ? 'bg-[#5a9e2f] text-white shadow-xs'
                    : 'bg-[#f4f7f2] text-slate-700 hover:bg-slate-200/80 border border-slate-200/60'
                }`}
              >
                <span>{a.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Filter Chips Bar */}
        {(selectedCategory || selectedPurpose || selectedAge || maxPrice || inStockOnly || search) && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Active:
            </span>

            {selectedAge && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200 text-[11px]">
                <span>Age: {selectedAge}</span>
                <button
                  onClick={() => {
                    setSelectedAge('');
                    applyFilters({ age: '' });
                  }}
                  className="hover:text-emerald-950 font-bold ml-0.5"
                  title="Remove age filter"
                >
                  ✕
                </button>
              </span>
            )}

            {selectedCategory && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 font-semibold border border-blue-200 text-[11px]">
                <span>Category: {categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory}</span>
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    applyFilters({ category: '' });
                  }}
                  className="hover:text-blue-950 font-bold ml-0.5"
                  title="Remove category filter"
                >
                  ✕
                </button>
              </span>
            )}

            {selectedPurpose && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 font-semibold border border-purple-200 text-[11px]">
                <span>Purpose: {selectedPurpose}</span>
                <button
                  onClick={() => {
                    setSelectedPurpose('');
                    applyFilters({ purpose: '' });
                  }}
                  className="hover:text-purple-950 font-bold ml-0.5"
                  title="Remove purpose filter"
                >
                  ✕
                </button>
              </span>
            )}

            {search && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-semibold border border-amber-200 text-[11px]">
                <span>&quot;{search}&quot;</span>
                <button
                  onClick={() => {
                    setSearch('');
                    applyFilters({ q: '' });
                  }}
                  className="hover:text-amber-950 font-bold ml-0.5"
                  title="Clear search"
                >
                  ✕
                </button>
              </span>
            )}

            <button
              onClick={clearAllFilters}
              className="text-[11px] font-bold text-red-500 hover:text-red-700 underline ml-auto"
            >
              Reset Filters
            </button>
          </div>
        )}

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
              {ageRanges.filter(a => a.value !== '').map((a) => (
                <option key={a.label} value={a.value}>{a.label}</option>
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
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-4 shadow-xs">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
              ?
            </div>
            <h3 className="text-lg font-bold text-[#0d1b1e]">We couldn&apos;t find products matching these filters.</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search terms or clearing your selected age/category filters.
            </p>
            <button
              onClick={clearAllFilters}
              className="py-2.5 px-6 rounded-xl bg-[#5a9e2f] text-white text-xs font-bold hover:bg-[#488224] transition-colors shadow-xs"
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

      {/* Mobile Filter Drawer / Bottom Sheet */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          <div
            className="fixed inset-0 bg-[#0d1b1e]/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileFilterOpen(false)}
          />

          <div className="relative bg-white rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-[#fafbf8]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#5a9e2f]" />
                <h3 className="font-extrabold text-[#0d1b1e] text-sm">Filter Products</h3>
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200/60 flex items-center justify-center text-slate-500 hover:text-[#0d1b1e]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-6 overflow-y-auto custom-scrollbar text-xs">
              
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
                  {ageRanges.map((a) => {
                    const isSelected = isAgeActive(a.value, a.label);
                    return (
                      <button
                        key={a.label}
                        onClick={() => {
                          setSelectedAge(a.value);
                          applyFilters({ age: a.value });
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                          isSelected
                            ? 'bg-[#5a9e2f] text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {a.label}
                      </button>
                    );
                  })}
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
