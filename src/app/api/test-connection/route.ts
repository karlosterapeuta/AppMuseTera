import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data, error } = await supabase.from('_prisma_migrations').select('*').limit(1)

    if (error) {
      console.error('Erro ao conectar com Supabase:', error)
      return NextResponse.json({ success: false, error: error.message })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Erro ao testar conexão:', error)
    return NextResponse.json({ success: false, error: String(error) })
  }
}
