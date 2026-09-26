'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function Navbar({ onOpenSearch }: { onOpenSearch?: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount, setIsCartOpen } = useCart();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'All Products', href: '/products' },
    { name: 'Learning Toys', href: '/products?category=learning-toys' },
    { name: 'Feeding', href: '/products?category=feeding-tableware' },
    { name: 'Nursery', href: '/products?category=nursery-lights' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-950/10 glass-nav transition-all">
      {/* Top Banner Strip */}
      <div className="bg-[#0d1b1e] text-emerald-100 text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#5a9e2f] animate-pulse" />
        <span>Free Shipping Across India on Orders Over ₹999! Code: <strong className="text-[#5a9e2f]">FREESHIP</strong></span>
        <span className="hidden md:inline-block text-[#5a9e2f]">• 100% Non-Toxic & Child-Safe Guarantee</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Tagline */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#5a9e2f] shadow-md group-hover:scale-105 transition-transform">
              <Image
                src="/logo.jpeg"
                alt="Findo Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-[#0d1b1e] leading-none flex items-center gap-1">
                findo<span className="w-2 h-2 rounded-full bg-[#5a9e2f] inline-block"></span>
              </span>
              <span className="text-[10px] tracking-wider text-[#576b70] font-semibold uppercase mt-0.5">
                Find What You Need
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors hover:text-[#5a9e2f] ${
                    isActive ? 'text-[#5a9e2f] font-bold underline underline-offset-4 decoration-2' : 'text-[#0d1b1e]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons (Search, Cart, Admin toggle, Mobile Menu) */}
          <div className="flex items-center gap-3">
            {/* Search Trigger Button */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-full hover:bg-emerald-100/50 text-[#0d1b1e] hover:text-[#5a9e2f] transition-all"
              title="Search products"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Admin Dashboard shortcut icon */}
            <Link
              href="/admin"
              className={`p-2.5 rounded-full transition-all text-xs font-semibold flex items-center gap-1.5 ${
                isAdminRoute
                  ? 'bg-[#0d1b1e] text-[#5a9e2f]'
                  : 'hover:bg-emerald-100/50 text-[#576b70] hover:text-[#0d1b1e]'
              }`}
              title="Admin Panel"
            >
              <UserCheck className="w-4 h-4" />
              <span className="hidden sm:inline-block">Admin</span>
            </Link>

            {/* Cart Button with Count Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-[#5a9e2f] text-white hover:bg-[#488224] transition-all shadow-sm hover:shadow-md flex items-center justify-center"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#0d1b1e] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#0d1b1e] hover:bg-emerald-100/50"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#ffffff] border-b border-emerald-900/10 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-lg text-base font-medium text-[#0d1b1e] hover:bg-[#eef8ea] hover:text-[#5a9e2f] transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold text-[#0d1b1e] bg-[#eef8ea] hover:bg-[#5a9e2f] hover:text-white transition-all"
            >
              <UserCheck className="w-4 h-4 text-[#5a9e2f]" />
              Go to Admin Panel
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
