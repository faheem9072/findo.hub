'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Star,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  Plus,
  Minus,
  Share2,
  ChevronRight,
} from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function ProductDetailClient({ product }: { product: any }) {
  const { addToCart } = useCart();
  const router = useRouter();

  let parsedImages: string[] = ['/logo.jpeg'];
  try {
    parsedImages = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
  } catch {}

  let parsedBadges: string[] = [];
  try {
    parsedBadges = typeof product.badges === 'string' ? JSON.parse(product.badges) : product.badges;
  } catch {}

  let parsedSpecs: Record<string, string> = {};
  try {
    parsedSpecs = typeof product.specs === 'string' ? JSON.parse(product.specs) : product.specs;
  } catch {}

  const [selectedImage, setSelectedImage] = useState(parsedImages[0] || '/logo.jpeg');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [added, setAdded] = useState(false);

  const discountPercent =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/" className="hover:text-[#5a9e2f]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/products" className="hover:text-[#5a9e2f]">Catalog</Link>
        {product.category && (
          <>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/products?category=${product.category.slug}`} className="hover:text-[#5a9e2f]">
              {product.category.name}
            </Link>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#0d1b1e] truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Layout (Gallery + Details) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Gallery Column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-cover transition-all duration-300"
              priority
            />
            {discountPercent && (
              <span className="absolute top-4 left-4 bg-[#5a9e2f] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                -{discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {parsedImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {parsedImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-white ${
                    selectedImage === img
                      ? 'border-[#5a9e2f] ring-2 ring-[#5a9e2f]/20 scale-105'
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info & Purchase Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            {/* Category & Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {product.category && (
                <span className="text-xs font-bold text-[#5a9e2f] bg-[#eef8ea] px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.category.name}
                </span>
              )}
              <span className="text-xs font-bold text-[#0d1b1e] bg-slate-100 px-3 py-1 rounded-full">
                Age: {product.ageRange}
              </span>
              {parsedBadges.map((badge, idx) => (
                <span key={idx} className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                  {badge}
                </span>
              ))}
            </div>

            {/* Product Title */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0d1b1e] leading-snug">
              {product.name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-slate-900">4.9 / 5.0</span>
              <span className="text-slate-400">•</span>
              <span className="text-emerald-800 underline">124 Verified Reviews</span>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-[#0d1b1e]">₹{product.price}</span>
                  {product.compareAtPrice && product.compareAtPrice > product.price && (
                    <span className="text-base text-slate-400 line-through">₹{product.compareAtPrice}</span>
                  )}
                </div>
                <p className="text-xs text-emerald-800 font-medium mt-0.5">Inclusive of all taxes & free delivery over ₹999</p>
              </div>

              {/* Stock Pill */}
              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  In Stock ({product.stock} available)
                </span>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-sm text-slate-600 leading-relaxed pt-1">
              {product.shortDesc}
            </p>
          </div>

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-[#0d1b1e] uppercase tracking-wider">Quantity:</span>
              <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden shadow-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2.5 hover:bg-slate-100 text-slate-700 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-[#0d1b1e]">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))}
                  className="p-2.5 hover:bg-slate-100 text-slate-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleAddToCart}
                className={`py-4 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                  added
                    ? 'bg-[#0d1b1e] text-[#5a9e2f]'
                    : 'bg-[#5a9e2f] hover:bg-[#488224] text-white hover:shadow-lg'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5 text-[#5a9e2f]" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="py-4 px-6 rounded-2xl bg-[#0d1b1e] hover:bg-[#152e33] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <Zap className="w-5 h-5 text-[#5a9e2f]" />
                <span>Buy Now (Express)</span>
              </button>
            </div>
          </div>

          {/* Key Value Highlights Strip */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-[#eef8ea] rounded-2xl border border-emerald-200 text-xs">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#5a9e2f] shrink-0" />
              <span className="font-semibold text-[#0d1b1e]">Free Express Delivery ₹999+</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#5a9e2f] shrink-0" />
              <span className="font-semibold text-[#0d1b1e]">100% Non-Toxic & BPA Free</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#5a9e2f] shrink-0" />
              <span className="font-semibold text-[#0d1b1e]">7-Day Easy Replacement</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Specifications & Detailed Description */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex border-b border-slate-200 gap-8 text-sm font-bold">
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === 'description'
                ? 'border-[#5a9e2f] text-[#5a9e2f]'
                : 'border-transparent text-slate-500 hover:text-[#0d1b1e]'
            }`}
          >
            Detailed Overview
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === 'specs'
                ? 'border-[#5a9e2f] text-[#5a9e2f]'
                : 'border-transparent text-slate-500 hover:text-[#0d1b1e]'
            }`}
          >
            Product Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === 'reviews'
                ? 'border-[#5a9e2f] text-[#5a9e2f]'
                : 'border-transparent text-slate-500 hover:text-[#0d1b1e]'
            }`}
          >
            Parent Reviews (124)
          </button>
        </div>

        <div>
          {activeTab === 'description' && (
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p className="text-base font-medium text-[#0d1b1e]">{product.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-[#fafbf8] rounded-xl border border-slate-100 space-y-1">
                  <h4 className="font-bold text-[#0d1b1e] text-xs uppercase tracking-wider">Designed For Milestones</h4>
                  <p className="text-xs text-slate-500">Helps develop fine motor skills, sensory focus, and early independent thinking.</p>
                </div>
                <div className="p-4 bg-[#fafbf8] rounded-xl border border-slate-100 space-y-1">
                  <h4 className="font-bold text-[#0d1b1e] text-xs uppercase tracking-wider">Tested & Certified</h4>
                  <p className="text-xs text-slate-500">Exceeds standard child toy safety guidelines with smooth rounded safety edges.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(parsedSpecs).map(([key, val]) => (
                <div key={key} className="flex justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 text-xs">
                  <span className="font-semibold text-slate-500">{key}:</span>
                  <span className="font-bold text-[#0d1b1e]">{val}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#eef8ea] rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[#0d1b1e] text-sm">4.9 out of 5 stars</h4>
                  <p className="text-xs text-slate-500">Based on 124 verified customer reviews</p>
                </div>
                <button
                  onClick={() => alert('Review submission form available after verified purchase!')}
                  className="px-4 py-2 bg-[#5a9e2f] text-white text-xs font-bold rounded-lg hover:bg-[#488224] transition-colors"
                >
                  Write a Review
                </button>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-4 border border-slate-200 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#0d1b1e]">Meera Nair</span>
                    <span className="text-slate-400">2 days ago</span>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
                  </div>
                  <p className="text-xs text-slate-600">Product arrived carefully packaged in 3 days. Super durable build quality!</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
