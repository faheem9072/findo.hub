import { PrismaClient } from '@prisma/client';

export const NEON_DATABASE_URL =
  'postgresql://neondb_owner:npg_Zcb2nWrh8CQS@ep-little-mode-b4qdwq1h-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require';

export function cleanDatabaseUrl(): string {
  let url = (process.env.DATABASE_URL || '').trim();

  // Strip leading and trailing quotes (", ', `) and whitespace
  url = url.replace(/^["'`\s]+|["'`\s]+$/g, '').trim();

  // If pasted with 'DATABASE_URL=' prefix
  if (url.startsWith('DATABASE_URL=')) {
    url = url.substring('DATABASE_URL='.length).trim();
    url = url.replace(/^["'`\s]+|["'`\s]+$/g, '').trim();
  }

  // If empty or does not start with postgresql:// or postgres://, fall back to authentic NEON_DATABASE_URL
  if (!url.startsWith('postgresql://') && !url.startsWith('postgres://')) {
    url = NEON_DATABASE_URL;
  }

  // Ensure Neon pooler connection parameters
  if (url.includes('-pooler')) {
    const hasQuery = url.includes('?');
    if (!url.includes('pgbouncer=true')) {
      url += (hasQuery ? '&' : '?') + 'pgbouncer=true';
    }
    if (!url.includes('connect_timeout=')) {
      url += '&connect_timeout=15';
    }
    if (!url.includes('pool_timeout=')) {
      url += '&pool_timeout=15';
    }
  }

  return url;
}

const resolvedDbUrl = cleanDatabaseUrl();
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

globalForPrisma.prisma = prisma;

export default prisma;
