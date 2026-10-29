import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import crypto from 'node:crypto';

export const runtime = 'nodejs';

function getRazorpayConfig() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error('Razorpay API keys are not configured.');
  }

  if (!keyId.startsWith('rzp_test_') && !keyId.startsWith('rzp_live_')) {
    throw new Error('Invalid Razorpay Key ID configuration.');
  }

  return { keyId, keySecret };
}

export async function POST(request: Request) {
  try {
    const { keyId, keySecret } = getRazorpayConfig();
    const body = await request.json();

    // Verify a payment after Razorpay Checkout returns its response.
    if (body.action === 'verify') {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      } = body;

      if (
        typeof razorpay_order_id !== 'string' ||
        typeof razorpay_payment_id !== 'string' ||
        typeof razorpay_signature !== 'string'
      ) {
        return NextResponse.json(
          { success: false, error: 'Missing payment verification details.' },
          { status: 400 }
        );
      }

      const expectedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest();

      let receivedSignature: Buffer;

      try {
        receivedSignature = Buffer.from(razorpay_signature, 'hex');
      } catch {
        return NextResponse.json(
          { success: false, error: 'Invalid payment signature.' },
          { status: 400 }
        );
      }

      if (
        receivedSignature.length !== expectedSignature.length ||
        !crypto.timingSafeEqual(expectedSignature, receivedSignature)
      ) {
        return NextResponse.json(
          { success: false, verified: false, error: 'Payment verification failed.' },
          { status: 400 }
        );
      }

      // A valid signature confirms the Checkout response.
      // The order must still be checked against the server-side
      // order record and actual Razorpay payment status.
      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });

      const payment = await razorpay.payments.fetch(razorpay_payment_id);

      if (
        payment.order_id !== razorpay_order_id ||
        payment.status !== 'captured' ||
        payment.currency !== 'INR'
      ) {
        return NextResponse.json(
          { success: false, verified: false, error: 'Payment is not captured.' },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        verified: true,
        razorpay_order_id,
        razorpay_payment_id,
        amount: payment.amount,
        currency: payment.currency,
      });
    }

    // Create a real Razorpay order.
    const amount = body.amount;

    if (
      typeof amount !== 'number' ||
      !Number.isFinite(amount) ||
      amount <= 0 ||
      Math.round(amount * 100) < 100
    ) {
      return NextResponse.json(
        { error: 'Invalid payment amount.' },
        { status: 400 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: `fndo_${crypto.randomUUID().replace(/-/g, '').slice(0, 32)}`,
    });

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: keyId,
    });
  } catch (error: unknown) {
    console.error(
      'Razorpay API error:',
      error instanceof Error ? error.message : 'Unknown error'
    );

    return NextResponse.json(
      { error: 'Unable to process payment. Please try again.' },
      { status: 502 }
    );
  }
}
