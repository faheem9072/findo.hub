import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';

const MASTER_PIN = (process.env.ADMIN_SECURITY_PIN || '9072').trim();

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pin = searchParams.get('pin');

    // Auth check: either master pin or admin cookie
    const cookieStore = await cookies();
    const token = cookieStore.get('findo_admin_token')?.value;
    const adminUser = token ? await verifyAdminToken(token) : null;

    if (!adminUser && (!pin || pin.trim() !== MASTER_PIN)) {
      return NextResponse.json({ error: 'Unauthorized: Invalid PIN or session' }, { status: 401 });
    }

    const products = await prisma.product.findMany();
    let migratedCount = 0;
    const updatedList: string[] = [];

    for (const p of products) {
      const raw = typeof p.images === 'string' ? p.images : JSON.stringify(p.images);
      if (raw.includes('data:image')) {
        const cleanImagePath = `/images/products/${p.slug}.jpg`;
        await prisma.product.update({
          where: { id: p.id },
          data: {
            images: JSON.stringify([cleanImagePath]),
          },
        });
        migratedCount++;
        updatedList.push(`${p.name} (${p.slug}) -> ${cleanImagePath}`);
      }
    }

    // Purge edge cache
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/shop');
      revalidatePath('/products');
      revalidatePath('/search');
    } catch (e) {
      console.warn('Revalidate path error:', e);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully migrated ${migratedCount} products from Base64 to static CDN images!`,
      migratedCount,
      updatedProducts: updatedList,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
