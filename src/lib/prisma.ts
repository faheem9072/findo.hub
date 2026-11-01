import { PrismaClient } from '@prisma/client';

const NEON_DATABASE_URL =
  'postgresql://neondb_owner:npg_Zcb2nWrh8CQS@ep-little-mode-b4qdwq1h-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require';

function getDatabaseUrl(): string {
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('postgres')) {
    return process.env.DATABASE_URL;
  }
  return NEON_DATABASE_URL;
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
