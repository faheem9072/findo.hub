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
}

export default function ProductCard({ product }: ProductCardProps) {
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

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden flex flex-col justify-between h-full transition-all hover:border-[#5a9e2f] hover:shadow-md p-3 sm:p-4">
      <div>
        {/* VORS-Style Top Metadata Header: Category / Age Badge on Left, Wishlist Heart on Right */}
        <div className="flex items-center justify-between pb-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          <span className="px-2 py-0.5 rounded-md bg-slate-100/90 border border-slate-200/80 text-slate-600 truncate max-w-[130px]">
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
          className="block relative aspect-square bg-[#fafbf8] rounded-xl overflow-hidden border border-slate-100 group-hover:border-[#5a9e2f]/20 transition-colors"
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
              <span className="bg-[#0d1b1e] text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                -{discountPercent}%
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
            <div className="flex items-center gap-1 text-amber-500 font-semibold text-xs shrink-0">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-slate-700 text-[11px] font-bold">{product.rating || 4.9}</span>
            </div>
          </div>

          <Link href={`/product/${product.slug}`} className="block group-hover:text-[#5a9e2f] transition-colors">
            <h3 className="font-extrabold text-[#0d1b1e] text-xs sm:text-sm uppercase tracking-wide leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-[11px] text-slate-500 line-clamp-1 leading-relaxed">
            {product.shortDesc}
          </p>
        </div>
      </div>

      {/* Pricing & Add to Cart */}
      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-1.5">
        <div className="flex items-baseline gap-1.5">
          <span className="text-base sm:text-lg font-black text-[#0d1b1e]">₹{product.price}</span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-xs text-slate-400 line-through">₹{product.compareAtPrice}</span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className={`py-1.5 sm:py-2 px-3 sm:px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shrink-0 ${
            product.stock <= 0
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : added
              ? 'bg-[#0d1b1e] text-emerald-400 shadow-sm'
              : 'bg-[#5a9e2f] hover:bg-[#488224] text-white shadow-xs'
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
