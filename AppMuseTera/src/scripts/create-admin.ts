import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../lib/firebase';

async function createAdmin() {
  try {
    const email = 'admin@musicoterapia.com';
    const password = 'Admin@123';
    const name = 'Administrador';

    // Criar usuário no Firebase
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Atualizar perfil do usuário
    await updateProfile(userCredential.user, {
      displayName: name
    });

    console.log('Usuário admin criado com sucesso:', {
      email,
      name,
      uid: userCredential.user.uid
    });
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('Usuário já existe. Você pode fazer login com:');
      console.log('Email: admin@musicoterapia.com');
      console.log('Senha: Admin@123');
    } else {
      console.error('Erro ao criar usuário:', error);
    }
  }
}

createAdmin();
