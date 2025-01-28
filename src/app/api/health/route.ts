import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET() {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 5000)

  try {
    // Tenta uma query simples para verificar a conexão
    await prisma.$queryRaw`SELECT 1`
    return NextResponse.json({ status: 'OK' }, { status: 200 })
  } catch (error) {
    console.error('Database health check failed:', error)
    return NextResponse.json(
      { status: 'Database Unavailable', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 503 }
    )
  } finally {
    clearTimeout(timeout)
  }
}
