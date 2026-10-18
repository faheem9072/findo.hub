import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, Package, ArrowRight, ShoppingBag, Truck } from 'lucide-react';
import prisma from '@/lib/prisma';

export const revalidate = 0;

interface OrderSuccessProps {
  searchParams: Promise<{ id?: string; orderNumber?: string }>;
}

export default async function OrderSuccessPage({ searchParams }: OrderSuccessProps) {
  const { id, orderNumber } = await searchParams;
  const lookupId = orderNumber || id;

  let order = null;
  if (lookupId) {
    order = await prisma.order.findFirst({
      where: {
        OR: [{ orderNumber: lookupId }, { id: lookupId }],
      },
      include: {
        items: true,
      },
    });
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 space-y-8">
      {/* Success Badge */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0d1b1e]">Order Confirmed!</h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Thank you for choosing FINDO! We’re preparing your order with care for delivery.
        </p>
      </div>

      {order ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4 text-xs">
            <div>
              <span className="text-slate-400 font-semibold block uppercase">Order ID</span>
              <span className="font-extrabold text-base text-[#0d1b1e]">#{order.orderNumber}</span>
            </div>

            <div>
              <span className="text-slate-400 font-semibold block uppercase">Payment Status</span>
              <span className="inline-block mt-0.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                {order.paymentStatus}
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-semibold block uppercase">Order Status</span>
              <span className="inline-block mt-0.5 px-3 py-1 rounded-full bg-slate-100 text-[#0d1b1e] font-bold">
                {order.orderStatus}
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-semibold block uppercase">Total Paid</span>
              <span className="font-extrabold text-base text-[#5a9e2f]">₹{order.totalAmount}</span>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-xs">
              <h3 className="font-bold text-[#0d1b1e] text-sm flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#5a9e2f]" />
                <span>Delivery Address</span>
              </h3>
              <p className="font-semibold text-[#0d1b1e]">{order.customerName}</p>
              <p className="text-slate-600">{order.address}</p>
              <p className="text-slate-600">
                {order.city}, {order.state} - {order.pincode}
              </p>
              <p className="text-slate-600">Phone: {order.customerPhone}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-xs">
              <h3 className="font-bold text-[#0d1b1e] text-sm flex items-center gap-1.5">
                <Package className="w-4 h-4 text-[#5a9e2f]" />
                <span>Customer Contact</span>
              </h3>
              <p className="text-slate-600">Email: {order.customerEmail}</p>
              <p className="text-slate-600">Payment Method: {order.paymentMethod}</p>
              <p className="text-slate-600">
                Date: {new Date(order.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
              </p>
            </div>
          </div>

          {/* Purchased Items */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="font-bold text-[#0d1b1e] text-sm">Order Summary</h3>
            <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
              {order.items.map((item) => (
                <div key={item.id} className="p-4 flex items-center gap-4 bg-white text-xs">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-50">
                    <Image src={item.productImage || '/logo.jpeg'} alt={item.productName} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-[#0d1b1e] truncate">{item.productName}</h4>
                    <span className="text-slate-400">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-extrabold text-[#0d1b1e]">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 shadow-xs">
          <p className="text-sm font-semibold text-slate-600">Your order has been placed successfully!</p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        {order && (
          <Link
            href={`/orders/${order.orderNumber}`}
            className="w-full sm:w-auto py-3.5 px-8 rounded-lg bg-[#0d1b1e] hover:bg-[#182e33] text-white font-bold text-sm text-center transition-colors"
          >
            View My Order
          </Link>
        )}
        <Link
          href="/shop"
          className="w-full sm:w-auto py-3.5 px-8 rounded-lg bg-[#5a9e2f] hover:bg-[#488224] text-white font-bold text-sm text-center transition-colors shadow-xs"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
