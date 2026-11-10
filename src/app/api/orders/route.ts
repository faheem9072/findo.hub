import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';
import { verifyPaymentSignature } from '@/lib/razorpay';

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('findo_admin_token')?.value;
    if (!token || !(await verifyAdminToken(token))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const where: any = {};
    if (status && status !== 'ALL') {
      where.orderStatus = status;
    }

    const orders = await prisma.order.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        items: true,
      },
    });

    return NextResponse.json({ orders });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      address,
      building,
      city,
      state,
      pincode,
      paymentMethod,
      items,
      couponCode,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    } = body;

    if (
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json({ error: 'Missing required order details' }, { status: 400 });
    }

    // Razorpay Online Payment Verification
    if (paymentMethod === 'RAZORPAY') {
      if (!razorpayOrderId || !razorpayPaymentId) {
        return NextResponse.json(
          { error: 'Payment details are missing. Please complete the Razorpay transaction.' },
          { status: 400 }
        );
      }

      // Check cryptographic signature if present or required
      const isValid = verifyPaymentSignature({
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature || '',
      });

      if (!isValid) {
        return NextResponse.json(
          { error: 'Payment verification failed: Invalid Razorpay signature.' },
          { status: 400 }
        );
      }
    }

    // Validate product IDs to prevent foreign key constraint errors from stale carts
    const productIds = items.map((item: any) => item.productId).filter(Boolean);
    const existingProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, name: true, price: true, deliveryFee: true },
    });
    const existingProductIds = new Set(existingProducts.map((p) => p.id));
    const fallbackProduct = existingProducts[0] || (await prisma.product.findFirst());
    if (!fallbackProduct) {
      return NextResponse.json({ error: 'No active products found in the catalog.' }, { status: 400 });
    }

    let subtotal = 0;
    const orderItemsData = items.map((item: any) => {
      const validProductId = existingProductIds.has(item.productId) ? item.productId : fallbackProduct.id;
      const matchedProduct = existingProducts.find((p) => p.id === validProductId);
      const currentPrice = matchedProduct ? matchedProduct.price : (item.price || 0);
      const itemTotal = currentPrice * (item.quantity || 1);
      subtotal += itemTotal;
      return {
        productId: validProductId,
        quantity: item.quantity || 1,
        price: currentPrice,
        productName: matchedProduct ? matchedProduct.name : (item.name || item.productName || fallbackProduct.name),
        productImage: item.image || item.productImage || '/logo.jpeg',
      };
    });

    // Server-side Coupon Verification
    let discountAmount = 0;
    let validCouponCode = null;

    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode.trim().toUpperCase() },
      });

      if (coupon && coupon.isActive && (!coupon.expiryDate || new Date(coupon.expiryDate) >= new Date())) {
        if (!coupon.minOrderValue || subtotal >= coupon.minOrderValue) {
          validCouponCode = coupon.code;
          if (coupon.discountType === 'PERCENTAGE') {
            discountAmount = Math.round((subtotal * coupon.discountValue) / 100);
          } else {
            discountAmount = coupon.discountValue;
          }
          discountAmount = Math.min(discountAmount, subtotal);

          // Increment coupon usage count
          await prisma.coupon.update({
            where: { id: coupon.id },
            data: { timesUsed: { increment: 1 } },
          });
        }
      }
    }

    const settings = await prisma.setting.findUnique({ where: { id: 'default' } });
    const freeShippingThreshold = settings?.freeShippingThreshold ?? 0;
    const flatShippingRate = settings?.flatShippingRate ?? 0;

    const maxProductDeliveryFee = existingProducts.reduce((max, p) => Math.max(max, Number(p.deliveryFee || 0)), 0);
    const baseShippingRate = Math.max(flatShippingRate, maxProductDeliveryFee);
    const isFreeThresholdMet = freeShippingThreshold > 0 && subtotal >= freeShippingThreshold;
    const baseShipping = isFreeThresholdMet ? 0 : baseShippingRate;
    const codFee = paymentMethod === 'COD' ? 30 : 0;
    const shippingFee = baseShipping + codFee;
    const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

    const orderNumber = 'FND-' + Math.floor(100000 + Math.random() * 900000);
    const isOnlinePaid = paymentMethod === 'RAZORPAY' && Boolean(razorpayPaymentId);
    const paymentStatus = isOnlinePaid ? 'PAID' : 'PENDING';
    const orderStatus = isOnlinePaid ? 'CONFIRMED' : 'PENDING';

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        customerEmail: customerEmail.trim().toLowerCase(),
        customerPhone,
        address,
        building: building || null,
        city,
        state,
        pincode,
        subtotal,
        discountAmount,
        couponCode: validCouponCode,
        shippingFee,
        totalAmount,
        paymentMethod: paymentMethod || 'COD',
        paymentStatus,
        orderStatus,
        razorpayOrderId: razorpayOrderId || null,
        razorpayPaymentId: razorpayPaymentId || null,
        razorpaySignature: razorpaySignature || null,
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: true,
      },
    });

    // Update stock levels
    for (const item of items) {
      try {
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity || 1,
            },
          },
        });
      } catch (err) {
        console.error('Failed to decrement stock for item', item.productId, err);
      }
    }

    return NextResponse.json({ order, success: true }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
