import React from 'react';
import prisma from '@/lib/prisma';
import AdminLayout from '@/components/AdminLayout';
import { Mail, Phone, Clock, CheckCircle2 } from 'lucide-react';

export const revalidate = 0;

export default async function AdminQueriesPage() {
  const queries = await prisma.customerQuery.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="pb-4 border-b border-slate-200">
          <h1 className="text-2xl font-extrabold text-[#0d1b1e]">Customer Contact Messages</h1>
          <p className="text-xs text-slate-500">
            View messages submitted via the Contact Us form.
          </p>
        </div>

        <div className="space-y-4">
          {queries.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center text-slate-400 text-sm">
              No customer queries received yet.
            </div>
          ) : (
            queries.map((q) => (
              <div key={q.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-bold text-base text-[#0d1b1e]">{q.subject}</h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                      <span className="font-semibold text-[#0d1b1e]">{q.name}</span>
                      <span>•</span>
                      <span>{q.email}</span>
                      {q.phone && (
                        <>
                          <span>•</span>
                          <span>{q.phone}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {new Date(q.createdAt).toLocaleString()}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed bg-[#fafbf8] p-4 rounded-xl border border-slate-100">
                  {q.message}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
