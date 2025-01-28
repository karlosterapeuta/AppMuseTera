import { PrismaClient as PrismaClientType } from '.prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientType | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClientType({
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'stdout', level: 'error' },
    { emit: 'stdout', level: 'info' },
    { emit: 'stdout', level: 'warn' },
  ],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Log all queries in development
if (process.env.NODE_ENV !== 'production') {
  prisma.$on('query', (e) => {
    console.log('Query: ' + e.query)
    console.log('Duration: ' + e.duration + 'ms')
  })
}