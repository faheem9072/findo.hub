import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    let settings = await prisma.setting.findUnique({
      where: { id: 'default' },
    });

    if (!settings) {
      settings = await prisma.setting.create({
        data: {
          id: 'default',
          whatsappNumber: '+919876543210',
          supportEmail: 'support@findo.com',
          freeShippingThreshold: 999,
          flatShippingRate: 79,
          storeNotice: 'Free Shipping across India on orders above ₹999!',
        },
      });
    }

    return NextResponse.json(
      { settings },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('findo_admin_token')?.value;
    if (!token || !(await verifyAdminToken(token))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { whatsappNumber, supportEmail, freeShippingThreshold, flatShippingRate, storeNotice } = body;

    const parsedThreshold = freeShippingThreshold !== undefined ? parseFloat(String(freeShippingThreshold)) : 999;
    const parsedShippingRate = flatShippingRate !== undefined ? parseFloat(String(flatShippingRate)) : 79;

    const finalThreshold = isNaN(parsedThreshold) ? 999 : parsedThreshold;
    const finalShippingRate = isNaN(parsedShippingRate) ? 79 : parsedShippingRate;

    const settings = await prisma.setting.upsert({
      where: { id: 'default' },
      update: {
        whatsappNumber,
        supportEmail,
        freeShippingThreshold: finalThreshold,
        flatShippingRate: finalShippingRate,
        storeNotice,
      },
      create: {
        id: 'default',
        whatsappNumber: whatsappNumber || '+919876543210',
        supportEmail: supportEmail || 'support@findo.com',
        freeShippingThreshold: finalThreshold,
        flatShippingRate: finalShippingRate,
        storeNotice,
      },
    });

    // Revalidate storefront & cart pages so all clients see the change immediately
    revalidatePath('/', 'layout');
    revalidatePath('/cart');
    revalidatePath('/checkout');
    revalidatePath('/shop');
    revalidatePath('/admin/settings');

    return NextResponse.json({ settings, success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
