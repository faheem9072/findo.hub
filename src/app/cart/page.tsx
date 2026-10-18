'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    freeShippingThreshold,
    freeShippingRemaining,
  } = useCart();

  const shippingFee = freeShippingRemaining === 0 ? 0 : 79;
  const finalTotal = subtotal + shippingFee;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-[#0d1b1e]">Your Cart is Empty</h1>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          Explore our collection of habit trackers, wooden puzzles, and STEM blocks for your children.
        </p>
        <div>
          <Link
            href="/shop"
            className="inline-block py-3.5 px-8 rounded-lg bg-[#5a9e2f] hover:bg-[#488224] text-white font-bold text-sm transition-colors shadow-xs"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <h1 className="text-3xl font-extrabold text-[#0d1b1e]">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-xs overflow-hidden">
            {cart.map((item) => (
              <div key={item.productId} className="p-4 sm:p-6 flex gap-4 sm:gap-6 items-center">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-slate-50">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <Link
                    href={`/product/${item.slug}`}
                    className="font-bold text-[#0d1b1e] hover:text-[#5a9e2f] text-sm sm:text-base line-clamp-1"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs text-slate-400">Price: ₹{item.price}</p>

                  <div className="flex items-center gap-3 pt-2">
                    <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden text-xs">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="p-1.5 text-slate-600 hover:bg-slate-100"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 font-bold text-[#0d1b1e]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="p-1.5 text-slate-600 hover:bg-slate-100"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-extrabold text-sm sm:text-base text-[#0d1b1e]">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2">
            <Link href="/shop" className="text-xs font-bold text-[#5a9e2f] hover:underline">
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
            <h2 className="text-lg font-extrabold text-[#0d1b1e]">Order Summary</h2>

            {freeShippingRemaining > 0 ? (
              <div className="p-3 bg-[#fafbf8] rounded-xl border border-slate-200 text-xs text-slate-600">
                Add <strong className="text-[#5a9e2f]">₹{freeShippingRemaining}</strong> more to qualify for <strong>FREE Shipping</strong>!
              </div>
            ) : (
              <div className="p-3 bg-[#eef8ea] rounded-xl border border-emerald-200 text-xs text-emerald-800 font-bold">
                🎉 You&apos;ve unlocked FREE Shipping!
              </div>
            )}

            <div className="space-y-3 border-t border-slate-100 pt-4 text-xs font-medium text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-[#0d1b1e]">₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="font-bold text-[#0d1b1e]">
                  {shippingFee === 0 ? <span className="text-[#5a9e2f]">FREE</span> : `₹${shippingFee}`}
                </span>
              </div>

              <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-extrabold text-[#0d1b1e]">
                <span>Total Amount</span>
                <span className="text-[#5a9e2f]">₹{finalTotal}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full py-4 rounded-xl bg-[#5a9e2f] hover:bg-[#488224] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 text-[#5a9e2f]" />
              <span>100% Secure Checkout via Razorpay</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
