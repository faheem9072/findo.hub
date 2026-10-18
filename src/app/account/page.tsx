'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Package, MapPin, LogOut, ArrowRight, Search, ShieldCheck } from 'lucide-react';

export default function AccountPage() {
  const [email, setEmail] = useState('');
  const [searchedEmail, setSearchedEmail] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    // Check localStorage for stored customer email
    const saved = localStorage.getItem('findo_customer_email');
    if (saved) {
      setEmail(saved);
      fetchOrders(saved);
    }
  }, []);

  const fetchOrders = async (targetEmail: string) => {
    if (!targetEmail.trim()) return;
    setLoading(true);
    setSearched(true);
    setSearchedEmail(targetEmail);
    try {
      const res = await fetch(`/api/orders?email=${encodeURIComponent(targetEmail.trim())}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
        localStorage.setItem('findo_customer_email', targetEmail.trim());
      }
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders(email);
  };

  const handleLogout = () => {
    localStorage.removeItem('findo_customer_email');
    setEmail('');
    setSearchedEmail('');
    setOrders([]);
    setSearched(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0d1b1e]">My Account</h1>
          <p className="text-xs text-slate-500 mt-1">
            Track your FINDO orders, manage delivery addresses, and view purchase history.
          </p>
        </div>

        {searchedEmail && (
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Switch Account / Logout</span>
          </button>
        )}
      </div>

      {!searchedEmail ? (
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-slate-200 space-y-6 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center mx-auto">
            <User className="w-6 h-6" />
          </div>
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-[#0d1b1e]">Lookup Your Orders</h2>
            <p className="text-xs text-slate-500">
              Enter the email address used during checkout to view your order history.
            </p>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. parent@example.com"
                className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5a9e2f]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#5a9e2f] hover:bg-[#488224] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
              <span>{loading ? 'Finding Orders...' : 'View Orders'}</span>
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-8">
          {/* User Profile Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0d1b1e] text-[#5a9e2f] font-bold text-base flex items-center justify-center">
                {searchedEmail[0].toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold text-[#0d1b1e] text-base">{searchedEmail}</h3>
                <span className="text-xs text-[#5a9e2f] font-semibold">Verified Customer Account</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/account/orders"
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#0d1b1e] text-xs font-bold rounded-lg transition-colors"
              >
                All Orders
              </Link>
            </div>
          </div>

          {/* Orders Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0d1b1e]">Recent Orders ({orders.length})</h2>
            </div>

            {loading ? (
              <div className="py-12 text-center text-xs text-slate-400">Loading orders...</div>
            ) : orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
                  >
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="font-extrabold text-base text-[#0d1b1e]">#{ord.orderNumber}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 font-bold text-[#0d1b1e]">
                          {ord.orderStatus}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold ${
                            ord.paymentStatus === 'PAID'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {ord.paymentStatus}
                        </span>
                      </div>
                      <p className="text-slate-500">
                        Placed on {new Date(ord.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })} • {ord.items?.length || 1} item(s)
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <span className="font-extrabold text-base text-[#5a9e2f]">₹{ord.totalAmount}</span>
                      <Link
                        href={`/account/orders/${ord.orderNumber}`}
                        className="py-2 px-4 rounded-lg bg-[#0d1b1e] hover:bg-[#182e33] text-white text-xs font-bold transition-colors inline-flex items-center gap-1"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500 space-y-3">
                <p>No past orders found for {searchedEmail}.</p>
                <Link
                  href="/shop"
                  className="inline-block py-2.5 px-5 bg-[#5a9e2f] text-white font-bold rounded-lg hover:bg-[#488224]"
                >
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
