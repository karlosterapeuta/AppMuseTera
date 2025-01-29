const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, updateProfile } = require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyCxuATqPNTVTBQPElg69hrQCYxcSRTf9es",
  authDomain: "appmusetera-eeb9f.firebaseapp.com",
  projectId: "appmusetera-eeb9f",
  storageBucket: "appmusetera-eeb9f.firebasestorage.app",
  messagingSenderId: "914679524424",
  appId: "1:914679524424:web:52d6419a4a8bff4da63c7d",
  measurementId: "G-LMFZJS39KB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function createAdmin() {
  try {
    const email = 'admin@musicoterapia.com';
    const password = 'Admin@123';
    const name = 'Administrador';

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });

    console.log('Usuário admin criado com sucesso!');
    console.log('Email:', email);
    console.log('Senha:', password);
    process.exit(0);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('Usuário já existe. Use as credenciais:');
      console.log('Email: admin@musicoterapia.com');
      console.log('Senha: Admin@123');
    } else {
      console.error('Erro ao criar usuário:', error);
    }
    process.exit(1);
  }
}

createAdmin();
