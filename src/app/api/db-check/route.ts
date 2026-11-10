import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const rawUrl = process.env.DATABASE_URL || '';
  const first15 = rawUrl.substring(0, 15);
  const firstCharCode = rawUrl.charCodeAt(0) || 0;
  const lastCharCode = rawUrl.charCodeAt(rawUrl.length - 1) || 0;
  const hasPooler = rawUrl.includes('-pooler');

  try {
    const productCount = await prisma.product.count();
    const categoryCount = await prisma.category.count();
    const orderCount = await prisma.order.count();

    return NextResponse.json({
      status: 'CONNECTED',
      productCount,
      categoryCount,
      orderCount,
      diagnostics: {
        hasEnvVar: Boolean(rawUrl),
        length: rawUrl.length,
        firstCharCode,
        lastCharCode,
        first15,
        hasPooler,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'ERROR',
        error: error.message,
        diagnostics: {
          hasEnvVar: Boolean(rawUrl),
          length: rawUrl.length,
          firstCharCode,
          lastCharCode,
          first15,
          hasPooler,
        },
      },
      { status: 500 }
    );
  }
}

