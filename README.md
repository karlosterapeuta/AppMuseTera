# Sistema MuseTera

Sistema de gerenciamento para Musicoterapeutas, desenvolvido com Next.js, TypeScript, Tailwind CSS e Supabase.

## Tecnologias Utilizadas

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma ORM
- Supabase (Banco de dados PostgreSQL)
- NextAuth.js (Autenticação)

## Funcionalidades

- Sistema de autenticação seguro
- Gerenciamento de pacientes
- Registro e acompanhamento de processos terapêuticos
- Geração de relatórios profissionais
- Formulários especializados para anamnese e avaliações
- Interface moderna e responsiva

## Configuração do Ambiente de Desenvolvimento

1. Clone o repositório:
```bash
git clone https://github.com/karlosterapeuta/sistema-musetera.git
cd sistema-musetera
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Crie um arquivo `.env` na raiz do projeto
- Adicione as variáveis necessárias (consulte `.env.example`)

4. Execute as migrações do banco de dados:
```bash
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000`

## Estrutura do Projeto

- `/src/app` - Rotas e páginas da aplicação
- `/src/components` - Componentes reutilizáveis
- `/src/lib` - Utilitários e configurações
- `/prisma` - Schema e migrações do banco de dados

## Contribuição

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.
# AppMuseTera
