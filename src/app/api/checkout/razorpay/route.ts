import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import crypto from 'node:crypto';

export const runtime = 'nodejs';

function getRazorpayClient() {
  const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_live_TumQ9KYuCp21GE';
  const keySecret = process.env.RAZORPAY_KEY_SECRET || 'rJrp7gi66x3y9C4uQIlIsP5Q';

  if (!keyId || !keySecret) {
    throw new Error('Razorpay API keys are not configured.');
  }

  return {
    keyId,
    keySecret,
    client: new Razorpay({ key_id: keyId, key_secret: keySecret }),
  };
}

export async function POST(request: Request) {
  try {
    const { keyId, keySecret, client } = getRazorpayClient();
    const body = await request.json();
    const { action, amount, razorpay_order_id, razorpay_payment_id, razorpay_signature, notes } = body;

    // Action 1: Verify Payment Signature
    if (action === 'verify') {
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return NextResponse.json(
          { success: false, error: 'Missing payment verification details.' },
          { status: 400 }
        );
      }

      const generatedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generatedSignature !== razorpay_signature) {
        return NextResponse.json(
          { success: false, verified: false, error: 'Invalid payment signature.' },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        verified: true,
        razorpay_order_id,
        razorpay_payment_id,
      });
    }

    // Action 2: Create Razorpay Order
    if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid order amount.' },
        { status: 400 }
      );
    }

    const orderAmountInPaise = Math.round(amount * 100);
    const receipt = `fndo_${Date.now().toString().slice(-8)}`;

    const order = await client.orders.create({
      amount: orderAmountInPaise,
      currency: 'INR',
      receipt,
      notes: {
        customerName: notes?.customerName || '',
        customerEmail: notes?.customerEmail || '',
        customerPhone: notes?.customerPhone || '',
      },
    });

    return NextResponse.json({
      success: true,
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: keyId,
    });
  } catch (error: any) {
    console.error('Razorpay API error:', error?.message || error);
    return NextResponse.json(
      { error: error?.message || 'Unable to process payment. Please try again.' },
      { status: 500 }
    );
  }
}
