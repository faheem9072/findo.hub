import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = await prisma.order.findFirst({
      where: {
        OR: [{ id: id }, { orderNumber: id }],
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('findo_admin_token')?.value;
    if (!token || !(await verifyAdminToken(token))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { orderStatus, paymentStatus } = body;

    // Find the order by id or orderNumber
    const existing = await prisma.order.findFirst({
      where: {
        OR: [{ id: id }, { orderNumber: id }],
      },
      include: {
        items: true,
      },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Determine final payment status: if marked DELIVERED on COD, mark payment as PAID automatically
    let finalPaymentStatus = paymentStatus || existing.paymentStatus;
    if (orderStatus === 'DELIVERED' && existing.paymentMethod === 'COD' && !paymentStatus) {
      finalPaymentStatus = 'PAID';
    }

    const order = await prisma.order.update({
      where: { id: existing.id },
      data: {
        ...(orderStatus && { orderStatus }),
        paymentStatus: finalPaymentStatus,
      },
      include: {
        items: true,
      },
    });

    // If order is changed to CANCELLED and was not previously CANCELLED, restore stock
    if (orderStatus === 'CANCELLED' && existing.orderStatus !== 'CANCELLED') {
      try {
        for (const item of existing.items) {
          if (item.productId) {
            await prisma.product.update({
              where: { id: item.productId },
              data: { stock: { increment: item.quantity } },
            });
          }
        }
      } catch (stockErr) {
        console.warn('Failed to restore stock on cancel:', stockErr);
      }
    }

    return NextResponse.json({ order, success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
