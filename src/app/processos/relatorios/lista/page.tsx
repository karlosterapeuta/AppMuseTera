'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'
import { usePatients } from '@/hooks/usePatients'
import { 
  DocumentTextIcon, 
  DocumentPlusIcon,
  ChevronRightIcon,
  CalendarIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import { formatarData } from '@/utils/formatters'

interface Relatorio {
  id: string
  tipo: string
  patientId: string
  createdAt: string
  data: any
}

const TIPOS_RELATORIO = {
  'enfoque-interacao-musical': 'Enfoque na Interação Musical',
  'exploracao-sonora': 'Exploração Sonora e Rítmica',
  'regulacao-emocional': 'Regulação Emocional e Sensorial'
}

export default function ListaRelatoriosPage() {
  const [relatorios, setRelatorios] = useState<Relatorio[]>([])
  const { patients } = usePatients()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadRelatorios = () => {
      const savedRelatorios = JSON.parse(localStorage.getItem('relatorios') || '[]')
      setRelatorios(savedRelatorios)
      setLoading(false)
    }

    loadRelatorios()
  }, [])

  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId)
    return patient?.name || 'Paciente não encontrado'
  }

  const getTipoRelatorio = (tipo: string) => {
    return TIPOS_RELATORIO[tipo as keyof typeof TIPOS_RELATORIO] || tipo
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Relatórios Salvos</h1>
          <p className="mt-2 text-sm text-gray-500">
            Visualize e gerencie todos os relatórios criados
          </p>
        </div>
        
        <Link 
          href="/processos/relatorios"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <DocumentPlusIcon className="h-5 w-5 mr-2" />
          Novo Relatório
        </Link>
      </div>

      {relatorios.length === 0 ? (
        <Card className="p-6 text-center">
          <DocumentTextIcon className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">Nenhum relatório encontrado</h3>
          <p className="mt-2 text-sm text-gray-500">
            Comece criando um novo relatório para seus pacientes.
          </p>
          <div className="mt-6">
            <Link
              href="/processos/relatorios"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <DocumentPlusIcon className="h-5 w-5 mr-2" />
              Criar Relatório
            </Link>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {relatorios.map((relatorio) => (
            <Link
              key={relatorio.id}
              href={`/processos/relatorios/${relatorio.tipo}?id=${relatorio.id}`}
              className="block hover:no-underline"
            >
              <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <DocumentTextIcon className="h-6 w-6 text-gray-400" />
                      <h2 className="ml-3 text-lg font-medium text-gray-900">
                        {getTipoRelatorio(relatorio.tipo)}
                      </h2>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <UserIcon className="flex-shrink-0 mr-1.5 h-5 w-5" />
                      {getPatientName(relatorio.patientId)}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5" />
                      {formatarData(new Date(relatorio.createdAt))}
                    </div>
                  </div>
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}