const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const supabaseUrl = 'https://jztbkimlcrfndooyhohg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6dGJraW1sY3JmbmRvb3lob2hnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMDIzODQsImV4cCI6MjA1MjY3ODM4NH0.Q6nTndaG8t4rOp-Gp0Fo8JTGPfVKLeKJ25ml_5HpVxs';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createUser() {
  try {
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    
    const { data, error } = await supabase
      .from('User')
      .insert([
        {
          id: uuidv4(),
          name: 'Admin',
          email: 'admin@musetera.com',
          password: hashedPassword,
          professionalRegister: 'ADM001',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]);

    if (error) throw error;
    console.log('Usuário criado com sucesso:', data);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
  }
}

createUser();
