import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';

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

    let subtotal = 0;
    const orderItemsData = items.map((item: any) => {
      const itemTotal = (item.price || 0) * (item.quantity || 1);
      subtotal += itemTotal;
      return {
        productId: item.productId,
        quantity: item.quantity || 1,
        price: item.price || 0,
        productName: item.name || item.productName || 'Findo Product',
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
    const freeShippingThreshold = settings?.freeShippingThreshold ?? 999;
    const flatShippingRate = settings?.flatShippingRate ?? 79;

    const shippingFee = subtotal >= freeShippingThreshold ? 0 : flatShippingRate;
    const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

    const orderNumber = 'FND-' + Math.floor(100000 + Math.random() * 900000);
    const paymentStatus = paymentMethod === 'RAZORPAY' && razorpayPaymentId ? 'PAID' : 'PENDING';

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
        orderStatus: 'PENDING',
        razorpayOrderId: razorpayOrderId || null,
        razorpayPaymentId: razorpayPaymentId || null,
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
