import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';
import { FALLBACK_PRODUCTS, FALLBACK_CATEGORIES } from '@/lib/fallback-data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category');
    const ageRange = searchParams.get('age');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const sort = searchParams.get('sort'); // 'price-asc', 'price-desc', 'newest'

    const where: any = {};

    if (categorySlug) {
      where.category = { slug: categorySlug };
    }

    if (ageRange && ageRange !== 'All Ages' && ageRange !== 'all') {
      const cleanAge = ageRange.replace('+', '').split(' ')[0];
      where.ageRange = { contains: cleanAge, mode: 'insensitive' };
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { shortDesc: { contains: search } },
      ];
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'price-asc') orderBy = { price: 'asc' };
    if (sort === 'price-desc') orderBy = { price: 'desc' };

    const products = await prisma.product.findMany({
      where,
      orderBy,
      include: {
        category: true,
      },
    });

    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(
      { products, categories },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error: any) {
    console.warn('GET /api/products DB error, returning fallbacks:', error.message);
    return NextResponse.json(
      {
        products: FALLBACK_PRODUCTS,
        categories: FALLBACK_CATEGORIES,
        isFallback: true,
        error: error.message,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Check admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('findo_admin_token')?.value;
    if (!token || !(await verifyAdminToken(token))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      slug,
      description,
      shortDesc,
      price,
      compareAtPrice,
      deliveryFee,
      stock,
      categoryId,
      images,
      isFeatured,
      ageRange,
      badges,
      specs,
    } = body;

    if (!name || !price || !categoryId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const product = await prisma.product.create({
      data: {
        name,
        slug: generatedSlug,
        description: description || '',
        shortDesc: shortDesc || '',
        price: parseFloat(price),
        compareAtPrice: compareAtPrice ? parseFloat(compareAtPrice) : null,
        deliveryFee: deliveryFee !== undefined ? Math.max(0, parseFloat(String(deliveryFee)) || 0) : 0,
        stock: parseInt(stock) || 10,
        categoryId,
        images: typeof images === 'string' ? images : JSON.stringify(images || []),
        isFeatured: Boolean(isFeatured),
        ageRange: ageRange || '3-8 Years',
        badges: typeof badges === 'string' ? badges : JSON.stringify(badges || []),
        specs: typeof specs === 'string' ? specs : JSON.stringify(specs || {}),
      },
    });

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/shop');
      revalidatePath('/products');
      revalidatePath('/search');
      revalidatePath('/admin/products');
    } catch (revalError) {
      console.error('Error revalidating paths after product creation:', revalError);
    }

    return NextResponse.json({ product, success: true }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
