'use client'

import { Card } from '@/components/ui/Card'
import Link from 'next/link'
import { 
  DocumentTextIcon, 
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  CheckCircleIcon,
  UserGroupIcon,
  DocumentMagnifyingGlassIcon
} from '@heroicons/react/24/outline'

const TIPOS_RELATORIO = [
  {
    id: 'sessao',
    titulo: 'Relatórios de Sessão',
    descricao: 'Documentação detalhada das sessões de musicoterapia',
    icon: DocumentTextIcon,
    cor: 'bg-blue-50 text-blue-700',
    subtipos: [
      {
        id: 'sessao-individual',
        titulo: 'Sessão Individual',
        subtitulo: 'Atendimento Individual',
        descricao: 'Registro completo do processo terapêutico individual, incluindo objetivos, intervenções e resultados'
      },
      {
        id: 'sessao-grupo',
        titulo: 'Sessão em Grupo',
        subtitulo: 'Atendimento em Grupo',
        descricao: 'Documentação das dinâmicas grupais, interações e desenvolvimento coletivo'
      },
      {
        id: 'sessao-evolucao-diaria',
        titulo: 'Evolução Diária',
        subtitulo: 'Progresso da Sessão',
        descricao: 'Registro conciso do desenvolvimento e mudanças observadas na sessão'
      }
    ]
  },
  {
    id: 'avaliacao',
    titulo: 'Avaliações',
    descricao: 'Avaliações iniciais e específicas para cada caso',
    icon: ClipboardDocumentCheckIcon,
    cor: 'bg-purple-50 text-purple-700',
    subtipos: [
      {
        id: 'avaliacao-inicial',
        titulo: 'Avaliação Inicial',
        subtitulo: 'Primeiro Contato',
        descricao: 'Análise completa para início do tratamento'
      },
      {
        id: 'escala-tea',
        titulo: 'Escala TEA',
        subtitulo: 'Avaliação Específica',
        descricao: 'Protocolo especializado para pacientes com TEA'
      }
    ]
  },
  {
    id: 'evolucao',
    titulo: 'Evolução do Paciente',
    descricao: 'Acompanhamento periódico do progresso terapêutico',
    icon: ChartBarIcon,
    cor: 'bg-green-50 text-green-700',
    subtipos: [
      {
        id: 'evolucao-mensal',
        titulo: 'Evolução Mensal',
        subtitulo: 'Acompanhamento Mensal',
        descricao: 'Análise dos progressos do último mês'
      },
      {
        id: 'evolucao-semestral',
        titulo: 'Evolução Semestral',
        subtitulo: 'Análise Detalhada',
        descricao: 'Revisão completa do último semestre'
      }
    ]
  },
  {
    id: 'alta',
    titulo: 'Altas',
    descricao: 'Documentação de conclusão do tratamento',
    icon: CheckCircleIcon,
    cor: 'bg-yellow-50 text-yellow-700',
    subtipos: [
      {
        id: 'alta-terapeutica',
        titulo: 'Alta Terapêutica',
        subtitulo: 'Conclusão do Tratamento',
        descricao: 'Objetivos terapêuticos alcançados'
      },
      {
        id: 'alta-administrativa',
        titulo: 'Alta Administrativa',
        subtitulo: 'Encerramento',
        descricao: 'Conclusão por motivos administrativos'
      }
    ]
  },
  {
    id: 'comunicacao',
    titulo: 'Comunicação Externa',
    descricao: 'Relatórios para família e outros profissionais',
    icon: UserGroupIcon,
    cor: 'bg-indigo-50 text-indigo-700',
    subtipos: [
      {
        id: 'familia',
        titulo: 'Para Família',
        subtitulo: 'Comunicação Acessível',
        descricao: 'Informações claras para os familiares'
      },
      {
        id: 'equipe',
        titulo: 'Para Equipe',
        subtitulo: 'Comunicação Técnica',
        descricao: 'Informações para outros profissionais'
      }
    ]
  },
  {
    id: 'parecer',
    titulo: 'Pareceres Técnicos',
    descricao: 'Documentos técnicos especializados',
    icon: DocumentMagnifyingGlassIcon,
    cor: 'bg-rose-50 text-rose-700',
    subtipos: [
      {
        id: 'parecer-tecnico',
        titulo: 'Parecer Técnico',
        subtitulo: 'Análise Especializada',
        descricao: 'Avaliação técnica detalhada do caso'
      }
    ]
  }
]

export default function RelatoriosPage() {
  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Central de Relatórios</h1>
        <p className="mt-2 text-lg text-gray-600">
          Escolha o tipo de relatório que deseja criar
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {TIPOS_RELATORIO.map((tipo) => (
          <section key={tipo.id} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${tipo.cor}`}>
                <tipo.icon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{tipo.titulo}</h2>
                <p className="text-gray-600">{tipo.descricao}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tipo.subtipos.map((subtipo) => (
                <Link 
                  key={subtipo.id}
                  href={`/processos/relatorios/${tipo.id}/${subtipo.id}`}
                  className="block hover:no-underline group"
                >
                  <Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-102">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                        {subtipo.titulo}
                      </h3>
                      <p className="text-sm font-medium text-gray-600 mt-1">
                        {subtipo.subtitulo}
                      </p>
                      <p className="text-sm text-gray-500 mt-3">
                        {subtipo.descricao}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section className="mt-8 border-t pt-8">
          <Link 
            href="/processos/relatorios/lista"
            className="block hover:no-underline group"
          >
            <Card className="transition-all duration-200 hover:shadow-lg hover:scale-102 bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="p-8 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600">
                    Relatórios Salvos
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Acesse e gerencie todos os relatórios já criados
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </section>
      </div>
    </div>
  )
}