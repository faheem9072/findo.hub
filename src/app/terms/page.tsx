import React from 'react';
import Link from 'next/link';
import {
  FileText,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  AlertTriangle,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  Lock,
  UserCheck,
} from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions — Findo Kids Products',
  description:
    'Read the official Terms & Conditions, shipping, cancellation, return, refund, and customer support policies for Findo (getfindo.in).',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-[#5a9e2f] uppercase tracking-widest bg-[#eef8ea] px-3.5 py-1.5 rounded-full inline-block">
          Official Store Policy
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0d1b1e]">
          Terms & Conditions
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Effective Date: <strong className="text-slate-700">02 November 2026</strong>
        </p>
      </div>

      {/* Intro Banner */}
      <div className="bg-[#fafbf8] p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-3 text-slate-700 leading-relaxed text-sm">
        <p className="font-semibold text-[#0d1b1e]">
          Welcome to Findo! We are happy to have you here.
        </p>
        <p className="text-xs sm:text-sm text-slate-600">
          Findo is an online store offering creative, educational, and fun products for children.
          These Terms & Conditions explain how you can use our website, place orders, make payments,
          and receive products from us.
        </p>
        <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#5a9e2f] shrink-0" />
          <span>By using our website or placing an order, you agree to the following terms.</span>
        </div>
      </div>

      {/* 1. About Findo */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-[#0d1b1e]">1. About Findo</h2>
        </div>
        <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            Findo is an e-commerce brand based in Kerala, India, dedicated to curated child-safe toys and educational kits.
          </p>
          <p>
            Our official website:{' '}
            <Link href="https://getfindo.in" className="text-[#5a9e2f] font-bold hover:underline">
              https://getfindo.in
            </Link>
          </p>
          <p>
            We offer products such as educational toys, puzzles, creative activity kits, and other children&apos;s products.
          </p>
          <p className="text-xs text-slate-500">
            We reserve the right to update our products, prices, and website policies whenever necessary.
          </p>
        </div>
      </section>

      {/* 2. Orders & Payments */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-[#0d1b1e]">2. Orders & Payments</h2>
        </div>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed list-disc pl-5">
          <li>Customers can place orders through our website.</li>
          <li>All orders are subject to product availability and confirmation.</li>
          <li>Please provide accurate name, phone number, email address, and delivery address while placing an order.</li>
          <li>Product prices are displayed in Indian Rupees (INR).</li>
          <li>Shipping charges, if applicable, will be displayed before checkout.</li>
          <li>Orders will be processed after successful payment or confirmation of Cash on Delivery (COD), where available.</li>
          <li>Findo reserves the right to cancel an order in case of incorrect pricing, product unavailability, payment issues, or suspected fraudulent activity.</li>
          <li>If an order is cancelled after payment, the eligible amount will be refunded.</li>
        </ul>
      </section>

      {/* 3. Shipping & Delivery Policy */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0d1b1e]">3. Shipping & Delivery Policy</h2>
            <p className="text-xs text-slate-400">Timelines and courier partner information</p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div>
            <h3 className="font-bold text-[#0d1b1e] text-xs uppercase tracking-wider mb-1">Shipping Locations</h3>
            <p>
              Findo currently delivers across serviceable locations in India. Delivery availability depends on the courier service and the customer&apos;s PIN code.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-[#0d1b1e] text-xs uppercase tracking-wider mb-1">Order Processing Time</h3>
            <p>
              Orders are generally processed within <strong>1–2 business days</strong> after confirmation. Orders placed on Sundays or public holidays may be processed on the next working day.
            </p>
          </div>

          {/* Delivery Timelines Card */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h3 className="font-bold text-[#0d1b1e] text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#5a9e2f]" />
              <span>Estimated Delivery Timelines</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-500 block">Kerala</span>
                <span className="text-base font-extrabold text-[#0d1b1e]">5 – 14 business days</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-500 block">Other Indian States</span>
                <span className="text-base font-extrabold text-[#0d1b1e]">5 – 15 business days</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              * Delivery timelines may vary depending on destination PIN code, courier availability, weather conditions, public holidays, or unforeseen transit delays.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-[#0d1b1e] text-xs uppercase tracking-wider mb-1">Shipping Charges</h3>
            <p>
              Shipping charges will be displayed during checkout. Findo may offer free shipping or promotional delivery offers from time to time based on order subtotal.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-[#0d1b1e] text-xs uppercase tracking-wider mb-1">Tracking Your Order</h3>
            <p>
              Once your order is dispatched, tracking details will be shared through SMS, WhatsApp, or email, wherever available. Customers can use these details to check live shipment status.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-[#0d1b1e] text-xs uppercase tracking-wider mb-1">Delayed Deliveries</h3>
            <p>
              We do our best to deliver orders within the estimated timeframe. However, Findo cannot guarantee exact delivery dates due to circumstances beyond our control. If your order is delayed, please contact our customer support team.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-[#0d1b1e] text-xs uppercase tracking-wider mb-1">Incorrect Delivery Address</h3>
            <p>
              Customers are responsible for providing the correct delivery address and contact number. If an order is returned due to an incorrect address or an unsuccessful delivery attempt, additional shipping charges may apply for reshipping.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Cancellation Policy */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center shrink-0">
            <RotateCcw className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-[#0d1b1e]">4. Cancellation Policy</h2>
        </div>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed list-disc pl-5">
          <li>Customers may request order cancellation before the order is dispatched.</li>
          <li>Once an order has been shipped, cancellation may not be possible.</li>
          <li>If an order is cancelled by Findo due to product unavailability or other reasons, the customer will receive an eligible refund.</li>
          <li>Cancellation requests can be made by contacting our customer support team directly via WhatsApp or email.</li>
        </ul>
      </section>

      {/* 5. Return & Replacement Policy */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-[#0d1b1e]">5. Return & Replacement Policy</h2>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            At Findo, customer satisfaction is important to us. Customers may request a return or replacement in the following situations:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>The product received is damaged.</li>
            <li>The product is defective or not functioning properly.</li>
            <li>The wrong product has been delivered.</li>
            <li>The product received is significantly different from the description on our website.</li>
          </ul>

          <div className="p-4 bg-[#eef8ea] rounded-2xl border border-emerald-200 space-y-1.5">
            <h3 className="font-bold text-[#0d1b1e] text-xs uppercase tracking-wider">
              Return Request Period: Within 7 Days
            </h3>
            <p className="text-xs text-slate-700">
              Customers must contact us within <strong>7 days of receiving the product</strong> to request a return or replacement.
            </p>
            <p className="text-xs text-slate-700">Please provide:</p>
            <ul className="list-disc pl-5 text-xs text-slate-700 space-y-0.5">
              <li>Order ID</li>
              <li>Clear photographs or video of the product</li>
              <li>A brief explanation of the issue</li>
            </ul>
          </div>

          <h3 className="font-bold text-[#0d1b1e] text-xs uppercase tracking-wider pt-2">Return Conditions:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Products should be returned with their original packaging and accessories, wherever reasonably possible.</li>
            <li>Products should not be intentionally damaged or misused.</li>
            <li>Returns due to a change of mind may not be accepted unless specifically stated on the product page.</li>
            <li>Products damaged during customer use may not qualify for replacement.</li>
          </ul>
          <p className="text-[11px] text-slate-400">
            * These conditions do not limit any rights available to customers under applicable consumer protection laws.
          </p>
        </div>
      </section>

      {/* 6. Refund Policy */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center shrink-0">
            <RotateCcw className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-[#0d1b1e]">6. Refund Policy</h2>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>Refunds may be provided in the following circumstances:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Order cancellation before dispatch.</li>
            <li>Product unavailability.</li>
            <li>Approved return of a damaged, defective, or incorrect product.</li>
            <li>Other situations where a refund is required under applicable law.</li>
          </ul>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <h3 className="font-bold text-[#0d1b1e] text-xs uppercase tracking-wider">Refund Processing: 5–7 Business Days</h3>
            <p>
              Once a refund is approved, it will be initiated to the original payment method wherever possible. Refunds are generally processed within <strong>5–7 business days</strong> after approval.
            </p>
            <p className="text-xs text-slate-500">
              The actual time taken for the amount to reflect in the customer&apos;s account may depend on the bank or payment service provider. For Cash on Delivery orders, refunds may be processed through a bank transfer or another mutually agreed method. Shipping charges will also be refunded wherever applicable under our policy or applicable law.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Damaged or Defective Products */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-[#0d1b1e]">7. Damaged or Defective Products</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          If you receive a damaged or defective product, please contact us <strong>within 48 hours of delivery</strong>, preferably with photographs or an unboxing video. Our team will review the issue and arrange an appropriate solution, such as a replacement, refund, or return.
        </p>
        <p className="text-xs text-slate-500">
          * An unboxing video is helpful for verification but is not the only basis for accepting a genuine complaint.
        </p>
      </section>

      {/* 8. Product Information */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-[#0d1b1e]">8. Product Information</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Findo makes reasonable efforts to display accurate product descriptions, images, prices, and specifications. However:
        </p>
        <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 space-y-1">
          <li>Product colours may vary slightly due to screen display settings.</li>
          <li>Minor packaging differences may occur between manufacturer batches.</li>
          <li>Product dimensions and specifications are provided as accurately as possible.</li>
          <li>Products intended for children must be used according to the instructions and age recommendations provided.</li>
        </ul>
        <p className="text-xs font-semibold text-slate-700">
          Parents and guardians are responsible for ensuring that children use products safely and appropriately.
        </p>
      </section>

      {/* 9. Privacy Policy */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-[#0d1b1e]">9. Privacy Policy</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Findo respects the privacy of its customers. We may collect personal information such as: Name, phone number, email address, shipping address, order details, and payment transaction information.
        </p>
        <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 space-y-1">
          <li>This information is used strictly for processing orders, delivering products, providing customer support, and improving our services.</li>
          <li>Payment information is processed through authorised and encrypted payment gateways (such as Razorpay). Findo does not store customers&apos; complete card details or CVVs.</li>
          <li>We do not sell customers&apos; personal information to third parties.</li>
          <li>Information is shared only with verified courier partners, payment providers, and service providers where necessary to complete an order or comply with legal requirements.</li>
        </ul>
      </section>

      {/* 10. Website Usage */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-[#0d1b1e]">10. Website Usage</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Customers agree to use the Findo website for lawful purposes only. Users must not attempt to misuse or damage the website, submit false or misleading information, engage in fraudulent transactions, or attempt to access restricted areas. Findo reserves the right to restrict access to users who violate these terms.
        </p>
      </section>

      {/* 11 & 12. Liability & Policy Updates */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <h2 className="text-sm font-bold text-[#0d1b1e]">11. Limitation of Liability</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Findo will make reasonable efforts to provide reliable products and services. However, we are not responsible for delays or interruptions caused by circumstances beyond our reasonable control, including courier disruptions, natural disasters, or technical issues. Applicable consumer protection rights remain preserved.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <h2 className="text-sm font-bold text-[#0d1b1e]">12. Changes to Terms</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Findo reserves the right to update these Terms & Conditions from time to time. Any changes will be published on this website. Customers are encouraged to review this page periodically.
          </p>
        </div>
      </section>

      {/* 13. Contact Us & Grievance Officer */}
      <section className="bg-[#0d1b1e] text-white p-8 rounded-3xl space-y-6 shadow-xl border border-emerald-950/40">
        <div className="space-y-1 pb-4 border-b border-slate-800">
          <span className="text-xs font-bold text-[#5a9e2f] uppercase tracking-wider">Official Channels</span>
          <h2 className="text-2xl font-extrabold text-white">13. Contact Us & Grievance Redressal</h2>
          <p className="text-xs text-slate-400">
            If you have any questions regarding orders, shipping, returns, refunds, or these Terms & Conditions, please reach out to us.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
          {/* Brand & Support Contact */}
          <div className="space-y-3.5">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#5a9e2f] shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 text-xs block">Customer Support Email:</span>
                <a href="mailto:findohub7@gmail.com" className="text-white font-semibold hover:text-[#5a9e2f]">
                  findohub7@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#5a9e2f] shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 text-xs block">WhatsApp & Customer Support:</span>
                <a href="https://wa.me/917025387764" target="_blank" rel="noopener noreferrer" className="text-white font-semibold hover:text-[#5a9e2f]">
                  +91 70253 87764
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#5a9e2f] shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 text-xs block">Business Address:</span>
                <span className="text-slate-200">Chelembra, Spinning Mill, Malappuram, Kerala, India</span>
              </div>
            </div>
          </div>

          {/* Grievance Officer Card */}
          <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-[#5a9e2f]">
              <UserCheck className="w-4 h-4" />
              <span className="font-bold text-xs uppercase tracking-wider">Grievance Officer</span>
            </div>
            <div>
              <p className="font-bold text-sm text-white">Refnise</p>
              <p className="text-xs text-slate-400">Managing Director</p>
            </div>
            <div>
              <span className="text-slate-400 text-xs block">Grievance Contact:</span>
              <a href="tel:+919539740449" className="text-white font-bold hover:text-[#5a9e2f] text-sm">
                +91 95397 40449
              </a>
            </div>
            <p className="text-[11px] text-slate-400 pt-1 border-t border-white/10">
              We aim to acknowledge customer complaints within 48 hours and resolve them within the period required under applicable law.
            </p>
          </div>
        </div>

        <div className="text-center pt-4 border-t border-slate-800 text-xs text-slate-400">
          Thank you for choosing Findo! — <em>Find smart play.</em>
        </div>
      </section>
    </div>
  );
}

