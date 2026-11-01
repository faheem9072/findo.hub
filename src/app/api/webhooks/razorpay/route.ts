import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyWebhookSignature } from '@/lib/razorpay';

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET;

    // If webhook secret is configured, verify HMAC signature
    if (webhookSecret && !webhookSecret.includes('mock')) {
      if (!signature) {
        return NextResponse.json({ error: 'Missing x-razorpay-signature header' }, { status: 400 });
      }

      const isValid = verifyWebhookSignature({
        payload: rawBody,
        signature,
        secret: webhookSecret,
      });

      if (!isValid) {
        console.error('Invalid Razorpay webhook signature');
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
      }
    }

    const event = JSON.parse(rawBody);
    const eventType = event.event;
    const payload = event.payload;

    console.log(`[Razorpay Webhook] Received event: ${eventType}`);

    if (eventType === 'payment.captured' || eventType === 'order.paid') {
      const paymentEntity = payload.payment?.entity;
      const orderId = paymentEntity?.order_id || payload.order?.entity?.id;
      const paymentId = paymentEntity?.id;

      if (orderId) {
        const order = await prisma.order.findFirst({
          where: {
            OR: [
              { razorpayOrderId: orderId },
              { razorpayPaymentId: paymentId },
            ],
          },
        });

        if (order) {
          await prisma.order.update({
            where: { id: order.id },
            data: {
              paymentStatus: 'PAID',
              orderStatus: order.orderStatus === 'PENDING' ? 'CONFIRMED' : order.orderStatus,
              razorpayPaymentId: paymentId || order.razorpayPaymentId,
            },
          });
          console.log(`[Razorpay Webhook] Order ${order.orderNumber} marked as PAID`);
        }
      }
    } else if (eventType === 'payment.failed') {
      const paymentEntity = payload.payment?.entity;
      const orderId = paymentEntity?.order_id;

      if (orderId) {
        const order = await prisma.order.findFirst({
          where: { razorpayOrderId: orderId },
        });

        if (order && order.paymentStatus !== 'PAID') {
          await prisma.order.update({
            where: { id: order.id },
            data: {
              paymentStatus: 'FAILED',
            },
          });
          console.log(`[Razorpay Webhook] Order ${order.orderNumber} marked as FAILED`);
        }
      }
    }

    return NextResponse.json({ status: 'ok', received: true });
  } catch (error: any) {
    console.error('Razorpay Webhook Error:', error);
    return NextResponse.json({ error: error.message || 'Webhook processing failed' }, { status: 500 });
  }
}
