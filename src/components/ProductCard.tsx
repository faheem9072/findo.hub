'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingBag, Check } from 'lucide-react';
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

  let parsedImages: string[] = ['/logo.jpeg'];
  try {
    parsedImages = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
  } catch {}
  const mainImage = parsedImages[0] || '/logo.jpeg';

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

  return (
    <div className="group bg-white rounded-xl border border-slate-200/70 overflow-hidden flex flex-col justify-between h-full transition-all hover:border-[#5a9e2f]/40 hover:shadow-sm">
      <div>
        {/* Product Image */}
        <Link href={`/product/${product.slug}`} className="block relative aspect-square bg-[#f9faf8] overflow-hidden">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
          />

          {discountPercent && (
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-[#0d1b1e] text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                -{discountPercent}%
              </span>
            </div>
          )}

          {product.ageRange && (
            <div className="absolute bottom-3 right-3 z-10">
              <span className="bg-white/90 backdrop-blur-xs text-[#0d1b1e] text-[10px] font-semibold px-2 py-0.5 rounded-md border border-slate-200">
                {product.ageRange}
              </span>
            </div>
          )}
        </Link>

        {/* Product Content */}
        <div className="p-3 sm:p-4 space-y-1 sm:space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate max-w-[90px]">
              {product.category?.name || 'FINDO'}
            </span>
            <div className="flex items-center gap-1 text-amber-400 font-semibold text-xs shrink-0">
              <Star className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-slate-700 text-[11px] sm:text-xs font-bold">{product.rating || 4.9}</span>
            </div>
          </div>

          <Link href={`/product/${product.slug}`} className="block group-hover:text-[#5a9e2f] transition-colors">
            <h3 className="font-bold text-[#0d1b1e] text-xs sm:text-sm leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed hidden xs:line-clamp-2">
            {product.shortDesc}
          </p>
        </div>
      </div>

      {/* Pricing & Add to Cart */}
      <div className="p-3 sm:p-4 pt-0 mt-auto">
        <div className="pt-2 sm:pt-3 border-t border-slate-100 flex items-center justify-between gap-1">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5">
            <span className="text-sm sm:text-base font-extrabold text-[#0d1b1e]">₹{product.price}</span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-[10px] sm:text-xs text-slate-400 line-through">₹{product.compareAtPrice}</span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`py-1.5 sm:py-2 px-2.5 sm:px-3.5 rounded-lg font-bold text-xs flex items-center gap-1 sm:gap-1.5 transition-all shrink-0 ${
              product.stock <= 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : added
                ? 'bg-[#0d1b1e] text-emerald-400'
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
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="sm:hidden">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
