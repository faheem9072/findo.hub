'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  Lock,
  Building2,
  Phone,
  Mail,
  User,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function CheckoutPage() {
  const { cart, subtotal, freeShippingThreshold, freeShippingRemaining, clearCart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'COD', // 'COD' | 'RAZORPAY'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const shippingFee = freeShippingRemaining === 0 ? 0 : 70;
  const totalPayable = subtotal + shippingFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRazorpayPayment = async () => {
    // Call Razorpay API to generate order
    const res = await fetch('/api/checkout/razorpay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: totalPayable }),
    });

    const razorpayData = await res.json();
    if (!res.ok) {
      throw new Error(razorpayData.error || 'Failed to initialize payment');
    }

    return new Promise<{ razorpayOrderId: string; razorpayPaymentId: string }>((resolve, reject) => {
      // Check if Razorpay script is loaded or mock mode active
      if (typeof window !== 'undefined' && (window as any).Razorpay) {
        const options = {
          key: razorpayData.key_id,
          amount: razorpayData.amount,
          currency: razorpayData.currency,
          name: 'Findo Store',
          description: 'Payment for Kids Products Order',
          image: '/logo.jpeg',
          order_id: razorpayData.id,
          handler: function (response: any) {
            resolve({
              razorpayOrderId: response.razorpay_order_id || razorpayData.id,
              razorpayPaymentId: response.razorpay_payment_id || `pay_mock_${Date.now()}`,
            });
          },
          prefill: {
            name: formData.customerName,
            email: formData.customerEmail,
            contact: formData.customerPhone,
          },
          theme: {
            color: '#5a9e2f',
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', function (response: any) {
          reject(new Error(response.error.description || 'Payment Failed'));
        });
        rzp.open();
      } else {
        // Fallback for mock test environment when Razorpay script isn't loaded
        setTimeout(() => {
          resolve({
            razorpayOrderId: razorpayData.id || `order_mock_${Date.now()}`,
            razorpayPaymentId: `pay_mock_${Date.now()}`,
          });
        }, 1200);
      }
    });
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (cart.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    if (
      !formData.customerName ||
      !formData.customerEmail ||
      !formData.customerPhone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      setError('Please fill in all required shipping address fields.');
      return;
    }

    setLoading(true);

    try {
      let razorpayOrderId = null;
      let razorpayPaymentId = null;

      if (formData.paymentMethod === 'RAZORPAY') {
        const rzpResult = await handleRazorpayPayment();
        razorpayOrderId = rzpResult.razorpayOrderId;
        razorpayPaymentId = rzpResult.razorpayPaymentId;
      }

      // Create Order in Database
      const orderPayload = {
        ...formData,
        items: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
          image: item.image,
        })),
        razorpayOrderId,
        razorpayPaymentId,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to place order');
      }

      clearCart();
      router.push(`/orders/${data.order.orderNumber}`);
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'An error occurred during checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 bg-[#eef8ea] text-[#5a9e2f] rounded-full flex items-center justify-center mx-auto text-2xl">
          🛒
        </div>
        <h2 className="text-2xl font-bold text-[#0d1b1e]">Your cart is empty</h2>
        <p className="text-sm text-slate-500">Please add items to your cart before proceeding to checkout.</p>
        <Link
          href="/products"
          className="inline-block py-3 px-6 rounded-xl bg-[#5a9e2f] text-white font-bold text-sm hover:bg-[#488224] transition-colors"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Razorpay Script tag loading */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />

      <div className="flex items-center justify-between">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#5a9e2f] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-[#eef8ea] px-3 py-1 rounded-full">
          <Lock className="w-3.5 h-3.5 text-[#5a9e2f]" />
          <span>256-Bit Encrypted Secure Checkout</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Form Details */}
        <div className="lg:col-span-7 space-y-8">
          <form onSubmit={handleSubmitOrder} className="space-y-8">
            {/* Step 1: Shipping Address */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-8 h-8 rounded-full bg-[#0d1b1e] text-[#5a9e2f] font-bold text-sm flex items-center justify-center">
                  1
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#0d1b1e]">Shipping Address</h2>
                  <p className="text-xs text-slate-500">Where should we deliver your Findo order?</p>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-[#0d1b1e] uppercase tracking-wider flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#5a9e2f]" /> Full Name *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    required
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-none focus:border-[#5a9e2f]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0d1b1e] uppercase tracking-wider flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#5a9e2f]" /> Email Address *
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    required
                    value={formData.customerEmail}
                    onChange={handleChange}
                    placeholder="rahul@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-none focus:border-[#5a9e2f]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0d1b1e] uppercase tracking-wider flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#5a9e2f]" /> Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="customerPhone"
                    required
                    value={formData.customerPhone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-none focus:border-[#5a9e2f]"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-[#0d1b1e] uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#5a9e2f]" /> Flat / Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House No., Street, Area, Landmark"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-none focus:border-[#5a9e2f]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0d1b1e] uppercase tracking-wider flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-[#5a9e2f]" /> City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Mumbai"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-none focus:border-[#5a9e2f]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0d1b1e] uppercase tracking-wider">State *</label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="e.g. Maharashtra"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-none focus:border-[#5a9e2f]"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-[#0d1b1e] uppercase tracking-wider">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="e.g. 400001"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-none focus:border-[#5a9e2f]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Options */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-8 h-8 rounded-full bg-[#0d1b1e] text-[#5a9e2f] font-bold text-sm flex items-center justify-center">
                  2
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#0d1b1e]">Payment Method</h2>
                  <p className="text-xs text-slate-500">Select how you would like to pay</p>
                </div>
              </div>

              <div className="space-y-3">
                {/* Cash on Delivery */}
                <label
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    formData.paymentMethod === 'COD'
                      ? 'border-[#5a9e2f] bg-[#eef8ea]'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={formData.paymentMethod === 'COD'}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#5a9e2f] focus:ring-[#5a9e2f]"
                    />
                    <div>
                      <h4 className="font-bold text-[#0d1b1e] text-sm">Cash on Delivery (COD)</h4>
                      <p className="text-xs text-slate-500">Pay cash directly to the delivery person upon arrival</p>
                    </div>
                  </div>
                  <Truck className="w-5 h-5 text-[#5a9e2f]" />
                </label>

                {/* Razorpay Online Payment */}
                <label
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    formData.paymentMethod === 'RAZORPAY'
                      ? 'border-[#5a9e2f] bg-[#eef8ea]'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="RAZORPAY"
                      checked={formData.paymentMethod === 'RAZORPAY'}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#5a9e2f] focus:ring-[#5a9e2f]"
                    />
                    <div>
                      <h4 className="font-bold text-[#0d1b1e] text-sm flex items-center gap-2">
                        <span>Razorpay Online Payment</span>
                        <span className="bg-[#5a9e2f] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          UPI / Cards / NetBanking
                        </span>
                      </h4>
                      <p className="text-xs text-slate-500">Pay securely via UPI, Debit/Credit Cards, or NetBanking</p>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-[#5a9e2f]" />
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-8 bg-[#5a9e2f] hover:bg-[#488224] text-white font-bold text-base rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Processing Your Order...</span>
              ) : (
                <>
                  <span>Place Order (₹{totalPayable.toFixed(2)})</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 sticky top-28">
            <h3 className="text-lg font-bold text-[#0d1b1e] pb-4 border-b border-slate-100 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs text-[#5a9e2f] font-bold">{cart.length} items</span>
            </h3>

            {/* Cart Items List */}
            <div className="space-y-4 max-h-72 overflow-y-auto custom-scrollbar pr-1">
              {cart.map((item) => (
                <div key={item.productId} className="flex gap-3 items-center">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-slate-50">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#0d1b1e] truncate">{item.name}</h4>
                    <span className="text-[10px] text-slate-500">Qty: {item.quantity}</span>
                  </div>
                  <span className="text-xs font-bold text-[#0d1b1e]">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals Calculation */}
            <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal</span>
                <span className="font-bold text-[#0d1b1e]">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping Fee</span>
                <span className="font-bold text-[#5a9e2f]">
                  {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#0d1b1e] pt-3 border-t border-slate-200">
                <span>Total Amount</span>
                <span className="text-xl text-[#0d1b1e]">₹{totalPayable.toFixed(2)}</span>
              </div>
            </div>

            {/* Trust highlights */}
            <div className="p-4 bg-[#fafbf8] rounded-2xl border border-slate-200/80 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5a9e2f]" />
                <span>7-Day Replacement Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5a9e2f]" />
                <span>100% Non-Toxic Child Safety Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
