import { PrismaClient as PrismaClientType } from '.prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientType | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClientType({
  datasources: {
    db: {
      url: process.env.DATABASE_URL?.replace(':6543', ':5432') || ''
    }
  }
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma