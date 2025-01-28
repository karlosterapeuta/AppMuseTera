import { PrismaClient as PrismaClientType } from '.prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientType | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClientType({
  log: ['query', 'error', 'warn'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  },
  rejectOnNotFound: false
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma