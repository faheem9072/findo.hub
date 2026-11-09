'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingBag, Check, Heart } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    shortDesc: string;
    price: number;
    compareAtPrice?: number | null;
    stock: number;
    images: string;
    ageRange?: string;
    badges?: string;
    rating?: number;
    reviewCount?: number;
    category?: { name: string; slug: string };
  };
  variant?: 'light' | 'dark';
}

export default function ProductCard({ product, variant = 'dark' }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = React.useState(false);
  const [liked, setLiked] = useState(false);

  let parsedImages: string[] = ['/logo.png'];
  try {
    parsedImages = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
  } catch {
    if (typeof product.images === 'string' && product.images) {
      parsedImages = [product.images];
    }
  }
  const mainImage = parsedImages[0] || '/logo.png';

  const discountPercent =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
  };

  const isDark = variant === 'dark';

  return (
    <div
      className={`group rounded-2xl overflow-hidden flex flex-col justify-between h-full transition-all duration-300 p-3 sm:p-4 ${
        isDark
          ? 'bg-[#0f1f22]/90 border border-white/10 hover:border-[#5a9e2f] hover:shadow-[0_12px_35px_rgba(90,158,47,0.3)]'
          : 'bg-white border border-slate-200/90 hover:border-[#5a9e2f] hover:shadow-md'
      }`}
    >
      <div>
        {/* Top Metadata Header: Category / Age Badge on Left, Wishlist Heart on Right */}
        <div className="flex items-center justify-between pb-2.5 text-[10px] font-bold uppercase tracking-wider">
          <span
            className={`px-2 py-0.5 rounded-md truncate max-w-[130px] ${
              isDark
                ? 'bg-white/5 border border-white/10 text-slate-300'
                : 'bg-slate-100/90 border border-slate-200/80 text-slate-600'
            }`}
          >
            {product.ageRange ? `[ ${product.ageRange} ]` : `[ ${product.category?.name || 'FINDO'} ]`}
          </span>
          <button
            onClick={handleToggleLike}
            className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
            aria-label="Save to wishlist"
            title="Wishlist"
          >
            <Heart
              className={`w-4 h-4 transition-transform group-hover:scale-105 ${
                liked ? 'fill-rose-500 text-rose-500' : 'text-slate-400'
              }`}
            />
          </button>
        </div>

        {/* Product Image Stage */}
        <Link
          href={`/product/${product.slug}`}
          className={`block relative aspect-square rounded-xl overflow-hidden transition-colors ${
            isDark
              ? 'bg-[#070e10] border border-white/5 group-hover:border-[#5a9e2f]/40'
              : 'bg-[#fafbf8] border border-slate-100 group-hover:border-[#5a9e2f]/20'
          }`}
        >
          <Image
            src={mainImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {discountPercent && (
            <div className="absolute top-2.5 left-2.5 z-10">
              <span className="bg-[#5a9e2f] text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
                -{discountPercent}%
              </span>
            </div>
          )}

          {/* TOP SELLING Badge for Habit Tracker & DIY Camera */}
          {(product.slug?.includes('habit') ||
            product.slug?.includes('camera') ||
            product.name?.toLowerCase().includes('habit tracker') ||
            product.name?.toLowerCase().includes('camera') ||
            product.badges?.includes('TOP')) && (
            <div className="absolute top-2.5 right-2.5 z-10">
              <span className="bg-gradient-to-r from-amber-500 to-rose-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                🔥 TOP SELLING
              </span>
            </div>
          )}
        </Link>

        {/* Product Meta & Title */}
        <div className="pt-3 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[9px] font-bold text-[#5a9e2f] uppercase tracking-widest truncate">
              {product.category?.name || 'SCREEN-FREE'}
            </span>
            <div className="flex items-center gap-1 text-amber-400 font-semibold text-xs shrink-0">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className={`text-[11px] font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {product.rating || 4.9}
              </span>
            </div>
          </div>

          <Link href={`/product/${product.slug}`} className="block group-hover:text-[#5a9e2f] transition-colors">
            <h3
              className={`font-black text-xs sm:text-sm uppercase tracking-wide leading-snug line-clamp-1 ${
                isDark ? 'text-white' : 'text-[#0d1b1e]'
              }`}
            >
              {product.name}
            </h3>
          </Link>

          <p className={`text-[11px] line-clamp-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {product.shortDesc}
          </p>
        </div>
      </div>

      {/* Pricing & Add to Cart */}
      <div
        className={`pt-3 mt-3 border-t flex items-center justify-between gap-1.5 ${
          isDark ? 'border-white/10' : 'border-slate-100'
        }`}
      >
        <div className="flex items-baseline gap-1.5">
          <span className={`text-base sm:text-lg font-black ${isDark ? 'text-[#72bf44]' : 'text-[#0d1b1e]'}`}>
            ₹{product.price}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-xs text-slate-500 line-through">₹{product.compareAtPrice}</span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className={`py-1.5 sm:py-2 px-3 sm:px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shrink-0 ${
            product.stock <= 0
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : added
              ? 'bg-white text-[#0d1b1e] shadow-md font-black'
              : 'bg-[#5a9e2f] hover:bg-[#488224] text-white shadow-sm hover:shadow-[0_0_15px_rgba(90,158,47,0.5)]'
          }`}
        >
          {product.stock <= 0 ? (
            <span>Out</span>
          ) : added ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
