import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  },
  __internal: {
    engine: {
      enableEngineDebugMode: true
    }
  }
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma