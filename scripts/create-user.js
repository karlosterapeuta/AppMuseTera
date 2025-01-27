const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createUser() {
  try {
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    
    const user = await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@musetera.com',
        password: hashedPassword,
        professionalRegister: 'ADM001'
      },
    });

    console.log('Usuário criado com sucesso:', user);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createUser();
