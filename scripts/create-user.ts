import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabaseUrl = 'https://jztbkimlcrfndooyhohg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6dGJraW1sY3JmbmRvb3lob2hnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNzEwMjM4NCwiZXhwIjoyMDUyNjc4Mzg0fQ.NBbewBjXl8rmBmSdNcK2MEg2_7gIZHvzno_n9KEwck4'

const supabase = createClient(supabaseUrl, supabaseKey)

function generateId() {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 15)
  return `user_${timestamp}_${randomStr}`
}

async function createUser() {
  try {
    const hashedPassword = await bcrypt.hash('123456', 10)
    const now = new Date().toISOString()
    const userId = generateId()
    
    // Primeiro, deletar usuário existente
    const { error: deleteError } = await supabase
      .from('User')
      .delete()
      .eq('email', 'admin@museterapia.com')

    if (deleteError) {
      console.log('Erro ao deletar usuário:', deleteError)
    }

    // Criar novo usuário
    const { data, error } = await supabase
      .from('User')
      .insert([
        {
          id: userId,
          name: 'Administrador',
          email: 'admin@museterapia.com',
          password: hashedPassword,
          professionalRegister: 'ADMIN',
          createdAt: now,
          updatedAt: now
        }
      ])
      .select()

    if (error) throw error
    console.log('Usuário criado com sucesso:', data)
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
  }
}

createUser()
