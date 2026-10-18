import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (productId) {
      const reviews = await prisma.review.findMany({
        where: { productId, isApproved: true },
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json({ reviews });
    }

    // Admin fetch all reviews
    const cookieStore = await cookies();
    const token = cookieStore.get('findo_admin_token')?.value;
    if (!token || !(await verifyAdminToken(token))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        product: { select: { name: true, slug: true } },
      },
    });

    return NextResponse.json({ reviews });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, customerName, customerEmail, rating, comment } = body;

    if (!productId || !customerName || !customerEmail || !comment || !rating) {
      return NextResponse.json({ error: 'Missing required review fields' }, { status: 400 });
    }

    // Check if customer has verified purchase for this product
    const verifiedOrder = await prisma.order.findFirst({
      where: {
        customerEmail: customerEmail.trim().toLowerCase(),
        items: {
          some: { productId },
        },
      },
    });

    const review = await prisma.review.create({
      data: {
        productId,
        customerName,
        customerEmail: customerEmail.trim().toLowerCase(),
        rating: Math.min(5, Math.max(1, parseInt(rating))),
        comment,
        isApproved: true,
        isVerifiedPurchase: !!verifiedOrder,
      },
    });

    // Recalculate product rating summary
    const stats = await prisma.review.aggregate({
      where: { productId, isApproved: true },
      _avg: { rating: true },
      _count: { rating: true },
    });

    if (stats._avg.rating) {
      await prisma.product.update({
        where: { id: productId },
        data: {
          rating: Math.round(stats._avg.rating * 10) / 10,
          reviewCount: stats._count.rating,
        },
      });
    }

    return NextResponse.json(review, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
