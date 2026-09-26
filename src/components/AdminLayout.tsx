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
  Menu,
  X,
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
    { name: 'Customer Queries', href: '/admin/queries', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#0d1b1e] text-white shrink-0 flex flex-col justify-between border-r border-emerald-950/40">
        <div>
          {/* Header Branding */}
          <div className="p-6 border-b border-emerald-900/40 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-[#5a9e2f]">
                <Image src="/logo.jpeg" alt="Findo Admin" fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white leading-none">Findo Admin</span>
                <span className="text-[10px] text-[#5a9e2f] font-semibold">Store Management</span>
              </div>
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-slate-300 hover:text-white"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Links */}
          <nav className={`p-4 space-y-1.5 ${mobileOpen ? 'block' : 'hidden md:block'}`}>
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#5a9e2f] text-white shadow-md'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Actions Footer */}
        <div className="p-4 border-t border-emerald-900/40 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <span>View Live Storefront</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#5a9e2f]" />
          </Link>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#5a9e2f] text-white font-bold text-xs flex items-center justify-center">
                {adminUser?.name?.[0] || 'A'}
              </div>
              <div className="text-[11px] truncate max-w-[100px]">
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
        </div>
      </aside>

      {/* Main Admin View Content */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
