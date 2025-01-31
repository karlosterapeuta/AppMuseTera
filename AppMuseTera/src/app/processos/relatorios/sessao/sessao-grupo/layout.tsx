import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Relatório de Sessão em Grupo | Musicoterapia',
  description: 'Formulário para registro de sessão de musicoterapia em grupo',
}

export default function RelatorioSessaoGrupoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6">
        {children}
      </div>
    </div>
  )
}
