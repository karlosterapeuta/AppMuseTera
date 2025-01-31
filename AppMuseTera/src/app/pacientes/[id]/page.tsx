'use client'

import { useParams } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { 
  CalendarIcon, 
  ClockIcon,
  PencilIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Patient } from '@/types'
import { usePatients } from '@/hooks/usePatients'

export default function DetalhePacientePage() {
  const params = useParams()
  const id = params.id
  const [patient, setPatient] = useState<Patient | null>(null)
  const { patients } = usePatients()

  useEffect(() => {
    const currentPatient = patients.find(p => p.id === id)
    if (currentPatient) {
      setPatient(currentPatient)
    }
  }, [id, patients])

  if (!patient) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Paciente não encontrado</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{patient.nome}</h1>
        <div className="flex gap-2">
          <Link
            href={`/pacientes/${id}/editar`}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <PencilIcon className="h-5 w-5" />
            Editar
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Informações Pessoais</h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm text-gray-500">Data de Nascimento</dt>
                <dd>{new Date(patient.dataNascimento).toLocaleDateString('pt-BR')}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Telefone</dt>
                <dd>{patient.telefone || 'Não informado'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Status</dt>
                <dd>{patient.status === 'active' ? 'Ativo' : 'Inativo'}</dd>
              </div>
            </dl>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Ações</h2>
            <div className="space-y-4">
              <Link
                href={`/processos/anamnese?patientId=${patient.id}`}
                className="flex items-center justify-center w-full px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Realizar Anamnese
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}