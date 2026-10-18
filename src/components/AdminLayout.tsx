'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  MessageSquare,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Tag,
  Users,
  Settings,
  Menu,
  X,
  Store,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Verify admin token session
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/auth');
        if (!res.ok) {
          if (pathname !== '/admin/login') {
            router.push('/admin/login');
          }
        } else {
          const data = await res.json();
          setAdminUser(data.admin);
        }
      } catch (err) {
        if (pathname !== '/admin/login') router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [pathname, router]);

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1b1e] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#5a9e2f] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-bold tracking-wider uppercase text-slate-300">Authenticating Findo Admin...</span>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products Catalog', href: '/admin/products', icon: Package },
    { name: 'Orders Manager', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Categories', href: '/admin/categories', icon: ShieldCheck },
    { name: 'Coupons', href: '/admin/coupons', icon: Tag },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Reviews', href: '/admin/reviews', icon: MessageSquare },
    { name: 'Store Settings', href: '/admin/settings', icon: Settings },
    { name: 'Customer Queries', href: '/admin/queries', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* ─── MOBILE TOPBAR (Visible only on mobile) ─── */}
      <header className="md:hidden sticky top-0 z-40 bg-[#0d1b1e] text-white px-4 py-3 flex items-center justify-between border-b border-emerald-950/40 shadow-sm">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#5a9e2f]">
            <Image src="/logo.jpeg" alt="Findo Admin" fill className="object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-extrabold text-white leading-tight">Findo Admin</span>
            <span className="text-[9px] text-[#5a9e2f] font-semibold">Store Manager</span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
            title="View Store"
          >
            <Store className="w-4 h-4 text-[#5a9e2f]" />
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg bg-white/10 text-slate-200 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* ─── MOBILE SLIDE-OVER DRAWER (Visible when mobileOpen is true) ─── */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Sidebar */}
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-[#0d1b1e] text-white flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-250 z-50">
            <div>
              {/* Drawer Header */}
              <div className="p-4 px-5 border-b border-emerald-900/40 flex items-center justify-between">
                <Link href="/admin" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#5a9e2f]">
                    <Image src="/logo.jpeg" alt="Findo Admin" fill className="object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">Findo Admin</span>
                    <span className="text-[9px] text-[#5a9e2f] font-medium">Control Panel</span>
                  </div>
                </Link>

                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-170px)] custom-scrollbar">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-[#5a9e2f] text-white shadow-sm'
                          : 'text-slate-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Mobile Drawer Footer */}
            <div className="p-4 border-t border-emerald-900/40 space-y-2.5 bg-black/20 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <Link
                href="/"
                target="_blank"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white"
              >
                <span>View Storefront</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#5a9e2f]" />
              </Link>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#5a9e2f] text-white font-bold text-xs flex items-center justify-center">
                    {adminUser?.name?.[0] || 'A'}
                  </div>
                  <div className="text-[11px] truncate max-w-[120px]">
                    <p className="font-bold text-white truncate">{adminUser?.name || 'Admin'}</p>
                    <p className="text-slate-400 text-[9px] truncate">{adminUser?.email}</p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                  title="Log Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-2 text-center text-[10px] text-slate-500 border-t border-white/5">
                Designed &amp; Developed by <span className="text-[#5a9e2f] font-semibold">KORE</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── DESKTOP SIDEBAR (Visible only on Laptop/Desktop) ─── */}
      <aside className="hidden md:flex md:w-64 md:h-screen md:sticky md:top-0 bg-[#0d1b1e] text-white shrink-0 flex-col justify-between border-r border-emerald-950/40 z-30">
        <div className="flex-1 flex flex-col min-h-0">
          {/* Header Branding */}
          <div className="p-6 border-b border-emerald-900/40 flex items-center justify-between shrink-0">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-[#5a9e2f]">
                <Image src="/logo.jpeg" alt="Findo Admin" fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white leading-none">Findo Admin</span>
                <span className="text-[10px] text-[#5a9e2f] font-semibold mt-0.5">Store Management</span>
              </div>
            </Link>
          </div>

          {/* Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto flex-1 custom-scrollbar">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#5a9e2f] text-white shadow-md'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Actions Footer */}
        <div className="p-4 border-t border-emerald-900/40 space-y-3 shrink-0 bg-black/10">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <span>View Live Storefront</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#5a9e2f]" />
          </Link>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#5a9e2f] text-white font-bold text-xs flex items-center justify-center">
                {adminUser?.name?.[0] || 'A'}
              </div>
              <div className="text-[11px] truncate max-w-[110px]">
                <p className="font-bold text-white truncate">{adminUser?.name || 'Admin'}</p>
                <p className="text-slate-400 text-[9px] truncate">{adminUser?.email}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-red-400 transition-colors rounded-lg hover:bg-white/5"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-2 text-center text-[10px] text-slate-500 border-t border-white/5">
            Designed &amp; Developed by <span className="text-[#5a9e2f] font-semibold">KORE</span>
          </div>
        </div>
      </aside>

      {/* ─── MAIN ADMIN CONTENT VIEW ─── */}
      <main className="flex-1 min-w-0 bg-slate-100 min-h-screen p-3.5 sm:p-6 lg:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
