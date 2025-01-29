import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('Admin@2024', 10)
  
  try {
    const user = await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@musethera.com',
        password: hashedPassword,
      }
    })
    
    console.log('Usuário criado com sucesso:', {
      email: user.email,
      senha: 'Admin@2024'
    })
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
