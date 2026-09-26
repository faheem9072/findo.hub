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
    ageRange: string;
    badges: string;
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

  let parsedBadges: string[] = [];
  try {
    parsedBadges = typeof product.badges === 'string' ? JSON.parse(product.badges) : product.badges;
  } catch {}

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
    <div className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden card-hover flex flex-col justify-between h-full relative">
      <div>
        {/* Product Image Box */}
        <Link href={`/products/${product.slug}`} className="block relative aspect-square bg-slate-50 overflow-hidden">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {discountPercent && (
              <span className="bg-[#5a9e2f] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                -{discountPercent}% OFF
              </span>
            )}
            {parsedBadges.length > 0 && (
              <span className="bg-[#0d1b1e]/85 backdrop-blur-xs text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {parsedBadges[0]}
              </span>
            )}
          </div>

          {/* Age Group Tag */}
          <div className="absolute bottom-3 right-3 z-10">
            <span className="bg-white/90 backdrop-blur-xs text-[#0d1b1e] text-[11px] font-bold px-2.5 py-1 rounded-full border border-slate-200 shadow-xs">
              {product.ageRange}
            </span>
          </div>
        </Link>

        {/* Content Body */}
        <div className="p-5 space-y-2">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-[#5a9e2f] uppercase tracking-wider text-[10px]">
              {product.category?.name || 'Kids Essential'}
            </span>
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="text-slate-700 text-xs">4.9</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/products/${product.slug}`} className="block group-hover:text-[#5a9e2f] transition-colors">
            <h3 className="font-bold text-[#0d1b1e] text-base leading-snug line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Short description */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.shortDesc}
          </p>
        </div>
      </div>

      {/* Footer Price & Add to Cart */}
      <div className="p-5 pt-0 mt-auto">
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-[#0d1b1e]">₹{product.price}</span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">₹{product.compareAtPrice}</span>
              )}
            </div>
            <span className="text-[10px] text-emerald-800 font-medium">Incl. all taxes</span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`py-2.5 px-4 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs ${
              added
                ? 'bg-[#0d1b1e] text-[#5a9e2f]'
                : 'bg-[#5a9e2f] hover:bg-[#488224] text-white hover:shadow-md'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4 text-[#5a9e2f]" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
