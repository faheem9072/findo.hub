'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Search, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function MobileBottomNav({ onOpenSearch }: { onOpenSearch?: () => void }) {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen } = useCart();

  // Hide on admin routes and checkout
  if (pathname.startsWith('/admin') || pathname === '/checkout') return null;

  const isHome = pathname === '/';
  const isShop = pathname.startsWith('/shop') || pathname.startsWith('/product');

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#070e10]/95 backdrop-blur-md border-t border-white/10 shadow-2xl px-2 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] transition-all text-white">
      <div className="grid grid-cols-5 items-center justify-around text-center max-w-md mx-auto">
        
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-colors ${
            isHome ? 'text-[#72bf44] font-black' : 'text-slate-400 hover:text-white font-medium'
          }`}
        >
          <div className="relative">
            <Home className="w-5 h-5" strokeWidth={isHome ? 2.5 : 2} />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight uppercase font-mono font-bold">Home</span>
        </Link>

        {/* Shop */}
        <Link
          href="/shop"
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-colors ${
            isShop ? 'text-[#72bf44] font-black' : 'text-slate-400 hover:text-white font-medium'
          }`}
        >
          <div className="relative">
            <Compass className="w-5 h-5" strokeWidth={isShop ? 2.5 : 2} />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight uppercase font-mono font-bold">Catalog</span>
        </Link>

        {/* Search */}
        <button
          onClick={onOpenSearch}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-400 hover:text-white font-medium transition-colors"
          aria-label="Search"
        >
          <Search className="w-5 h-5" strokeWidth={2} />
          <span className="text-[10px] mt-0.5 tracking-tight uppercase font-mono font-bold">Search</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-400 hover:text-white font-medium transition-colors relative"
          aria-label="Cart"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#5a9e2f] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-50">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight uppercase font-mono font-bold">Bag</span>
        </button>

        {/* WhatsApp Support */}
        <a
          href="https://wa.me/917025387764?text=Hello%20Findo%20Team!%20I%20have%20an%20enquiry%20about%20your%20products."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-400 hover:text-emerald-400 font-medium transition-colors"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-5 h-5 text-emerald-400" strokeWidth={2} />
          <span className="text-[10px] mt-0.5 tracking-tight uppercase font-mono font-bold text-emerald-400">Chat</span>
        </a>

      </div>
    </nav>
  );
}
