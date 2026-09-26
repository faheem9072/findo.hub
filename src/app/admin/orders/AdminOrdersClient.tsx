'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, ChevronDown, MapPin, Phone, Mail, Package, Check, RefreshCw } from 'lucide-react';

export default function AdminOrdersClient({ initialOrders }: { initialOrders: any[] }) {
  const [orders, setOrders] = useState(initialOrders);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'ALL' || o.orderStatus === statusFilter;
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
      o.customerPhone.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus: newStatus }),
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
        );
      } else {
        alert('Failed to update order status');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating order status');
    } finally {
      setUpdatingId(null);
    }
  };

  const statuses = ['ALL', 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0d1b1e]">Order Fulfillment Manager</h1>
          <p className="text-xs text-slate-500">
            Track customer purchases and update dispatch status live in the database.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">
            Total Orders: <strong className="text-[#0d1b1e]">{filteredOrders.length}</strong>
          </span>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                statusFilter === st
                  ? 'bg-[#0d1b1e] text-[#5a9e2f] shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search order number, customer name, email, or phone..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#5a9e2f]"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#0d1b1e] text-white font-bold uppercase tracking-wider">
                <th className="py-4 px-6">Order #</th>
                <th className="py-4 px-4">Customer Details</th>
                <th className="py-4 px-4">Shipping Address</th>
                <th className="py-4 px-4">Purchased Items</th>
                <th className="py-4 px-4">Payment</th>
                <th className="py-4 px-6 text-right">Order Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-[#0d1b1e]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    No orders match the selected filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-sm text-[#0d1b1e]">
                      <div>{o.orderNumber}</div>
                      <span className="text-[10px] text-slate-400 font-normal">
                        {new Date(o.createdAt).toLocaleDateString()}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-bold text-[#0d1b1e]">{o.customerName}</div>
                      <div className="text-[11px] text-slate-500">{o.customerEmail}</div>
                      <div className="text-[11px] text-slate-500">{o.customerPhone}</div>
                    </td>

                    <td className="py-4 px-4 max-w-xs">
                      <p className="truncate text-slate-700">{o.address}</p>
                      <p className="text-slate-500">{o.city}, {o.state} - {o.pincode}</p>
                    </td>

                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        {o.items.map((item: any) => (
                          <div key={item.id} className="flex items-center gap-1.5 text-[11px]">
                            <span className="font-bold text-[#5a9e2f]">{item.quantity}x</span>
                            <span className="truncate max-w-[140px] text-slate-700">{item.productName}</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-extrabold text-sm text-[#0d1b1e]">₹{o.totalAmount.toFixed(2)}</div>
                      <div className="text-[10px] uppercase font-bold text-slate-500">
                        {o.paymentMethod} ({o.paymentStatus})
                      </div>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <select
                        value={o.orderStatus}
                        disabled={updatingId === o.id}
                        onChange={(e) => handleStatusChange(o.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none transition-all cursor-pointer ${
                          o.orderStatus === 'DELIVERED'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : o.orderStatus === 'SHIPPED'
                            ? 'bg-blue-100 text-blue-800 border-blue-300'
                            : o.orderStatus === 'PROCESSING'
                            ? 'bg-purple-100 text-purple-800 border-purple-300'
                            : o.orderStatus === 'CANCELLED'
                            ? 'bg-red-100 text-red-700 border-red-300'
                            : 'bg-amber-100 text-amber-800 border-amber-300'
                        }`}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="PROCESSING">PROCESSING</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
