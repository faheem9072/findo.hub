'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Truck, CheckCircle2, PackageCheck, AlertCircle, RefreshCw, ArrowRight } from 'lucide-react';

export default function AdminRecentOrders({ initialOrders }: { initialOrders: any[] }) {
  const [orders, setOrders] = useState(initialOrders);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleStatusChange = async (orderId: string, orderNumber: string, newStatus: string) => {
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
        setToastMsg(`Order #${orderNumber} updated to ${newStatus}`);
        setTimeout(() => setToastMsg(null), 3500);
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

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'OUT_FOR_DELIVERY':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'SHIPPED':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'PROCESSING':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'CONFIRMED':
        return 'bg-sky-100 text-sky-800 border-sky-300';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-300';
    }
  };

  if (!orders || orders.length === 0) {
    return <p className="text-xs text-slate-400 text-center py-6">No orders placed yet.</p>;
  }

  return (
    <div className="space-y-3">
      {toastMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center justify-between shadow-xs animate-in fade-in duration-200">
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg(null)} className="text-emerald-500 hover:text-emerald-800 text-sm">
            ✕
          </button>
        </div>
      )}

      {/* Mobile View: Order Cards */}
      <div className="md:hidden space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="font-extrabold text-xs text-[#0d1b1e]">#{order.orderNumber}</span>
                <p className="text-[10px] text-slate-400">
                  {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </p>
              </div>

              {/* Status Select */}
              <select
                value={order.orderStatus}
                disabled={updatingId === order.id}
                onChange={(e) => handleStatusChange(order.id, order.orderNumber, e.target.value)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border focus:outline-none transition-all cursor-pointer ${getStatusBadgeClass(
                  order.orderStatus
                )}`}
              >
                <option value="PENDING">PENDING</option>
                <option value="CONFIRMED">CONFIRMED</option>
                <option value="PROCESSING">PROCESSING</option>
                <option value="SHIPPED">SHIPPED 🚚</option>
                <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY 🛵</option>
                <option value="DELIVERED">DELIVERED ✅</option>
                <option value="CANCELLED">CANCELLED ❌</option>
              </select>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600">
              <div>
                <p className="font-semibold text-[#0d1b1e]">{order.customerName}</p>
                <span className="text-[10px] text-slate-400">
                  {order.city} • {order.items?.length || 1} items
                </span>
              </div>
              <span className="font-extrabold text-[#5a9e2f] text-sm">
                ₹{order.totalAmount?.toFixed(2)}
              </span>
            </div>

            {/* Quick 1-Click Action Buttons */}
            <div className="flex items-center gap-1.5 pt-1 border-t border-slate-200/60">
              {order.orderStatus !== 'SHIPPED' && order.orderStatus !== 'DELIVERED' && order.orderStatus !== 'OUT_FOR_DELIVERY' && order.orderStatus !== 'CANCELLED' && (
                <button
                  type="button"
                  disabled={updatingId === order.id}
                  onClick={() => handleStatusChange(order.id, order.orderNumber, 'SHIPPED')}
                  className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] flex items-center gap-1 shadow-xs transition-colors"
                >
                  <Truck className="w-3 h-3" />
                  <span>Mark Shipped</span>
                </button>
              )}

              {order.orderStatus === 'SHIPPED' && (
                <button
                  type="button"
                  disabled={updatingId === order.id}
                  onClick={() => handleStatusChange(order.id, order.orderNumber, 'OUT_FOR_DELIVERY')}
                  className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] flex items-center gap-1 shadow-xs transition-colors"
                >
                  <PackageCheck className="w-3 h-3" />
                  <span>Out for Delivery</span>
                </button>
              )}

              {order.orderStatus === 'OUT_FOR_DELIVERY' && (
                <button
                  type="button"
                  disabled={updatingId === order.id}
                  onClick={() => handleStatusChange(order.id, order.orderNumber, 'DELIVERED')}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] flex items-center gap-1 shadow-xs transition-colors"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Mark Delivered</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View: Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
              <th className="pb-3">Order #</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Items</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Quick Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-[#0d1b1e]">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 font-bold">
                  <div>#{order.orderNumber}</div>
                  <span className="text-[10px] text-slate-400 font-normal">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </span>
                </td>
                <td className="py-3">
                  <div className="font-bold text-[#0d1b1e]">{order.customerName}</div>
                  <span className="text-[10px] text-slate-400">{order.city}</span>
                </td>
                <td className="py-3">{order.items?.length || 1} items</td>
                <td className="py-3 font-bold text-slate-900">₹{order.totalAmount?.toFixed(2)}</td>
                <td className="py-3">
                  <select
                    value={order.orderStatus}
                    disabled={updatingId === order.id}
                    onChange={(e) => handleStatusChange(order.id, order.orderNumber, e.target.value)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border focus:outline-none transition-all cursor-pointer ${getStatusBadgeClass(
                      order.orderStatus
                    )}`}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="SHIPPED">SHIPPED 🚚</option>
                    <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY 🛵</option>
                    <option value="DELIVERED">DELIVERED ✅</option>
                    <option value="CANCELLED">CANCELLED ❌</option>
                  </select>
                </td>
                <td className="py-3 text-right">
                  <div className="inline-flex items-center gap-1.5 justify-end">
                    {order.orderStatus !== 'SHIPPED' &&
                      order.orderStatus !== 'DELIVERED' &&
                      order.orderStatus !== 'OUT_FOR_DELIVERY' &&
                      order.orderStatus !== 'CANCELLED' && (
                        <button
                          type="button"
                          disabled={updatingId === order.id}
                          onClick={() => handleStatusChange(order.id, order.orderNumber, 'SHIPPED')}
                          className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] flex items-center gap-1 shadow-xs transition-colors"
                        >
                          <Truck className="w-3 h-3" />
                          <span>Shipped</span>
                        </button>
                      )}

                    {order.orderStatus === 'SHIPPED' && (
                      <button
                        type="button"
                        disabled={updatingId === order.id}
                        onClick={() => handleStatusChange(order.id, order.orderNumber, 'OUT_FOR_DELIVERY')}
                        className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] flex items-center gap-1 shadow-xs transition-colors"
                      >
                        <PackageCheck className="w-3 h-3" />
                        <span>Out for Delivery</span>
                      </button>
                    )}

                    {order.orderStatus === 'OUT_FOR_DELIVERY' && (
                      <button
                        type="button"
                        disabled={updatingId === order.id}
                        onClick={() => handleStatusChange(order.id, order.orderNumber, 'DELIVERED')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] flex items-center gap-1 shadow-xs transition-colors"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Delivered</span>
                      </button>
                    )}

                    {order.orderStatus === 'DELIVERED' && (
                      <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Completed</span>
                      </span>
                    )}

                    {order.orderStatus === 'CANCELLED' && (
                      <span className="text-[10px] font-bold text-red-500">
                        Cancelled
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
