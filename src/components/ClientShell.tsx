'use client';

import React, { useState } from 'react';
import { CartProvider } from '@/lib/cart-context';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import SearchModal from '@/components/SearchModal';
import MobileBottomNav from '@/components/MobileBottomNav';
import { usePathname } from 'next/navigation';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  const isAdminPage = pathname.startsWith('/admin');

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col justify-between selection:bg-[#5a9e2f] selection:text-white">
        {!isAdminPage && <Navbar onOpenSearch={() => setIsSearchOpen(true)} />}

        <main className={`flex-1 ${!isAdminPage ? 'pb-18 md:pb-0' : ''}`}>{children}</main>

        {!isAdminPage && <Footer />}

        {!isAdminPage && <MobileBottomNav onOpenSearch={() => setIsSearchOpen(true)} />}

        <CartDrawer />
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </div>
    </CartProvider>
  );
}
