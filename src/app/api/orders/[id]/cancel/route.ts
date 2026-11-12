import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      body = {};
    }

    const { reason, note } = body;

    // Find the order by ID or orderNumber
    const order = await prisma.order.findFirst({
      where: {
        OR: [{ id: id }, { orderNumber: id }],
      },
      include: {
        items: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Check if already cancelled
    if (order.orderStatus === 'CANCELLED') {
      return NextResponse.json(
        { error: 'This order is already cancelled', order },
        { status: 400 }
      );
    }

    // Check if already delivered
    if (order.orderStatus === 'DELIVERED') {
      return NextResponse.json(
        {
          error:
            'Order has already been delivered. Please contact customer support for returns or exchanges.',
        },
        { status: 400 }
      );
    }

    // Update order status to CANCELLED
    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        orderStatus: 'CANCELLED',
      },
      include: {
        items: true,
      },
    });

    // Restore stock for products in this cancelled order
    try {
      for (const item of order.items) {
        if (item.productId) {
          await prisma.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                increment: item.quantity,
              },
            },
          });
        }
      }
      // Purge and refresh static cache so restored stock shows immediately
      revalidatePath('/', 'layout');
      revalidatePath('/shop');
    } catch (stockErr) {
      console.warn('Failed to auto-increment stock on cancellation:', stockErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Order cancelled successfully',
      order: updatedOrder,
      cancellationDetails: {
        reason: reason || 'Customer requested cancellation',
        note: note || '',
        cancelledAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error('Cancel order error:', error);
    return NextResponse.json({ error: error.message || 'Failed to cancel order' }, { status: 500 });
  }
}

