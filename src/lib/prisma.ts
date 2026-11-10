import { PrismaClient } from '@prisma/client';

const NEON_DATABASE_URL =
  'postgresql://neondb_owner:npg_Zcb2nWrh8CQS@ep-little-mode-b4qdwq1h-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require';

function getDatabaseUrl(): string {
  let url = process.env.DATABASE_URL || NEON_DATABASE_URL;
  // Strip surrounding quotes if present
  url = url.replace(/^["']|["']$/g, '').trim();

  // If using Neon pooler host, ensure pgbouncer=true and proper connection timeouts
  if (url.includes('-pooler')) {
    const hasQuery = url.includes('?');
    if (!url.includes('pgbouncer=true')) {
      url += (hasQuery ? '&' : '?') + 'pgbouncer=true';
    }
    if (!url.includes('connect_timeout=')) {
      url += '&connect_timeout=30';
    }
    if (!url.includes('pool_timeout=')) {
      url += '&pool_timeout=30';
    }
  }

  return url;
}

const resolvedDbUrl = getDatabaseUrl();
process.env.DATABASE_URL = resolvedDbUrl;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: resolvedDbUrl,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
