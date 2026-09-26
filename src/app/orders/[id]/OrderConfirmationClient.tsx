'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Clock,
  Printer,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function OrderConfirmationClient({ order }: { order: any }) {
  useEffect(() => {
    // Trigger celebratory confetti on client mount
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#5a9e2f', '#0d1b1e', '#72bf44', '#f8f9fa'],
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const steps = [
    { title: 'Order Placed', active: true, done: true },
    { title: 'Processing', active: order.orderStatus !== 'PENDING', done: ['PROCESSING', 'SHIPPED', 'DELIVERED'].includes(order.orderStatus) },
    { title: 'Shipped', active: ['SHIPPED', 'DELIVERED'].includes(order.orderStatus), done: ['SHIPPED', 'DELIVERED'].includes(order.orderStatus) },
    { title: 'Delivered', active: order.orderStatus === 'DELIVERED', done: order.orderStatus === 'DELIVERED' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header Banner */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-4 relative overflow-hidden">
        <div className="w-16 h-16 bg-[#eef8ea] text-[#5a9e2f] rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-[#5a9e2f] uppercase tracking-widest bg-[#eef8ea] px-3.5 py-1 rounded-full">
            Order Confirmed!
          </span>
          <h1 className="text-3xl font-extrabold text-[#0d1b1e] pt-2">
            Thank You, {order.customerName}!
          </h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            We have received your order <strong className="text-[#0d1b1e]">{order.orderNumber}</strong>. A confirmation email and tracking updates will be sent to <strong>{order.customerEmail}</strong>.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <button
            onClick={handlePrint}
            className="py-2.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0d1b1e] font-bold text-xs flex items-center gap-2 transition-colors print:hidden"
          >
            <Printer className="w-4 h-4" />
            <span>Print Invoice</span>
          </button>
          <Link
            href="/products"
            className="py-2.5 px-5 rounded-xl bg-[#5a9e2f] hover:bg-[#488224] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all print:hidden"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>

      {/* Fulfillment Status Tracker */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#0d1b1e] uppercase tracking-wider flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#5a9e2f]" />
          <span>Fulfillment Progress Status</span>
        </h3>

        <div className="grid grid-cols-4 gap-2 pt-2">
          {steps.map((step, idx) => (
            <div key={idx} className="space-y-2 text-center">
              <div
                className={`h-2.5 rounded-full transition-all ${
                  step.done ? 'bg-[#5a9e2f]' : step.active ? 'bg-[#5a9e2f]/50' : 'bg-slate-200'
                }`}
              />
              <span className={`text-[11px] font-bold ${step.done ? 'text-[#0d1b1e]' : 'text-slate-400'}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Customer & Address Details */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-[#0d1b1e] uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
            <MapPin className="w-4 h-4 text-[#5a9e2f]" />
            <span>Delivery Address</span>
          </h3>

          <div className="space-y-2 text-xs text-slate-600">
            <p className="font-bold text-sm text-[#0d1b1e]">{order.customerName}</p>
            <p>{order.address}</p>
            <p>{order.city}, {order.state} - {order.pincode}</p>
            <p className="pt-2 border-t border-slate-100">
              <strong>Phone:</strong> {order.customerPhone}
            </p>
            <p>
              <strong>Email:</strong> {order.customerEmail}
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[#0d1b1e]">
              <span>Payment Mode:</span>
              <strong className="text-[#5a9e2f] uppercase">{order.paymentMethod} ({order.paymentStatus})</strong>
            </div>
          </div>
        </div>

        {/* Order Items Breakdown */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-[#0d1b1e] uppercase tracking-wider flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="flex items-center gap-2">
              <Package className="w-4 h-4 text-[#5a9e2f]" />
              <span>Purchased Items</span>
            </span>
            <span className="text-xs text-[#5a9e2f]">{order.items.length} items</span>
          </h3>

          <div className="space-y-3">
            {order.items.map((item: any) => (
              <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-50">
                    <Image src={item.productImage || '/logo.jpeg'} alt={item.productName} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0d1b1e]">{item.productName}</h4>
                    <span className="text-slate-400">Qty: {item.quantity}</span>
                  </div>
                </div>
                <span className="font-bold text-[#0d1b1e]">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 space-y-1 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal:</span>
              <span className="font-bold text-[#0d1b1e]">₹{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Shipping Fee:</span>
              <span className="font-bold text-[#5a9e2f]">
                {order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}
              </span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-[#0d1b1e] pt-2 border-t border-slate-100">
              <span>Total Paid:</span>
              <span className="text-[#0d1b1e]">₹{order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
