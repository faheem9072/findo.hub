'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingBag, Check, Heart, Sparkles } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    shortDesc: string;
    price: number;
    compareAtPrice?: number | null;
    deliveryFee?: number;
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

export default function ProductCard({ product, variant = 'light' }: ProductCardProps) {
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
      className={`group rounded-3xl overflow-hidden flex flex-col justify-between h-full transition-all duration-300 p-3.5 sm:p-4.5 ${
        isDark
          ? 'bg-[#0b2420]/90 border border-white/10 hover:border-[#f25c38] hover:shadow-[0_12px_35px_rgba(242,92,56,0.25)]'
          : 'bg-white border border-[#0b574f]/12 hover:border-[#f25c38] hover:shadow-xl'
      }`}
    >
      <div>
        {/* Top Metadata Header */}
        <div className="flex items-center justify-between pb-2.5 text-[10px] font-bold uppercase tracking-wider font-heading">
          <span
            className={`px-2.5 py-0.5 rounded-full truncate max-w-[140px] ${
              isDark
                ? 'bg-white/10 border border-white/15 text-slate-200'
                : 'bg-[#e6f4f2] text-[#0b574f] border border-[#0b574f]/20'
            }`}
          >
            {product.ageRange ? `${product.ageRange}` : `${product.category?.name || 'WOOOBEY'}`}
          </span>
          <button
            onClick={handleToggleLike}
            className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
            aria-label="Save to wishlist"
            title="Wishlist"
          >
            <Heart
              className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                liked ? 'fill-rose-500 text-rose-500' : 'text-slate-400'
              }`}
            />
          </button>
        </div>

        {/* Product Image Stage */}
        <Link
          href={`/product/${product.slug}`}
          className={`block relative aspect-square rounded-2xl overflow-hidden transition-all ${
            isDark
              ? 'bg-[#071715] border border-white/5 group-hover:border-[#f25c38]/40'
              : 'bg-[#fffaf5] border border-[#0b574f]/10 group-hover:border-[#f25c38]/30'
          }`}
        >
          <Image
            src={mainImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
          />

          {discountPercent && (
            <div className="absolute top-2.5 left-2.5 z-10">
              <span className="bg-[#f25c38] text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm font-heading">
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
              <span className="bg-gradient-to-r from-[#ffb703] to-[#f25c38] text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md font-heading flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> TOP PICK
              </span>
            </div>
          )}
        </Link>

        {/* Product Meta & Title */}
        <div className="pt-3.5 space-y-1">
          <div className="flex items-center justify-between text-xs font-heading">
            <span className="text-[10px] font-bold text-[#f25c38] uppercase tracking-widest truncate">
              {product.category?.name || 'SCREEN-FREE'}
            </span>
            <div className="flex items-center gap-1 text-[#ffb703] font-semibold text-xs shrink-0">
              <Star className="w-3.5 h-3.5 fill-[#ffb703] text-[#ffb703]" />
              <span className={`text-[11px] font-bold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                {product.rating || 4.9}
              </span>
            </div>
          </div>

          <Link href={`/product/${product.slug}`} className="block group-hover:text-[#f25c38] transition-colors">
            <h3
              className={`font-black text-xs sm:text-sm tracking-wide leading-snug line-clamp-1 font-heading ${
                isDark ? 'text-white' : 'text-[#0e2a27]'
              }`}
            >
              {product.name}
            </h3>
          </Link>

          <p className={`text-[11px] line-clamp-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
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
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5 font-heading">
            <span className={`text-base sm:text-lg font-black ${isDark ? 'text-[#ffb703]' : 'text-[#0b574f]'}`}>
              ₹{product.price}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">₹{product.compareAtPrice}</span>
            )}
          </div>
          <span className={`text-[9px] font-bold ${product.deliveryFee && product.deliveryFee > 0 ? 'text-[#f25c38]' : 'text-[#0b574f]'}`}>
            {product.deliveryFee && product.deliveryFee > 0 ? `+₹${product.deliveryFee} Delivery` : 'Free Delivery'}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className={`py-2 px-3.5 sm:px-4 rounded-full font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shrink-0 font-heading shadow-md hover:scale-105 ${
            product.stock <= 0
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
              : added
              ? 'bg-[#0b574f] text-white shadow-lg'
              : 'bg-gradient-to-r from-[#f25c38] to-[#ff5e36] hover:from-[#e04822] hover:to-[#f25c38] text-white shadow-[0_4px_12px_rgba(242,92,56,0.35)]'
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
