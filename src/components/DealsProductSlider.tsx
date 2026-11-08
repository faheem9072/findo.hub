'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ShoppingBag, Check, Flame, Star, Tag } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export interface DealProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number | null;
  images: string;
  ageRange?: string;
  stock: number;
  badge?: string;
}

export default function DealsProductSlider({ products }: { products: DealProduct[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const [addedId, setAddedId] = React.useState<string | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleAdd = (e: React.MouseEvent, prod: DealProduct) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(prod, 1);
    setAddedId(prod.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 border-t border-slate-200">
      
      {/* Section Header with Offer Callout */}
      <div className="flex items-end justify-between mb-6 sm:mb-8">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full text-rose-700 font-mono text-xs font-black uppercase">
            <Flame className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
            <span>SPECIAL OFFER DEALS • LIMITED TIME</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Top Deals with Offer Prices
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Hand-picked developmental essentials at guaranteed lowest prices
          </p>
        </div>

        <Link
          href="/shop"
          className="hidden sm:inline-flex items-center gap-1 text-xs font-black text-[#5a9e2f] uppercase hover:underline"
        >
          <span>View All Deals →</span>
        </Link>
      </div>

      {/* Relative Slider Container */}
      <div className="relative group">
        
        {/* Left Arrow Button */}
        <button
          onClick={() => scroll('left')}
          aria-label="Previous Deals"
          className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-900 hover:scale-110 transition-all opacity-90 hover:opacity-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Scrollable Track */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-4 overflow-x-auto scrollbar-none py-3 px-1 scroll-smooth"
        >
          {products.map((p) => {
            let img = '/logo.png';
            try {
              const parsed = JSON.parse(p.images);
              img = Array.isArray(parsed) && parsed[0] ? parsed[0] : p.images;
            } catch {
              img = p.images || '/logo.png';
            }

            const discount =
              p.compareAtPrice && p.compareAtPrice > p.price
                ? Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100)
                : null;

            const savings = p.compareAtPrice && p.compareAtPrice > p.price ? p.compareAtPrice - p.price : 0;
            const isAdded = addedId === p.id;

            return (
              <div
                key={p.id}
                className="shrink-0 w-60 sm:w-68 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:border-[#5a9e2f] transition-all duration-300 flex flex-col justify-between overflow-hidden group/item p-3.5"
              >
                <div>
                  {/* Top Header: Age & Discount */}
                  <div className="flex items-center justify-between gap-1 pb-2 text-[10px] font-bold">
                    <span className="bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md truncate max-w-[130px]">
                      {p.ageRange || 'All Ages'}
                    </span>
                    {discount && (
                      <span className="bg-rose-600 text-white font-black px-2 py-0.5 rounded-md flex items-center gap-0.5 shadow-xs">
                        <Tag className="w-3 h-3" />
                        <span>{discount}% OFF</span>
                      </span>
                    )}
                  </div>

                  {/* Product Image */}
                  <Link
                    href={`/product/${p.slug}`}
                    className="block relative aspect-square rounded-xl overflow-hidden bg-slate-50 my-2 group-hover/item:scale-102 transition-transform duration-300"
                  >
                    <Image
                      src={img}
                      alt={p.name}
                      fill
                      className="object-contain p-2"
                    />
                  </Link>

                  {/* Title */}
                  <Link href={`/product/${p.slug}`} className="block">
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover/item:text-[#5a9e2f] transition-colors line-clamp-2 min-h-[2.5rem]">
                      {p.name}
                    </h3>
                  </Link>
                </div>

                {/* Pricing & Add To Bag */}
                <div className="pt-3 mt-2 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg sm:text-xl font-black text-slate-900">
                          ₹{p.price}
                        </span>
                        {p.compareAtPrice && (
                          <span className="text-xs text-slate-400 line-through font-semibold">
                            ₹{p.compareAtPrice}
                          </span>
                        )}
                      </div>
                      {savings > 0 && (
                        <span className="text-[10px] text-emerald-700 font-bold block">
                          You Save ₹{savings}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 1-Click Add To Bag */}
                  <button
                    onClick={(e) => handleAdd(e, p)}
                    className={`w-full py-2 px-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-900 hover:bg-[#5a9e2f] text-white hover:shadow-md'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll('right')}
          aria-label="Next Deals"
          className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-900 hover:scale-110 transition-all opacity-90 hover:opacity-100"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

      </div>
    </section>
  );
}
