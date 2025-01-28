import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
  log: ['query', 'info', 'warn', 'error'],
  __internal: {
    engine: {
      enableEngineDebugMode: true
    }
  }
})

export default prisma
