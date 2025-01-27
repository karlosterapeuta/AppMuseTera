'use client'

import { Card } from '@/components/ui/Card'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ClipboardDocumentListIcon, 
  ChartBarIcon,
  DocumentTextIcon,
  MusicalNoteIcon,
  ArrowPathIcon,
  DocumentDuplicateIcon,
  UserIcon
} from '@heroicons/react/24/outline'

const processosFuncoes = [
  {
    id: 'anamnese',
    title: 'Anamnese',
    description: 'Cadastro de informações iniciais do paciente',
    icon: UserIcon,
    href: '/processos/anamnese',
    features: [
      'Histórico médico e musical',
      'Formulário configurável'
    ]
  },
  {
    id: 'avaliacao',
    title: 'Avaliação',
    description: 'Avaliação inicial do paciente',
    icon: ClipboardDocumentListIcon,
    href: '/processos/avaliacao',
    features: [
      'Avaliação completa',
      'Registro de observações',
      'Definição de objetivos'
    ]
  },
  {
    id: 'plano',
    title: 'Plano Terapêutico',
    description: 'Definição de objetivos e metas',
    icon: DocumentTextIcon,
    href: '/processos/plano',
    features: [
      'Objetivos personalizados',
      'Sugestões automáticas'
    ]
  },
  {
    id: 'intervencoes',
    title: 'Intervenções',
    description: 'Atividades musicoterapêuticas',
    icon: MusicalNoteIcon,
    href: '/processos/intervencoes',
    features: [
      'Biblioteca de atividades',
      'Personalização'
    ]
  },
  {
    id: 'reavaliacao',
    title: 'Reavaliação',
    description: 'Acompanhamento do progresso',
    icon: ArrowPathIcon,
    href: '/processos/reavaliacao',
    features: [
      'Comparação de resultados',
      'Relatórios automáticos'
    ]
  },
  {
    id: 'relatorio',
    title: 'Relatórios',
    description: 'Gere relatórios detalhados sobre o progresso do paciente',
    icon: DocumentDuplicateIcon,
    href: '/processos/relatorios',
    features: [
      'Registro detalhado',
      'Modelos pré-prontos',
      'Histórico completo'
    ]
  }
]

export default function ProcessosPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Processos Terapêuticos</h1>
            <p className="mt-2 text-gray-600">Gerencie todos os processos terapêuticos dos seus pacientes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processosFuncoes.map((funcao) => (
              <Link key={funcao.id} href={funcao.href}>
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <h2 className="text-xl font-semibold mb-2">{funcao.title}</h2>
                  <p className="text-gray-600">{funcao.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}