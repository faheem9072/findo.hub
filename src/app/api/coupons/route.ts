import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const orderValueStr = searchParams.get('orderValue');

    // If validating a coupon code at checkout
    if (code) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: code.trim().toUpperCase() },
      });

      if (!coupon || !coupon.isActive) {
        return NextResponse.json({ valid: false, error: 'Invalid or inactive coupon code' }, { status: 400 });
      }

      if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
        return NextResponse.json({ valid: false, error: 'Coupon code has expired' }, { status: 400 });
      }

      const orderValue = orderValueStr ? parseFloat(orderValueStr) : 0;
      if (coupon.minOrderValue && orderValue < coupon.minOrderValue) {
        return NextResponse.json(
          { valid: false, error: `Minimum order value for this coupon is ₹${coupon.minOrderValue}` },
          { status: 400 }
        );
      }

      let discount = 0;
      if (coupon.discountType === 'PERCENTAGE') {
        discount = Math.round((orderValue * coupon.discountValue) / 100);
      } else {
        discount = coupon.discountValue;
      }

      return NextResponse.json({
        valid: true,
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        calculatedDiscount: Math.min(discount, orderValue),
      });
    }

    // Admin fetch all coupons
    const cookieStore = await cookies();
    const token = cookieStore.get('findo_admin_token')?.value;
    if (!token || !(await verifyAdminToken(token))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ coupons });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('findo_admin_token')?.value;
    if (!token || !(await verifyAdminToken(token))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { code, discountType, discountValue, minOrderValue, expiryDate, usageLimit, isActive } = body;

    if (!code || !discountValue) {
      return NextResponse.json({ error: 'Code and discount value are required' }, { status: 400 });
    }

    const coupon = await prisma.coupon.create({
      data: {
        code: code.trim().toUpperCase(),
        discountType: discountType || 'PERCENTAGE',
        discountValue: parseFloat(discountValue),
        minOrderValue: minOrderValue ? parseFloat(minOrderValue) : 0,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        usageLimit: usageLimit ? parseInt(usageLimit) : null,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json({ coupon, success: true }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
