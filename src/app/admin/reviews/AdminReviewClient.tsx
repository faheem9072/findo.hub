'use client';

import React, { useState } from 'react';
import { Star, CheckCircle2, XCircle, Trash2, ShieldCheck } from 'lucide-react';

export default function AdminReviewClient({ initialReviews }: { initialReviews: any[] }) {
  const [reviews, setReviews] = useState(initialReviews);

  const toggleApproval = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isApproved: !current }),
      });
      if (res.ok) {
        setReviews(reviews.map((r) => (r.id === id ? { ...r, isApproved: !current } : r)));
      }
    } catch {
      alert('Failed to update review status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this review permanently?')) return;
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setReviews(reviews.filter((r) => r.id !== id));
      }
    } catch {
      alert('Failed to delete review');
    }
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-extrabold text-[#0d1b1e]">Customer Reviews Moderation</h1>
        <p className="text-xs text-slate-500">Approve, reject, or delete submitted customer product reviews.</p>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
          No customer reviews submitted yet.
        </div>
      ) : (
        <>
          {/* Mobile View: Review Cards */}
          <div className="md:hidden space-y-3">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-bold text-xs text-[#0d1b1e] line-clamp-1">
                      {rev.product?.name || 'Product'}
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < rev.rating ? 'fill-amber-400' : 'text-slate-200'}`}
                          />
                        ))}
                      </div>
                      {rev.isVerifiedPurchase && (
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => toggleApproval(rev.id, rev.isApproved)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 ${
                      rev.isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {rev.isApproved ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    <span>{rev.isApproved ? 'Approved' : 'Pending'}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  {rev.comment}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                  <span className="font-semibold text-slate-600">{rev.customerName}</span>
                  <button
                    onClick={() => handleDelete(rev.id)}
                    className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                    title="Delete Review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View: Table */}
          <div className="hidden md:block bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="p-4">Product</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Rating & Comment</th>
                    <th className="p-4">Verified</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-[#0d1b1e]">
                  {reviews.map((rev) => (
                    <tr key={rev.id} className="hover:bg-slate-50">
                      <td className="p-4 font-bold max-w-[150px] truncate">{rev.product?.name || 'Product'}</td>
                      <td className="p-4">
                        <div className="font-bold">{rev.customerName}</div>
                        <div className="text-[10px] text-slate-400">{rev.customerEmail}</div>
                      </td>
                      <td className="p-4 max-w-xs space-y-1">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400' : 'text-slate-200'}`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-2">{rev.comment}</p>
                      </td>
                      <td className="p-4">
                        {rev.isVerifiedPurchase ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <ShieldCheck className="w-3 h-3" /> Verified
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400">Guest</span>
                        )}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleApproval(rev.id, rev.isApproved)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            rev.isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {rev.isApproved ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          <span>{rev.isApproved ? 'Approved' : 'Pending'}</span>
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDelete(rev.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
