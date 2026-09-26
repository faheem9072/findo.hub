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
      city,
      state,
      pincode,
      paymentMethod,
      items,
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

    const freeShippingThreshold = 999;
    const shippingFee = subtotal >= freeShippingThreshold ? 0 : 70;
    const totalAmount = subtotal + shippingFee;

    const orderNumber = 'FND-' + Math.floor(100000 + Math.random() * 900000);
    const paymentStatus = paymentMethod === 'RAZORPAY' && razorpayPaymentId ? 'PAID' : 'PENDING';

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        customerEmail,
        customerPhone,
        address,
        city,
        state,
        pincode,
        subtotal,
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
