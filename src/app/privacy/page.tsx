import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  UserCheck,
  CreditCard,
  Truck,
  Eye,
  Server,
  Baby,
  Scale,
  ExternalLink,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy — Findo',
  description:
    'Findo Privacy Policy: Learn how we collect, use, store, and safeguard your personal information when using getfindo.in.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-[#5a9e2f] uppercase tracking-widest bg-[#eef8ea] px-3.5 py-1.5 rounded-full inline-block">
          Official Store Policy
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0d1b1e]">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Effective Date: <strong className="text-slate-700">02 November 2026</strong>
        </p>
      </div>

      {/* Intro Banner */}
      <div className="bg-[#fafbf8] p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-3 text-slate-700 leading-relaxed text-sm">
        <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#0d1b1e]">Your Privacy Is Our Priority</h2>
            <p className="text-xs text-slate-400">Findo (getfindo.in) Customer Data Protection Commitment</p>
          </div>
        </div>
        <p className="font-semibold text-[#0d1b1e]">
          At Findo, we value your privacy and are committed to protecting your personal information.
        </p>
        <p className="text-xs sm:text-sm text-slate-600">
          This Privacy Policy explains how Findo collects, uses, stores, and protects your information when you visit our website, place an order, or contact us.
        </p>
        <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#5a9e2f] shrink-0" />
          <span>By using our website, you agree to the practices described in this Privacy Policy.</span>
        </div>
      </div>

      {/* 1. About Findo */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#5a9e2f] uppercase tracking-wider">Section 1</span>
            <h2 className="text-lg font-bold text-[#0d1b1e]">About Findo</h2>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Findo is an online store offering educational toys, creative products, puzzles, and fun activity products for children.
        </p>
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs sm:text-sm text-slate-700">
          <p>
            <strong>Website:</strong>{' '}
            <a
              href="https://getfindo.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5a9e2f] font-semibold hover:underline"
            >
              https://getfindo.in
            </a>
          </p>
          <p className="flex items-start gap-1.5">
            <MapPin className="w-4 h-4 text-[#5a9e2f] shrink-0 mt-0.5" />
            <span>
              <strong>Business Location:</strong> Chelembra, Spinning Mill, Malappuram, Kerala, India.
            </span>
          </p>
        </div>
      </section>

      {/* 2. Information We Collect */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#5a9e2f] uppercase tracking-wider">Section 2</span>
            <h2 className="text-lg font-bold text-[#0d1b1e]">Information We Collect</h2>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          When you use our website or place an order, we may collect the following information:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#0d1b1e] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#5a9e2f]"></span>
              Personal Information
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li>Full name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>Billing address</li>
              <li>Shipping address</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#0d1b1e] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#5a9e2f]"></span>
              Order Information
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li>Products purchased</li>
              <li>Order ID</li>
              <li>Order date</li>
              <li>Order status</li>
              <li>Delivery details</li>
              <li>Return or refund information</li>
            </ul>
          </div>
        </div>

        <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-[#5a9e2f]" />
            Payment Information
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            Payments made through our website may be processed by third-party payment gateways. We may receive payment-related information such as transaction IDs, payment status, and payment method.
          </p>
          <p className="text-xs font-semibold text-emerald-900 bg-emerald-100/60 p-2.5 rounded-xl border border-emerald-200">
            Findo does not intentionally store customers&apos; complete debit card, credit card, or banking credentials.
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-[#0d1b1e] flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-[#5a9e2f]" />
            Technical Information
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            When you visit our website, certain technical information may be collected, such as:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device information</li>
            <li>Website usage information</li>
            <li>Cookies and similar technologies</li>
          </ul>
          <p className="text-[11px] text-slate-500 italic pt-1">
            The information collected depends on the website features and services you use.
          </p>
        </div>
      </section>

      {/* 3. How We Use Your Information */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#5a9e2f] uppercase tracking-wider">Section 3</span>
            <h2 className="text-lg font-bold text-[#0d1b1e]">How We Use Your Information</h2>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          We use your personal information for the following purposes:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
          {[
            'To process and confirm your orders.',
            'To arrange shipping and delivery.',
            'To provide order tracking information.',
            'To process cancellations, returns, replacements, and refunds.',
            'To respond to customer enquiries.',
            'To improve our website and customer experience.',
            'To prevent fraudulent transactions.',
            'To send important order-related updates.',
            'To comply with applicable legal requirements.',
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-100"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#5a9e2f] shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 italic pt-1">
          We may also send promotional messages or offers where permitted by law and subject to your preferences.
        </p>
      </section>

      {/* 4. Sharing of Information */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#5a9e2f] uppercase tracking-wider">Section 4</span>
            <h2 className="text-lg font-bold text-[#0d1b1e]">Sharing of Information</h2>
          </div>
        </div>
        <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs sm:text-sm font-semibold text-emerald-950">
          Findo does not sell or rent your personal information to third parties.
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          However, we may share necessary information with trusted service providers to operate our business, including:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
            <h4 className="font-bold text-[#0d1b1e]">Courier & Delivery Partners</h4>
            <p className="text-slate-600">
              Your name, phone number, and delivery address may be shared with courier companies to deliver your orders.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
            <h4 className="font-bold text-[#0d1b1e]">Payment Service Providers</h4>
            <p className="text-slate-600">
              Payment-related information may be processed by authorised payment gateways to complete transactions.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
            <h4 className="font-bold text-[#0d1b1e]">Website & Technology Providers</h4>
            <p className="text-slate-600">
              We may use website hosting providers, analytics services, and technical service providers to maintain and improve our website.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
            <h4 className="font-bold text-[#0d1b1e]">Legal Authorities</h4>
            <p className="text-slate-600">
              We may disclose information when required by law, legal proceedings, or authorised government authorities.
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-500 italic">
          We share only the information reasonably necessary for the relevant purpose.
        </p>
      </section>

      {/* 5. Cookies & Website Tracking */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center shrink-0">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#5a9e2f] uppercase tracking-wider">Section 5</span>
            <h2 className="text-lg font-bold text-[#0d1b1e]">Cookies & Website Tracking</h2>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Our website may use cookies and similar technologies to improve your browsing experience. Cookies may help us:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
          <li>Remember your shopping cart.</li>
          <li>Improve website functionality.</li>
          <li>Understand how visitors use our website.</li>
          <li>Support website security.</li>
          <li>Improve our marketing and services.</li>
        </ul>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          You can manage or disable cookies through your browser settings. Please note that disabling certain cookies may affect website functionality.
        </p>
        <p className="text-xs text-slate-500 italic">
          Where required, we will obtain consent for cookies or tracking technologies.
        </p>
      </section>

      {/* 6. Data Security */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#5a9e2f] uppercase tracking-wider">Section 6</span>
            <h2 className="text-lg font-bold text-[#0d1b1e]">Data Security</h2>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Findo takes reasonable measures to protect customers&apos; personal information against unauthorised access, loss, misuse, alteration, or disclosure.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          We use appropriate technical and organisational safeguards, depending on the nature of the information and the services we use. However, no online platform can guarantee complete security.
        </p>
        <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900 font-medium">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            Customers are advised not to share sensitive payment credentials or passwords through email, WhatsApp, or other communication channels.
          </span>
        </div>
      </section>

      {/* 7. Data Retention */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center shrink-0">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#5a9e2f] uppercase tracking-wider">Section 7</span>
            <h2 className="text-lg font-bold text-[#0d1b1e]">Data Retention</h2>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          We retain personal information only for as long as reasonably necessary for:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
          <li>Order processing and customer service.</li>
          <li>Accounting and business records.</li>
          <li>Legal and regulatory requirements.</li>
          <li>Handling disputes and complaints.</li>
          <li>Other legitimate business purposes.</li>
        </ul>
        <p className="text-xs text-slate-600 leading-relaxed">
          When information is no longer required, we will take reasonable steps to delete or anonymise it, subject to applicable legal requirements.
        </p>
      </section>

      {/* 8. Children's Privacy */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center shrink-0">
            <Baby className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#5a9e2f] uppercase tracking-wider">Section 8</span>
            <h2 className="text-lg font-bold text-[#0d1b1e]">Children&apos;s Privacy</h2>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Findo offers products intended for children. Our website is intended to be used by adults, parents, or legal guardians for purchasing products.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          We do not knowingly collect personal information directly from children without appropriate consent or legal authorisation.
        </p>
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-600">
          Parents or guardians who believe that a child has provided personal information to us may contact our support team to request appropriate action.
        </div>
      </section>

      {/* 9. Your Privacy Rights */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#5a9e2f] uppercase tracking-wider">Section 9</span>
            <h2 className="text-lg font-bold text-[#0d1b1e]">Your Privacy Rights</h2>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Subject to applicable laws, customers may have the right to:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
          {[
            'Request access to their personal information.',
            'Request correction of inaccurate information.',
            'Request deletion of personal information where legally permitted.',
            'Withdraw consent where processing is based on consent.',
            'Raise concerns regarding the use of their personal information.',
            'Submit a privacy-related complaint.',
          ].map((right, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-100"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#5a9e2f] shrink-0 mt-0.5" />
              <span>{right}</span>
            </div>
          ))}
        </div>
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5 text-xs text-slate-600">
          <p>To exercise these rights, please contact our customer support team.</p>
          <p>We may need to verify your identity before processing certain requests.</p>
          <p className="italic text-slate-500">
            Some information may need to be retained to fulfil legal, accounting, or other applicable obligations.
          </p>
        </div>
      </section>

      {/* 10. Third-Party Websites */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center shrink-0">
            <ExternalLink className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#5a9e2f] uppercase tracking-wider">Section 10</span>
            <h2 className="text-lg font-bold text-[#0d1b1e]">Third-Party Websites</h2>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Our website may contain links to third-party websites or services. Findo is not responsible for the privacy practices or content of external websites.
        </p>
        <p className="text-xs text-slate-600">
          Customers are encouraged to review the privacy policies of those websites before providing personal information.
        </p>
      </section>

      {/* 11. Changes to This Privacy Policy */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center shrink-0">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#5a9e2f] uppercase tracking-wider">Section 11</span>
            <h2 className="text-lg font-bold text-[#0d1b1e]">Changes to This Privacy Policy</h2>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Findo may update this Privacy Policy from time to time to reflect changes in our business, website features, or applicable laws.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Any updated version will be published on this page with a revised effective date. We encourage customers to review this page periodically.
        </p>
      </section>

      {/* 12. Contact Us & Grievance Redressal */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-[#eef8ea] text-[#5a9e2f] flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#5a9e2f] uppercase tracking-wider">Section 12</span>
            <h2 className="text-lg font-bold text-[#0d1b1e]">Contact Us & Grievance Officer</h2>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* General Customer Care */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5 text-xs">
            <h4 className="font-bold text-[#0d1b1e] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#5a9e2f]" />
              Findo Customer Support
            </h4>
            <div className="space-y-1.5 text-slate-600">
              <p>
                <strong>Brand:</strong> Findo
              </p>
              <p>
                <strong>Website:</strong>{' '}
                <a
                  href="https://getfindo.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5a9e2f] hover:underline"
                >
                  https://getfindo.in
                </a>
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:findohub7@gmail.com"
                  className="text-[#5a9e2f] hover:underline font-medium"
                >
                  findohub7@gmail.com
                </a>
              </p>
              <p>
                <strong>WhatsApp / Support:</strong>{' '}
                <a
                  href="https://wa.me/917025387764"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5a9e2f] hover:underline font-semibold"
                >
                  +91 70253 87764
                </a>
              </p>
              <p className="pt-1 flex items-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>Chelembra, Spinning Mill, Malappuram, Kerala, India</span>
              </p>
            </div>
          </div>

          {/* Grievance Officer */}
          <div className="p-4 bg-[#f3f9ee] rounded-2xl border border-[#cbe4bf] space-y-2.5 text-xs">
            <h4 className="font-bold text-[#1f4e0c] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5a9e2f]" />
              Designated Grievance Officer
            </h4>
            <div className="space-y-1.5 text-slate-700">
              <p>
                <strong>Officer Name:</strong> Refnise
              </p>
              <p>
                <strong>Designation:</strong> Managing Director
              </p>
              <p>
                <strong>Grievance Contact:</strong>{' '}
                <a
                  href="tel:+919539740449"
                  className="text-[#1f4e0c] hover:underline font-bold"
                >
                  +91 95397 40449
                </a>
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:findohub7@gmail.com"
                  className="text-[#5a9e2f] hover:underline font-medium"
                >
                  findohub7@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-1 text-[11px] text-slate-500 pt-1">
                <Clock className="w-3 h-3 text-[#5a9e2f]" />
                <span>Response timeframe: within 48 business hours</span>
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 font-medium space-y-1 text-center">
          <p>
            We aim to acknowledge privacy-related complaints within 48 hours and address them within the applicable legal timeframe.
          </p>
          <p className="text-slate-600 font-semibold pt-1">
            Thank you for trusting Findo. &mdash; <span className="text-[#5a9e2f]">Find smart play.</span>
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
          <Link
            href="/terms"
            className="text-xs font-bold text-[#5a9e2f] hover:underline inline-flex items-center gap-1"
          >
            ← View Complete Terms & Conditions
          </Link>
          <Link
            href="/shipping-returns"
            className="text-xs font-bold text-slate-500 hover:text-[#5a9e2f] hover:underline inline-flex items-center gap-1"
          >
            View Shipping & Returns Policy →
          </Link>
        </div>
      </section>
    </div>
  );
}
