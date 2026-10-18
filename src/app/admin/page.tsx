import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import AdminLayout from '@/components/AdminLayout';
import {
  IndianRupee,
  ShoppingBag,
  Package,
  MessageSquare,
  ArrowRight,
  Plus,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';

export const revalidate = 0; // Dynamic route

async function getDashboardData() {
  const [totalOrders, orders, products, lowStockProducts, queries] = await Promise.all([
    prisma.order.count(),
    prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { items: true },
    }),
    prisma.product.count(),
    prisma.product.findMany({
      where: { stock: { lte: 20 } },
      orderBy: { stock: 'asc' },
      take: 4,
    }),
    prisma.customerQuery.count(),
  ]);

  const totalRevenue = (
    await prisma.order.aggregate({
      _sum: { totalAmount: true },
    })
  )._sum.totalAmount || 0;

  return {
    totalOrders,
    orders,
    products,
    lowStockProducts,
    queries,
    totalRevenue,
  };
}

export default async function AdminDashboardPage() {
  const { totalOrders, orders, products, lowStockProducts, queries, totalRevenue } =
    await getDashboardData();

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header Title & Quick Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0d1b1e]">Store Analytics Overview</h1>
            <p className="text-xs text-slate-500">
              Real-time summary of sales, orders, inventory, and customer messages.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/products/new"
              className="py-2.5 px-4 rounded-xl bg-[#5a9e2f] hover:bg-[#488224] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </Link>
          </div>
        </div>

        {/* Metrics Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {/* Revenue */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Revenue</span>
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-100 text-[#5a9e2f] flex items-center justify-center">
                <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="text-lg sm:text-2xl font-extrabold text-[#0d1b1e]">₹{totalRevenue.toFixed(0)}</div>
            <p className="text-[10px] sm:text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span className="hidden sm:inline">Live Sales</span>
            </p>
          </div>

          {/* Orders */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Orders</span>
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="text-lg sm:text-2xl font-extrabold text-[#0d1b1e]">{totalOrders}</div>
            <Link href="/admin/orders" className="text-[10px] sm:text-[11px] text-blue-600 font-bold hover:underline inline-block truncate">
              Manage Orders →
            </Link>
          </div>

          {/* Active Products */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Products</span>
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <Package className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="text-lg sm:text-2xl font-extrabold text-[#0d1b1e]">{products}</div>
            <Link href="/admin/products" className="text-[10px] sm:text-[11px] text-purple-600 font-bold hover:underline inline-block truncate">
              Catalog List →
            </Link>
          </div>

          {/* Customer Queries */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Messages</span>
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="text-lg sm:text-2xl font-extrabold text-[#0d1b1e]">{queries}</div>
            <Link href="/admin/queries" className="text-[10px] sm:text-[11px] text-amber-600 font-bold hover:underline inline-block truncate">
              View Queries →
            </Link>
          </div>
        </div>

        {/* Low Stock Alerts & Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Recent Orders Section */}
          <div className="lg:col-span-8 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-[#0d1b1e]">Recent Orders</h2>
              <Link href="/admin/orders" className="text-xs font-bold text-[#5a9e2f] hover:underline">
                View All Orders
              </Link>
            </div>

            {orders.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">No orders placed yet.</p>
            ) : (
              <>
                {/* Mobile View: Order Cards */}
                <div className="md:hidden space-y-3">
                  {orders.map((order) => (
                    <div key={order.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#0d1b1e]">{order.orderNumber}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            order.orderStatus === 'DELIVERED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : order.orderStatus === 'SHIPPED'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <div>
                          <p className="font-semibold text-[#0d1b1e]">{order.customerName}</p>
                          <span className="text-[10px] text-slate-400">{order.city} • {order.items.length} items</span>
                        </div>
                        <span className="font-extrabold text-[#5a9e2f] text-sm">₹{order.totalAmount.toFixed(2)}</span>
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
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-[#0d1b1e]">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 font-bold">{order.orderNumber}</td>
                          <td className="py-3">
                            <div>{order.customerName}</div>
                            <span className="text-[10px] text-slate-400">{order.city}</span>
                          </td>
                          <td className="py-3">{order.items.length} items</td>
                          <td className="py-3 font-bold">₹{order.totalAmount.toFixed(2)}</td>
                          <td className="py-3">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                order.orderStatus === 'DELIVERED'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : order.orderStatus === 'SHIPPED'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {order.orderStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>

          {/* Low Stock Alerts */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-[#0d1b1e] flex items-center gap-2 pb-3 border-b border-slate-100">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Stock Status Watch</span>
            </h2>

            <div className="space-y-3">
              {lowStockProducts.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div className="min-w-0 pr-2">
                    <h4 className="font-bold text-[#0d1b1e] truncate">{p.name}</h4>
                    <span className="text-[10px] text-slate-400">Price: ₹{p.price}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 ${
                    p.stock <= 5 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {p.stock} in stock
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
