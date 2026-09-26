'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    subtotal,
    freeShippingThreshold,
    freeShippingRemaining,
  } = useCart();

  if (!isCartOpen) return null;

  const progressPercentage = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-[#0d1b1e]/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fafbf8] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Drawer Header */}
          <div className="p-5 bg-[#0d1b1e] text-white flex items-center justify-between border-b border-emerald-900/40">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#5a9e2f]" />
              <h2 className="text-lg font-bold">Your Shopping Cart</h2>
              <span className="bg-[#5a9e2f] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#eef8ea] p-3.5 border-b border-emerald-200 text-xs">
            <div className="flex items-center justify-between mb-1.5 font-medium text-[#0d1b1e]">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#5a9e2f]" />
                {freeShippingRemaining > 0 ? (
                  <>
                    Add <strong className="text-[#5a9e2f]">₹{freeShippingRemaining.toFixed(0)}</strong> more for FREE Shipping!
                  </>
                ) : (
                  <span className="text-[#5a9e2f] font-bold">🎉 Congratulations! You qualify for FREE Delivery!</span>
                )}
              </span>
              <span className="font-bold text-slate-500">{progressPercentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#5a9e2f] h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-[#5a9e2f]">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold text-[#0d1b1e]">Your cart is empty</h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto">
                  Explore our collection of unique kids&apos; toys, nightlights, and mealtime essentials!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="inline-block py-2.5 px-6 rounded-full bg-[#5a9e2f] text-white font-bold text-sm hover:bg-[#488224] transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-4 p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs relative"
                >
                  {/* Thumbnail Image */}
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-slate-100 shrink-0 bg-slate-50">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#0d1b1e] line-clamp-1">{item.name}</h4>
                      {item.ageRange && (
                        <span className="text-[10px] text-emerald-800 bg-[#eef8ea] px-2 py-0.5 rounded font-semibold inline-block mt-0.5">
                          Age: {item.ageRange}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Price */}
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-bold text-[#0d1b1e]">₹{item.price}</span>
                        {item.compareAtPrice && item.compareAtPrice > item.price && (
                          <span className="text-xs text-slate-400 line-through">₹{item.compareAtPrice}</span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="p-1 hover:bg-slate-200 text-slate-600 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#0d1b1e]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="p-1 hover:bg-slate-200 text-slate-600 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-slate-400 hover:text-red-500 p-1 transition-colors self-start"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-slate-200 space-y-3">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#0d1b1e]">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-[#5a9e2f]">
                    {freeShippingRemaining === 0 ? 'FREE' : '₹70'}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#0d1b1e] pt-2 border-t border-slate-100">
                  <span>Total Payable</span>
                  <span className="text-lg text-[#0d1b1e]">
                    ₹{(subtotal + (freeShippingRemaining === 0 ? 0 : 70)).toFixed(2)}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3.5 px-4 bg-[#5a9e2f] hover:bg-[#488224] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all text-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
