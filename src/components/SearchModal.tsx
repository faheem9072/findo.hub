'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, Tag } from 'lucide-react';

interface ProductSearchResult {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number | null;
  images: string;
  category: { name: string };
  ageRange: string;
}

export default function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ProductSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.products || []);
        }
      } catch (err) {
        console.error('Failed to search products:', err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0d1b1e]/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative mx-auto max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        {/* Search Header Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 bg-[#fafbf8]">
          <Search className="w-5 h-5 text-[#5a9e2f] shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search kids products (e.g. tablet, night light, gyro bowl)..."
            className="w-full bg-transparent text-[#0d1b1e] placeholder-slate-400 font-medium text-base focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-bold text-slate-500 hover:text-[#0d1b1e] bg-slate-200/60 rounded-md"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {loading ? (
            <div className="text-center py-8 text-slate-400 text-sm">Searching Findo catalog...</div>
          ) : query && results.length === 0 ? (
            <div className="text-center py-8 space-y-2">
              <p className="text-[#0d1b1e] font-semibold text-sm">No products found for &quot;{query}&quot;</p>
              <p className="text-slate-400 text-xs">Try searching for drawing board, flashcards, silicone duck, or snack bowl.</p>
            </div>
          ) : results.length > 0 ? (
            results.map((product) => {
              let img = '/logo.jpeg';
              try {
                const parsed = JSON.parse(product.images);
                if (Array.isArray(parsed) && parsed.length > 0) img = parsed[0];
              } catch {}

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#eef8ea] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-50">
                      <Image src={img} alt={product.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0d1b1e] group-hover:text-[#5a9e2f] transition-colors">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Tag className="w-3 h-3 text-[#5a9e2f]" />
                          {product.category?.name}
                        </span>
                        <span>•</span>
                        <span>{product.ageRange}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-sm font-bold text-[#0d1b1e]">₹{product.price}</span>
                      {product.compareAtPrice && product.compareAtPrice > product.price && (
                        <div className="text-[10px] text-slate-400 line-through">₹{product.compareAtPrice}</div>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#5a9e2f] transition-colors" />
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="py-6 text-center space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Popular Searches</span>
              <div className="flex flex-wrap justify-center gap-2 pt-1">
                {['Magic Tablet', 'Anti-Spill Bowl', 'Flashcards', 'Duck Light', 'Busy Board'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-[#eef8ea] hover:text-[#5a9e2f] text-slate-700 text-xs font-semibold rounded-full transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
