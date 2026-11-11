'use client';

import React, { useState, useEffect } from 'react';
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
  XCircle,
  AlertTriangle,
  MessageCircle,
  Check,
  ChevronRight,
  Calendar,
} from 'lucide-react';

export default function OrderConfirmationClient({ order: initialOrder }: { order: any }) {
  const [order, setOrder] = useState(initialOrder);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('Ordered by mistake');
  const [cancelNote, setCancelNote] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelSuccessMsg, setCancelSuccessMsg] = useState('');
  const [cancelErrorMsg, setCancelErrorMsg] = useState('');

  const isCancelled = order.orderStatus === 'CANCELLED';
  const isDelivered = order.orderStatus === 'DELIVERED';
  const isShipped = ['SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED'].includes(order.orderStatus);
  const isOutForDelivery = ['OUT_FOR_DELIVERY', 'DELIVERED'].includes(order.orderStatus);

  // Can cancel if not delivered and not already cancelled
  const canCancel = !isDelivered && !isCancelled;

  useEffect(() => {
    // Only celebrate with confetti if newly placed and not cancelled
    if (!isCancelled && (order.orderStatus === 'PENDING' || order.orderStatus === 'CONFIRMED')) {
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#5a9e2f', '#0d1b1e', '#72bf44', '#f8f9fa'],
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, [isCancelled, order.orderStatus]);

  const handlePrint = () => {
    window.print();
  };

  const handleCancelOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCancelling(true);
    setCancelErrorMsg('');
    try {
      const res = await fetch(`/api/orders/${order.id}/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reason: cancelReason,
          note: cancelNote,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setOrder(data.order);
        setIsCancelModalOpen(false);
        setCancelSuccessMsg('Your order has been cancelled successfully.');
      } else {
        setCancelErrorMsg(data.error || 'Failed to cancel order. Please contact support.');
      }
    } catch (err: any) {
      console.error('Cancel order error:', err);
      setCancelErrorMsg('Network error. Please try again or chat with us on WhatsApp.');
    } finally {
      setIsCancelling(false);
    }
  };

  // Calculate estimated delivery date: 3 to 5 days from order creation
  const orderDate = new Date(order.createdAt);
  const estDeliveryStart = new Date(orderDate);
  estDeliveryStart.setDate(estDeliveryStart.getDate() + 3);
  const estDeliveryEnd = new Date(orderDate);
  estDeliveryEnd.setDate(estDeliveryEnd.getDate() + 5);

  const deliveryWindow = `${estDeliveryStart.toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
  })} - ${estDeliveryEnd.toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })}`;

  // Flipkart-style 4-step milestones
  const steps = [
    {
      id: 'ordered',
      title: 'Order Confirmed',
      desc: orderDate.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      active: true,
      done: true,
    },
    {
      id: 'shipped',
      title: 'Shipped',
      desc: isShipped ? 'Dispatched from hub' : 'Packing in warehouse',
      active: isShipped,
      done: isShipped,
    },
    {
      id: 'out',
      title: 'Out for Delivery',
      desc: isOutForDelivery ? 'With courier partner' : 'Scheduled soon',
      active: isOutForDelivery,
      done: isOutForDelivery,
    },
    {
      id: 'delivered',
      title: 'Delivered',
      desc: isDelivered ? 'Delivered successfully' : `Est: ${deliveryWindow}`,
      active: isDelivered,
      done: isDelivered,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Cancellation Notice Banner if just cancelled */}
      {cancelSuccessMsg && (
        <div className="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl text-rose-900 text-sm flex items-start gap-3 shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-rose-900">Order Cancelled Successfully</p>
            <p className="text-xs text-rose-700 mt-0.5">
              {order.paymentMethod === 'RAZORPAY'
                ? 'Your refund has been initiated and will reflect in your original payment method in 3-5 business days.'
                : 'No payment was collected since this was a Cash on Delivery order.'}
            </p>
          </div>
        </div>
      )}

      {/* 1. HEADER BANNER */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm text-center space-y-4 relative overflow-hidden">
        {/* Status Avatar */}
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-inner ${
            isCancelled
              ? 'bg-rose-100 text-rose-600'
              : isDelivered
              ? 'bg-emerald-100 text-emerald-600'
              : 'bg-[#eef8ea] text-[#5a9e2f]'
          }`}
        >
          {isCancelled ? (
            <XCircle className="w-10 h-10" />
          ) : isDelivered ? (
            <CheckCircle2 className="w-10 h-10" />
          ) : (
            <CheckCircle2 className="w-10 h-10" />
          )}
        </div>

        <div className="space-y-1.5">
          <span
            className={`text-xs font-black uppercase tracking-widest px-3.5 py-1 rounded-full inline-block ${
              isCancelled
                ? 'bg-rose-100 text-rose-800 border border-rose-200'
                : isDelivered
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                : isShipped
                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                : 'bg-[#eef8ea] text-[#3d701e] border border-[#5a9e2f]/20'
            }`}
          >
            {isCancelled ? 'Order Cancelled' : isDelivered ? 'Delivered' : isShipped ? 'In Transit / Shipped' : 'Order Confirmed'}
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0d1b1e] pt-1">
            {isCancelled ? 'Order Was Cancelled' : `Thank You, ${order.customerName}!`}
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Order Reference: <strong className="text-[#0d1b1e]">#{order.orderNumber}</strong> • Updates sent to <strong>{order.customerEmail}</strong>.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap justify-center items-center gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="py-2.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0d1b1e] font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Invoice</span>
          </button>

          {/* Cancel Order Button (Active when eligible) */}
          {canCancel && (
            <button
              onClick={() => setIsCancelModalOpen(true)}
              className="py-2.5 px-5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs hover:scale-102"
            >
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>Cancel Order</span>
            </button>
          )}

          <Link
            href="/shop"
            className="py-2.5 px-5 rounded-xl bg-[#5a9e2f] hover:bg-[#488224] text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>

      {/* 2. FLIPKART-STYLE ORDER TRACKING TIMELINE */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <h2 className="text-sm sm:text-base font-extrabold text-[#0d1b1e] uppercase tracking-wider flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#5a9e2f]" />
            <span>Order Fulfillment Tracking</span>
          </h2>

          {!isCancelled && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <Calendar className="w-3.5 h-3.5 text-[#5a9e2f]" />
              <span>Expected Delivery: <strong className="text-slate-900">{deliveryWindow}</strong></span>
            </div>
          )}
        </div>

        {/* If Cancelled: Show Clear Cancelled Progress */}
        {isCancelled ? (
          <div className="p-4 sm:p-6 bg-rose-50/70 border border-rose-200 rounded-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold">
                ✕
              </div>
              <div>
                <h4 className="font-bold text-sm text-rose-900">This Order Was Cancelled</h4>
                <p className="text-xs text-rose-700">
                  {order.paymentMethod === 'RAZORPAY'
                    ? 'Payment Refund: Online payment refund has been initiated to your source account (takes 3-5 business days).'
                    : 'Cash on Delivery: No payment was charged for this order.'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-rose-200 text-xs text-rose-800">
              <span>Have any questions about this cancellation?</span>
              <a
                href="https://wa.me/917025387764?text=Hi%20Findo%20Support,%20I%20have%20a%20question%20regarding%20my%20cancelled%20order%20"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald-700 font-bold hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          /* Flipkart Style Stepper */
          <div className="relative pt-2 pb-4">
            {/* Desktop Horizontal Stepper */}
            <div className="hidden sm:grid grid-cols-4 gap-4 relative">
              {/* Connecting line */}
              <div className="absolute top-5 left-[12%] right-[12%] h-1 bg-slate-200 -z-0">
                <div
                  className="h-full bg-[#5a9e2f] transition-all duration-700"
                  style={{
                    width: isDelivered ? '100%' : isOutForDelivery ? '66%' : isShipped ? '33%' : '0%',
                  }}
                />
              </div>

              {steps.map((st) => (
                <div key={st.id} className="flex flex-col items-center text-center space-y-2 relative z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-xs ${
                      st.done
                        ? 'bg-[#5a9e2f] text-white ring-4 ring-[#eef8ea]'
                        : st.active
                        ? 'bg-blue-600 text-white ring-4 ring-blue-50 animate-pulse'
                        : 'bg-white border-2 border-slate-300 text-slate-400'
                    }`}
                  >
                    {st.done ? <Check className="w-5 h-5" /> : <Clock className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className={`font-bold text-xs ${st.done ? 'text-[#0d1b1e]' : 'text-slate-400'}`}>
                      {st.title}
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Vertical Stepper */}
            <div className="sm:hidden space-y-4 relative pl-8 border-l-2 border-slate-200 ml-4">
              {steps.map((st) => (
                <div key={st.id} className="relative space-y-0.5">
                  <div
                    className={`absolute -left-[41px] top-0 w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                      st.done
                        ? 'bg-[#5a9e2f] text-white ring-2 ring-[#eef8ea]'
                        : st.active
                        ? 'bg-blue-600 text-white animate-pulse'
                        : 'bg-white border-2 border-slate-300 text-slate-400'
                    }`}
                  >
                    {st.done ? <Check className="w-4 h-4" /> : <Clock className="w-3 h-3" />}
                  </div>
                  <p className={`font-bold text-xs ${st.done ? 'text-[#0d1b1e]' : 'text-slate-400'}`}>
                    {st.title}
                  </p>
                  <p className="text-[11px] text-slate-500">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cancellation policy note */}
        {canCancel && (
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
            <span className="flex items-center gap-1.5 text-slate-600">
              <ShieldCheck className="w-4 h-4 text-[#5a9e2f]" />
              <span>Free cancellation is available until the package is out for delivery.</span>
            </span>
            <button
              onClick={() => setIsCancelModalOpen(true)}
              className="text-rose-600 hover:text-rose-800 font-bold underline cursor-pointer text-left sm:text-right"
            >
              Cancel this order
            </button>
          </div>
        )}
      </div>

      {/* 3. DETAILS GRID */}
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
            {order.building && <p>{order.building}</p>}
            <p>
              {order.city}, {order.state} - {order.pincode}
            </p>
            <p className="pt-2 border-t border-slate-100">
              <strong>Phone:</strong> {order.customerPhone}
            </p>
            <p>
              <strong>Email:</strong> {order.customerEmail}
            </p>
            <div className="pt-2 border-t border-slate-100 space-y-1">
              <div className="flex items-center justify-between text-[#0d1b1e]">
                <span>Payment Mode:</span>
                <strong
                  className={`uppercase ${
                    order.paymentMethod === 'COD' ? 'text-amber-700' : 'text-[#5a9e2f]'
                  }`}
                >
                  {order.paymentMethod === 'RAZORPAY' ? 'Razorpay Online' : 'Cash on Delivery (COD)'} ({order.paymentStatus})
                </strong>
              </div>
              {order.razorpayPaymentId && (
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Txn Ref:</span>
                  <span className="font-semibold text-[#0d1b1e]">{order.razorpayPaymentId}</span>
                </div>
              )}
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
            <span className="text-xs text-[#5a9e2f]">{order.items?.length || 0} items</span>
          </h3>

          <div className="space-y-3">
            {order.items?.map((item: any) => (
              <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-50">
                    <Image
                      src={item.productImage || '/logo.jpeg'}
                      alt={item.productName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0d1b1e]">{item.productName}</h4>
                    <span className="text-slate-400">Qty: {item.quantity}</span>
                  </div>
                </div>
                <span className="font-bold text-[#0d1b1e]">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 space-y-1 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal:</span>
              <span className="font-bold text-[#0d1b1e]">₹{order.subtotal?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Delivery Fee:</span>
              <span className="font-bold text-[#5a9e2f]">
                {order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}
              </span>
            </div>
            {order.paymentMethod === 'COD' && (
              <div className="flex justify-between text-slate-500">
                <span>COD Handling Fee:</span>
                <span className="font-bold text-slate-700">₹30</span>
              </div>
            )}
            <div className="flex justify-between text-base font-extrabold text-[#0d1b1e] pt-2 border-t border-slate-100">
              <span>Total Payable:</span>
              <span className="text-[#0d1b1e]">₹{order.totalAmount?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. FLIPKART-STYLE CANCELLATION MODAL */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Cancel Order?</h3>
                  <p className="text-xs text-slate-500">Order #{order.orderNumber}</p>
                </div>
              </div>

              <button
                onClick={() => setIsCancelModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {cancelErrorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs">
                {cancelErrorMsg}
              </div>
            )}

            {/* Modal Form */}
            <form onSubmit={handleCancelOrder} className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Please tell us why you want to cancel this order. Once cancelled, this order cannot be resumed.
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Reason for Cancellation
                </label>
                <select
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5a9e2f]"
                >
                  <option value="Ordered by mistake">Ordered by mistake</option>
                  <option value="Expected delivery date is too long">Expected delivery date is too long</option>
                  <option value="Need to change delivery address or phone number">
                    Need to change delivery address or phone number
                  </option>
                  <option value="Want to change payment method">Want to change payment method</option>
                  <option value="Found an alternative product / better price">
                    Found an alternative product / better price
                  </option>
                  <option value="Other reasons">Other reasons</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Additional Note (Optional)
                </label>
                <textarea
                  rows={2}
                  value={cancelNote}
                  onChange={(e) => setCancelNote(e.target.value)}
                  placeholder="Tell us if there is anything we could have done better..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5a9e2f]"
                />
              </div>

              {order.paymentMethod === 'RAZORPAY' && order.paymentStatus === 'PAID' && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-[11px] leading-relaxed">
                  💳 <strong>Refund Information:</strong> Your payment of ₹{order.totalAmount} will be refunded directly to your original payment method in 3–5 working days.
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCancelModalOpen(false)}
                  disabled={isCancelling}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                >
                  Don't Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCancelling}
                  className="py-2.5 px-5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md disabled:opacity-50"
                >
                  {isCancelling ? (
                    <span>Cancelling...</span>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4" />
                      <span>Confirm Cancellation</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
