'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function Navbar({ onOpenSearch }: { onOpenSearch?: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount, setIsCartOpen } = useCart();

  const navLinks = [
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* FINDO Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#5a9e2f]/30 shadow-xs">
              <Image
                src="/logo.jpeg"
                alt="FINDO Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0d1b1e] leading-none">
                FINDO<span className="text-[#5a9e2f]">.</span>
              </span>
              <span className="text-[9px] tracking-wider text-slate-400 font-medium uppercase mt-0.5 hidden sm:block">
                Find What You Need
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-[#5a9e2f] ${
                    isActive ? 'text-[#5a9e2f] font-semibold' : 'text-[#0d1b1e]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-slate-700 hover:text-[#5a9e2f] hover:bg-slate-50 rounded-full transition-all"
              aria-label="Search products"
              title="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Icon */}
            <Link
              href="/account"
              className="p-2.5 text-slate-700 hover:text-[#5a9e2f] hover:bg-slate-50 rounded-full transition-all hidden sm:flex items-center gap-1"
              aria-label="My Account"
              title="My Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart Icon with Live Count */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-slate-800 hover:text-[#5a9e2f] hover:bg-slate-50 rounded-full transition-all flex items-center justify-center"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#5a9e2f] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 text-slate-800 hover:bg-slate-50 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-6 py-6 space-y-4 shadow-xl">
          <Link
            href="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-[#0d1b1e] hover:text-[#5a9e2f]"
          >
            Shop All Products
          </Link>
          <Link
            href="/account"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-[#0d1b1e] hover:text-[#5a9e2f]"
          >
            My Account & Orders
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-[#0d1b1e] hover:text-[#5a9e2f]"
          >
            About FINDO
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-[#0d1b1e] hover:text-[#5a9e2f]"
          >
            Contact & Support
          </Link>
          <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
            <span>FINDO • Find What You Need</span>
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="underline hover:text-[#5a9e2f]">
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
