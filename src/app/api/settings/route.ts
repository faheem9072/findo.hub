import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';

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

    return NextResponse.json({ settings });
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

    const settings = await prisma.setting.upsert({
      where: { id: 'default' },
      update: {
        whatsappNumber,
        supportEmail,
        freeShippingThreshold: parseFloat(freeShippingThreshold),
        flatShippingRate: parseFloat(flatShippingRate),
        storeNotice,
      },
      create: {
        id: 'default',
        whatsappNumber: whatsappNumber || '+919876543210',
        supportEmail: supportEmail || 'support@findo.com',
        freeShippingThreshold: parseFloat(freeShippingThreshold) || 999,
        flatShippingRate: parseFloat(flatShippingRate) || 79,
        storeNotice,
      },
    });

    return NextResponse.json({ settings, success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
