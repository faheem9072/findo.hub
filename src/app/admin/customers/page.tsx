import React from 'react';
import prisma from '@/lib/prisma';
import AdminLayout from '@/components/AdminLayout';
import { Users, Mail, Phone, ShoppingBag } from 'lucide-react';

export const revalidate = 0;

export default async function AdminCustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { orders: true },
      },
      orders: {
        select: { totalAmount: true },
      },
    },
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="pb-4 border-b border-slate-200">
          <h1 className="text-2xl font-extrabold text-[#0d1b1e]">Customer Directory</h1>
          <p className="text-xs text-slate-500">View registered user accounts and order histories.</p>
        </div>

        {customers.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
            No registered customer accounts yet.
          </div>
        ) : (
          <>
            {/* Mobile View: Customer Cards */}
            <div className="md:hidden space-y-3">
              {customers.map((c) => {
                const totalSpent = c.orders.reduce((sum, o) => sum + o.totalAmount, 0);
                return (
                  <div key={c.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center font-bold text-xs">
                          {c.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-xs text-[#0d1b1e]">{c.name}</p>
                          <p className="text-[10px] text-slate-400">{c.email}</p>
                        </div>
                      </div>
                      <span className="font-extrabold text-[#5a9e2f] text-sm">₹{totalSpent.toFixed(2)}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-500 text-[11px] pt-2 border-t border-slate-100">
                      <span>{c._count.orders} orders placed</span>
                      {c.phone && (
                        <a href={`tel:${c.phone}`} className="text-[#5a9e2f] font-semibold hover:underline">
                          {c.phone}
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop View: Table */}
            <div className="hidden md:block bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                      <th className="p-4">Customer</th>
                      <th className="p-4">Contact</th>
                      <th className="p-4">Orders Placed</th>
                      <th className="p-4">Total Lifetime Spent</th>
                      <th className="p-4">Joined Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-[#0d1b1e]">
                    {customers.map((c) => {
                      const totalSpent = c.orders.reduce((sum, o) => sum + o.totalAmount, 0);
                      return (
                        <tr key={c.id} className="hover:bg-slate-50">
                          <td className="p-4 font-bold flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center font-bold text-xs">
                              {c.name[0]}
                            </div>
                            <span>{c.name}</span>
                          </td>
                          <td className="p-4 text-slate-600">
                            <div>{c.email}</div>
                            {c.phone && <div className="text-[10px] text-slate-400">{c.phone}</div>}
                          </td>
                          <td className="p-4 font-semibold">{c._count.orders} orders</td>
                          <td className="p-4 font-extrabold text-[#5a9e2f]">₹{totalSpent.toFixed(2)}</td>
                          <td className="p-4 text-slate-400">{new Date(c.createdAt).toLocaleDateString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
